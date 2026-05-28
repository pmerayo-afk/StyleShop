// ============================================
// components/Navbar.jsx – Barra de navegación
// ============================================

import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { pathname } = useLocation();

  return (
    <header className="navbar">
      <div className="container navbar__inner">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">✦</span>
          StyleShop
        </Link>

        {/* Navegación principal */}
        <nav className="navbar__nav">
          <Link to="/"         className={`navbar__link ${pathname === '/'         ? 'active' : ''}`}>Inicio</Link>
          <Link to="/products" className={`navbar__link ${pathname === '/products' ? 'active' : ''}`}>Tienda</Link>
        </nav>

        {/* Botón del carrito */}
        <button
          className="navbar__cart-btn"
          onClick={() => setIsOpen(true)}
          aria-label={`Carrito con ${totalItems} productos`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {totalItems > 0 && (
            <span className="navbar__cart-badge">{totalItems}</span>
          )}
        </button>

      </div>
    </header>
  );
};

export default Navbar;
