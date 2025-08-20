import { useState } from 'react'
import { Product } from '../types/Product'
import { useCart } from '../context/CartContext'
import { formatChileanPrice } from '../utils/formatting'
import './PricingCalculator.css'

interface PricingCalculatorProps {
  product: Product
  onQuoteRequest: (quantity: number, totalPrice: number) => void
}

const PricingCalculator = ({ product, onQuoteRequest }: PricingCalculatorProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedBreak, setSelectedBreak] = useState<number>(0)
  const { addToCart } = useCart()

  // Calculate best pricing for quantity
  const calculatePrice = (qty: number) => {
    if (!product.priceBreaks || product.priceBreaks.length === 0) {
      return product.basePrice * qty
    }

    // Find the best applicable price break by iterating backwards
    let bestBreak = product.priceBreaks.find(pb => qty >= pb.minQty) ?? product.priceBreaks[0]
    for (let i = product.priceBreaks.length - 1; i >= 0; i--) {
      if (qty >= product.priceBreaks[i].minQty) {
        bestBreak = product.priceBreaks[i]
        break
      }
    }

    return bestBreak.price * qty
  }

  // Calculate discount amount
  const getDiscount = (qty: number) => {
    if (!product.priceBreaks || product.priceBreaks.length === 0) {
      return 0
    }

    const baseTotal = product.basePrice * qty
    const discountedTotal = calculatePrice(qty)
    
    // Calculate savings percentage
    return ((baseTotal - discountedTotal) / baseTotal) * 100
  }

  // Format price display
  const formatPrice = (price: number) => {
    return formatChileanPrice(price)
  }

  const currentPrice = calculatePrice(quantity)
  const discountPercent = getDiscount(quantity)

  return (
    <div className="pricing-calculator">
      <div className="calculator-header">
        <h3 className="calculator-title p1-medium">Calculadora de Precios</h3>
        <p className="calculator-subtitle l1">
          Calcula el precio según la cantidad que necesitas
        </p>
      </div>

      <div className="calculator-content">
        {/* Quantity Input */}
        <div className="quantity-section">
          <label className="quantity-label p1-medium">Cantidad</label>
          <div className="quantity-input-group">
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 1
                setQuantity(Math.min(Math.max(1, newQuantity), product.stock))
              }}
              className="quantity-input p1"
              min="1"
              max={product.stock}
            />
            <span className="quantity-unit l1">unidades</span>
          </div>
          {quantity > product.stock && (
            <p className="l1-medium" style={{ color: 'red', marginTop: '4px' }}>
              Stock máximo: {product.stock}
            </p>
          )}
        </div>

        {/* Price Breaks */}
        {product.priceBreaks && product.priceBreaks.length > 0 && (
          <div className="price-breaks-section">
            <h4 className="breaks-title p1-medium">Descuentos por volumen</h4>
            <div className="price-breaks">
              {product.priceBreaks.map((priceBreak, index) => {
                const isActive = quantity >= priceBreak.minQty
                const isSelected = selectedBreak === index
                
                return (
                  <div 
                    key={index}
                    className={`price-break ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedBreak(index)
                      setQuantity(priceBreak.minQty)
                    }}
                  >
                    <div className="break-quantity l1">
                      {priceBreak.minQty}+ unidades
                    </div>
                    <div className="break-price p1-medium">
                      {formatPrice(priceBreak.price)}
                    </div>
                    {priceBreak.discount && (
                      <div className="break-discount l1">
                        -{priceBreak.discount}%
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="price-summary">
          <div className="summary-row">
            <span className="summary-label p1">Precio unitario:</span>
            <span className="summary-value p1-medium">
              {formatPrice(calculatePrice(quantity) / quantity)}
            </span>
          </div>
          
          <div className="summary-row">
            <span className="summary-label p1">Cantidad:</span>
            <span className="summary-value p1-medium">{quantity} unidades</span>
          </div>

          {discountPercent > 0 && (
            <div className="summary-row discount-row">
              <span className="summary-label p1">Descuento:</span>
              <span className="summary-value discount-value p1-medium">
                -{discountPercent.toFixed(1)}%
              </span>
            </div>
          )}

          <div className="summary-row total-row">
            <span className="summary-label p1-medium">Total:</span>
            <span className="summary-value total-value h2">
              {formatPrice(currentPrice)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="calculator-actions">
          <button 
            className="btn btn-secondary cta1"
            onClick={() => onQuoteRequest(quantity, currentPrice)}
          >
            <span className="material-icons">email</span>
            Solicitar cotización oficial
          </button>
          
          <button 
            className="btn btn-primary cta1"
            onClick={() => {
              addToCart(product, quantity)
              alert(`${quantity} ${product.name} agregado(s) al carrito!`)
            }}
          >
            <span className="material-icons">shopping_cart</span>
            Agregar al carrito
          </button>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <div className="info-item">
            <span className="material-icons">local_shipping</span>
            <div className="info-content">
              <span className="info-title l1">Envío gratis</span>
              <span className="info-detail l1">En pedidos sobre $50.000</span>
            </div>
          </div>
          
          <div className="info-item">
            <span className="material-icons">schedule</span>
            <div className="info-content">
              <span className="info-title l1">Tiempo de producción</span>
              <span className="info-detail l1">7-10 días hábiles</span>
            </div>
          </div>
          
          <div className="info-item">
            <span className="material-icons">verified</span>
            <div className="info-content">
              <span className="info-title l1">Garantía</span>
              <span className="info-detail l1">30 días de garantía</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCalculator