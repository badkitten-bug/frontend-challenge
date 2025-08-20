import { useCart } from '../context/CartContext'
import { formatChileanPrice } from '../utils/formatting'
import './CartModal.css'

interface CartModalProps {
  onClose: () => void
}

const CartModal = ({ onClose }: CartModalProps) => {
  const { cartItems, removeFromCart, cartItemCount } = useCart()

  const cartTotal = cartItems.reduce((total, item) => total + item.basePrice * item.quantity, 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="h2">Carrito de Compras ({cartItemCount})</h2>
          <button onClick={onClose} className="close-button" aria-label="Cerrar carrito">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="modal-body">
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-name p1-medium">{item.name}</span>
                    <span className="item-quantity l1">{item.quantity} x {formatChileanPrice(item.basePrice)}</span>
                  </div>
                  <div className="item-actions">
                    <span className="item-total p1-medium">{formatChileanPrice(item.basePrice * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn" aria-label={`Quitar ${item.name} del carrito`}>
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <div className="cart-total">
            <span className="p1-medium">Total:</span>
            <span className="h2">{formatChileanPrice(cartTotal)}</span>
          </div>
          <button className="btn btn-primary cta1" disabled={cartItems.length === 0}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartModal
