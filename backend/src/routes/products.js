// ============================================
// routes/products.js - Rutas de productos
// ============================================

const express = require('express');
const router  = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

// GET /api/products          → Todos los productos
// GET /api/products?category=camisetas  → Filtrado por categoría
router.get('/', getAllProducts);

// GET /api/products/:id      → Un producto por ID
router.get('/:id', getProductById);

module.exports = router;
