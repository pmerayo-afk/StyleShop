// ============================================
// routes/orders.js - Rutas de pedidos
// ============================================

const express = require('express');
const router  = express.Router();
const { createOrder } = require('../controllers/orderController');

// POST /api/orders  → Crear un nuevo pedido
router.post('/', createOrder);

module.exports = router;
