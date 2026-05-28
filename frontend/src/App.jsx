// ============================================
// App.jsx – Raíz de la aplicación con rutas
// ============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar      from './components/Navbar';
import CartDrawer  from './components/CartDrawer';
import Home        from './pages/Home';
import Products    from './pages/Products';
import Checkout    from './pages/Checkout';

const App = () => {
  return (
    // CartProvider envuelve todo para que el carrito
    // esté disponible en cualquier componente
    <CartProvider>
      <BrowserRouter>
        {/* Navbar siempre visible */}
        <Navbar />

        {/* Drawer del carrito (se abre desde cualquier página) */}
        <CartDrawer />

        {/* Rutas principales */}
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/products"  element={<Products />} />
          <Route path="/checkout"  element={<Checkout />} />
          {/* Ruta catch-all: cualquier URL desconocida → inicio */}
          <Route path="*"          element={<Home />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
