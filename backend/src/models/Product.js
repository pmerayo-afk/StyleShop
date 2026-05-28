// ============================================
// models/Product.js - Consultas de productos
// ============================================

const db = require('../config/database');

const Product = {

  // Obtener todos los productos (con filtro opcional por categoría)
  getAll: async (category = null) => {
    if (category) {
      // Si viene una categoría, filtramos
      const [rows] = await db.query(
        'SELECT * FROM products WHERE category = ? ORDER BY id ASC',
        [category]
      );
      return rows;
    }
    // Sin filtro: devolvemos todos
    const [rows] = await db.query('SELECT * FROM products ORDER BY id ASC');
    return rows;
  },

  // Obtener un único producto por su ID
  getById: async (id) => {
    const [rows] = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    // rows[0] será undefined si no existe el producto
    return rows[0];
  },
};

module.exports = Product;
