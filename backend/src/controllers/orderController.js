// ============================================
// controllers/orderController.js
// Lógica de negocio para los endpoints de pedidos
// ============================================

const Order = require('../models/Order');

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { customer_name, customer_email, customer_address, items } = req.body;

    // ---- VALIDACIONES BÁSICAS ----

    if (!customer_name || customer_name.trim().length < 2) {
      return res.status(400).json({ error: 'El nombre es obligatorio (mínimo 2 caracteres)' });
    }

    if (!customer_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer_email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    if (!customer_address || customer_address.trim().length < 5) {
      return res.status(400).json({ error: 'La dirección es obligatoria (mínimo 5 caracteres)' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El pedido debe tener al menos un producto' });
    }

    // Validamos cada ítem del carrito
    for (const item of items) {
      if (!item.product_id || isNaN(item.product_id) || item.product_id <= 0) {
        return res.status(400).json({ error: 'product_id inválido en algún ítem' });
      }
      if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({ error: 'La cantidad debe ser mayor que 0' });
      }
      if (!item.unit_price || isNaN(item.unit_price) || item.unit_price <= 0) {
        return res.status(400).json({ error: 'El precio unitario debe ser mayor que 0' });
      }
    }

    // ---- CALCULAR TOTAL ----
    const total_amount = items.reduce(
      (sum, item) => sum + (item.quantity * item.unit_price), 0
    ).toFixed(2);

    // ---- CREAR PEDIDO ----
    const orderId = await Order.create({
      customer_name:    customer_name.trim(),
      customer_email:   customer_email.trim().toLowerCase(),
      customer_address: customer_address.trim(),
      total_amount,
      items,
    });

    // Devolvemos el pedido recién creado
    const newOrder = await Order.getById(orderId);

    res.status(201).json({
      message: '¡Pedido creado correctamente!',
      order: newOrder,
    });

  } catch (error) {
    console.error('Error en createOrder:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

module.exports = { createOrder };
