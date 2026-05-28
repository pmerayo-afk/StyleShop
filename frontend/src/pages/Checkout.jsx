// ============================================
// pages/Checkout.jsx – Página de checkout simulado
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Estado del formulario
  const [form, setForm] = useState({
    customer_name:    '',
    customer_email:   '',
    customer_address: '',
  });

  // Estados del proceso
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [success,  setSuccess]  = useState(null); // Guarda el pedido confirmado

  // Actualiza el campo correspondiente al escribir
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Envía el pedido al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('Tu carrito está vacío.');
      return;
    }

    try {
      setLoading(true);

      // Formateamos los ítems al formato que espera el backend
      const orderPayload = {
        ...form,
        items: items.map(item => ({
          product_id: item.id,
          quantity:   item.quantity,
          unit_price: item.price,
        })),
      };

      const result = await createOrder(orderPayload);
      setSuccess(result.order);
      clearCart(); // Vaciamos el carrito tras el éxito

    } catch (err) {
      setError(err.message || 'Error al procesar el pedido.');
    } finally {
      setLoading(false);
    }
  };

  // ---- PANTALLA DE CONFIRMACIÓN ----
  if (success) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="checkout-success">
            <div className="checkout-success__icon">✅</div>
            <h1 className="checkout-success__title">¡Pedido confirmado!</h1>
            <p className="checkout-success__msg">
              Gracias, <strong>{success.customer_name}</strong>. Hemos recibido tu pedido
              con referencia <strong>#{success.id}</strong>.
              Te enviaremos la confirmación a <strong>{success.customer_email}</strong>.
            </p>
            <div className="checkout-success__summary">
              {success.items.map(item => (
                <div key={item.id} className="checkout-success__item">
                  <img src={item.image_url} alt={item.product_name} />
                  <span>{item.product_name} × {item.quantity}</span>
                  <span>{(item.unit_price * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
              <div className="checkout-success__total">
                <strong>Total pagado</strong>
                <strong>{Number(success.total_amount).toFixed(2)} €</strong>
              </div>
            </div>
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Seguir comprando
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ---- FORMULARIO DE CHECKOUT ----
  return (
    <main className="checkout-page">
      <div className="container checkout-layout">

        {/* Formulario */}
        <section className="checkout-form-section">
          <h1 className="checkout-title">Finalizar pedido</h1>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customer_name">Nombre completo *</label>
              <input
                id="customer_name"
                name="customer_name"
                type="text"
                placeholder="Ana García López"
                value={form.customer_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customer_email">Email *</label>
              <input
                id="customer_email"
                name="customer_email"
                type="email"
                placeholder="ana@email.com"
                value={form.customer_email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customer_address">Dirección de envío *</label>
              <textarea
                id="customer_address"
                name="customer_address"
                placeholder="Calle Mayor 12, 2ºA&#10;28013 Madrid"
                value={form.customer_address}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            {/* Aviso de pago simulado */}
            <div className="checkout-notice">
              🔒 <strong>Pago simulado</strong> — No se realizará ningún cargo real.
            </div>

            {error && <p className="checkout-error">⚠️ {error}</p>}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%' }}
              disabled={loading || items.length === 0}
            >
              {loading ? 'Procesando...' : `Confirmar pedido — ${totalPrice.toFixed(2)} €`}
            </button>
          </form>
        </section>

        {/* Resumen del pedido */}
        <aside className="checkout-summary">
          <h2 className="checkout-summary__title">Resumen del pedido</h2>

          {items.length === 0 ? (
            <p className="checkout-summary__empty">
              Tu carrito está vacío.{' '}
              <button className="checkout-summary__link" onClick={() => navigate('/products')}>
                Ir a la tienda
              </button>
            </p>
          ) : (
            <>
              <div className="checkout-summary__items">
                {items.map(item => (
                  <div key={item.id} className="checkout-summary__item">
                    <img src={item.image_url} alt={item.name} />
                    <div className="checkout-summary__item-info">
                      <p className="checkout-summary__item-name">{item.name}</p>
                      <p className="checkout-summary__item-qty">Cantidad: {item.quantity}</p>
                    </div>
                    <span className="checkout-summary__item-price">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-summary__totals">
                <div className="checkout-summary__row">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="checkout-summary__row">
                  <span>Envío</span>
                  <span className="checkout-summary__free">Gratis</span>
                </div>
                <div className="checkout-summary__row checkout-summary__row--total">
                  <strong>Total</strong>
                  <strong>{totalPrice.toFixed(2)} €</strong>
                </div>
              </div>
            </>
          )}
        </aside>

      </div>
    </main>
  );
};

export default Checkout;
