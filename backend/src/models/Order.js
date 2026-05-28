// ============================================
// models/Order.js - Consultas de pedidos
// ============================================

const db = require('../config/database');

const Order = {

  // Crear un nuevo pedido completo (cabecera + líneas de detalle)
  create: async ({ customer_name, customer_email, customer_address, total_amount, items }) => {

    // Usamos una transacción para que si algo falla,
    // no se guarde un pedido sin sus productos (o viceversa)
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // 1. Insertar la cabecera del pedido
      const [orderResult] = await connection.query(
        `INSERT INTO orders (customer_name, customer_email, customer_address, total_amount)
         VALUES (?, ?, ?, ?)`,
        [customer_name, customer_email, customer_address, total_amount]
      );

      const orderId = orderResult.insertId;

      // 2. Insertar cada línea de detalle
      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
           VALUES (?, ?, ?, ?)`,
          [orderId, item.product_id, item.quantity, item.unit_price]
        );
      }

      // 3. Confirmar la transacción
      await connection.commit();

      return orderId;

    } catch (error) {
      // Si algo falla, revertimos todos los cambios
      await connection.rollback();
      throw error;
    } finally {
      // Siempre liberamos la conexión
      connection.release();
    }
  },

  // Obtener un pedido con todos sus productos (JOIN)
  getById: async (id) => {
    // Primero obtenemos la cabecera
    const [orders] = await db.query(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );
    if (!orders[0]) return null;

    // Luego obtenemos las líneas con el nombre del producto
    const [items] = await db.query(
      `SELECT oi.*, p.name AS product_name, p.image_url
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = ?`,
      [id]
    );

    return { ...orders[0], items };
  },
};

module.exports = Order;
