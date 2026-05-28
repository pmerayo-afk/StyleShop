// ============================================
// server.js - Punto de entrada del servidor
// ============================================

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const productRoutes = require('./src/routes/products');
const orderRoutes   = require('./src/routes/orders');

const app    = express();
const PORT   = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

// ---- MIDDLEWARES ----
// Desarrollo: CORS abierto hacia Vite. Producción: mismo servidor sirve el frontend.
if (!isProd) {
  app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'] }));
} else {
  app.use(cors());
}

app.use(express.json());

// ---- API ROUTES ----
app.use('/api/products', productRoutes);
app.use('/api/orders',   orderRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// ---- PRODUCCIÓN: sirve el build de React desde backend/public/ ----
if (isProd) {
  const distPath = path.join(__dirname, 'public');
  app.use(express.static(distPath));
  // Catch-all: cualquier ruta que no sea /api devuelve index.html (SPA routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });
}

// ---- MANEJADOR GLOBAL DE ERRORES ----
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ---- ARRANCAR ----
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📦 API disponible en http://localhost:${PORT}/api`);
  if (isProd) console.log(`🌐 Frontend servido desde /public`);
});

app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
