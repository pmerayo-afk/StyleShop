// ============================================
// pages/Home.jsx – Página de inicio
// ============================================

import { Link } from 'react-router-dom';
import './Home.css';

const FEATURES = [
  { icon: '🚚', title: 'Envío gratuito',    desc: 'En pedidos superiores a 50 €' },
  { icon: '↩️', title: 'Devoluciones',      desc: '30 días para cambios y devoluciones' },
  { icon: '🔒', title: 'Pago seguro',       desc: 'Tus datos siempre protegidos' },
  { icon: '🌿', title: 'Tejidos sostenibles', desc: 'Comprometidos con el medio ambiente' },
];

const CATEGORIES = [
  { name: 'Camisetas',  slug: 'camisetas',  emoji: '👕' },
  { name: 'Pantalones', slug: 'pantalones', emoji: '👖' },
  { name: 'Sudaderas',  slug: 'sudaderas',  emoji: '🧥' },
  { name: 'Chaquetas',  slug: 'chaquetas',  emoji: '🧣' },
  { name: 'Zapatillas', slug: 'zapatillas', emoji: '👟' },
];

const Home = () => {
  return (
    <main className="home">

      {/* ---- HERO ---- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">Nueva colección 2025</p>
            <h1 className="hero__title">
              Viste con<br />
              <em>estilo propio</em>
            </h1>
            <p className="hero__subtitle">
              Prendas cuidadas, materiales de calidad y diseños
              que duran más allá de las temporadas.
            </p>
            <div className="hero__ctas">
              <Link to="/products" className="btn-primary">
                Ver colección →
              </Link>
              <Link to="/products?category=novedades" className="btn-outline">
                Novedades
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__img-frame">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600"
                alt="Colección de ropa"
              />
            </div>
            <div className="hero__badge">
              <span>+15</span>
              <small>productos</small>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CATEGORÍAS ---- */}
      <section className="categories section">
        <div className="container">
          <h2 className="section-title">Explora por categoría</h2>
          <div className="categories__grid">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="cat-card"
              >
                <span className="cat-card__emoji">{cat.emoji}</span>
                <span className="cat-card__name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section className="features section">
        <div className="container features__grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-item">
              <span className="feature-item__icon">{f.icon}</span>
              <div>
                <h3 className="feature-item__title">{f.title}</h3>
                <p className="feature-item__desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- CTA FINAL ---- */}
      <section className="cta-banner section">
        <div className="container cta-banner__inner">
          <h2 className="cta-banner__title">¿Listo para renovar tu armario?</h2>
          <Link to="/products" className="btn-primary">
            Ver todos los productos →
          </Link>
        </div>
      </section>

    </main>
  );
};

export default Home;
