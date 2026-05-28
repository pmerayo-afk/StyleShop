// ============================================
// pages/Products.jsx – Listado de productos con filtro
// ============================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // Leemos la categoría desde la URL (?category=camisetas)
  const category = searchParams.get('category');

  // Cargamos productos cada vez que cambia la categoría
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts(category);
        setProducts(data);
      } catch (err) {
        setError('No hay productos en esta categoría.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleCategoryChange = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="products-page">
      <div className="container">

        {/* Cabecera */}
        <div className="products-page__header">
          <div>
            <h1 className="products-page__title">Toda la colección</h1>
            <p className="products-page__subtitle">
              {loading ? 'Cargando...' : `${products.length} productos`}
            </p>
          </div>
          <CategoryFilter selected={category} onChange={handleCategoryChange} />
        </div>

        {/* Estados: cargando / error / resultados */}
        {loading && (
          <div className="loading">
            <div className="spinner" />
            <span>Cargando productos...</span>
          </div>
        )}

        {error && !loading && (
          <div className="error-msg">
            <p>⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="products-page__empty">
            <p>No hay productos en esta categoría.</p>
            <button className="btn-outline" onClick={() => handleCategoryChange(null)}>
              Ver todos
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default Products;
