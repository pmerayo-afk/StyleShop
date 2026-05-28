// ============================================
// main.jsx – Punto de entrada de React
// ============================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode activa advertencias extra en desarrollo
  // para ayudarte a detectar problemas
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
