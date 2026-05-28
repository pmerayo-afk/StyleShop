// ============================================
// components/ProductCard.jsx – Tarjeta de producto
// ============================================

import { useCart } from '../context/CartContext';
import './ProductCard.css';

// Etiqueta visual para cada categoría
const CATEGORY_LABELS = {
  camisetas:  'Camisetas',
  pantalones: 'Pantalones',
  sudaderas:  'Sudaderas',
  chaquetas:  'Chaquetas',
  zapatillas: 'Zapatillas',
};

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product);
  };

  return (
    <article className="product-card">
      {/* Imagen del producto */}
      <div className="product-card__img-wrap">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-card__img"
          loading="lazy" /* Lazy load para mejorar rendimiento */
        />
        <span className="product-card__category">
          {CATEGORY_LABELS[product.category] || product.category}
        </span>
      </div>

      {/* Información del producto */}
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            {Number(product.price).toFixed(2)} €
          </span>
          <button className="product-card__btn" onClick={handleAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
