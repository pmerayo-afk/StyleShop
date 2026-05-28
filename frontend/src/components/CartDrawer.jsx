// ============================================
// components/CartDrawer.jsx – Panel lateral del carrito
// ============================================

import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay oscuro de fondo */}
      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Panel lateral */}
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Cabecera */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Mi carrito
            {totalItems > 0 && <span className="cart-drawer__count">{totalItems}</span>}
          </h2>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)} aria-label="Cerrar carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Lista de productos */}
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <span className="cart-drawer__empty-icon">🛍️</span>
              <p>Tu carrito está vacío</p>
              <button className="btn-outline" onClick={() => { setIsOpen(false); navigate('/products'); }}>
                Ver productos
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} className="cart-item__img" />
                <div className="cart-item__info">
                  <p className="cart-item__name">{item.name}</p>
                  <p className="cart-item__price">{Number(item.price).toFixed(2)} €</p>
                  {/* Selector de cantidad */}
                  <div className="cart-item__qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                {/* Botón eliminar */}
                <button
                  className="cart-item__remove"
                  onClick={() => removeItem(item.id)}
                  aria-label="Eliminar del carrito"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Resumen y checkout */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total</span>
              <strong>{totalPrice.toFixed(2)} €</strong>
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={handleCheckout}>
              Finalizar pedido →
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
