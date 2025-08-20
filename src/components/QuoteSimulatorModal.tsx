import { useState } from 'react'
import { Product } from '../types/Product'
import { formatChileanPrice } from '../utils/formatting'
import './QuoteSimulatorModal.css'

interface QuoteSimulatorModalProps {
  product: Product
  quantity: number
  totalPrice: number
  onClose: () => void
}

const QuoteSimulatorModal = ({ product, quantity, totalPrice, onClose }: QuoteSimulatorModalProps) => {
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')

  const handleGenerateQuote = () => {
    const quoteDetails = `
      Cotización para: ${companyName}
      Email: ${email}
      ---
      Producto: ${product.name}
      SKU: ${product.sku}
      Cantidad: ${quantity} unidades
      Precio Total: ${formatChileanPrice(totalPrice)}
    `
    alert('Cotización generada! (Revisa la consola para más detalles)')
    console.log(quoteDetails)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="h2">Simulador de Cotización</h2>
          <button onClick={onClose} className="close-button">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Producto: <strong>{product.name}</strong></p>
          <p>Cantidad: <strong>{quantity} unidades</strong></p>
          <p>Total Estimado: <strong className="h2">{formatChileanPrice(totalPrice)}</strong></p>
          <hr />
          <h3 className="h3">Datos de la Empresa</h3>
          <input
            type="text"
            placeholder="Nombre de la empresa"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="p1"
          />
          <input
            type="email"
            placeholder="Email de contacto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p1"
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleGenerateQuote} className="btn btn-primary cta1">
            Generar Cotización
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuoteSimulatorModal
