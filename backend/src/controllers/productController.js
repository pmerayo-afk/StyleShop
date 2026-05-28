// ============================================
// controllers/productController.js
// Lógica de negocio para los endpoints de productos
// ============================================

const Product = require('../models/Product');

// GET /api/products
// GET /api/products?category=camisetas
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query; // Leemos el parámetro ?category=...

    // Categorías válidas (mismo ENUM que en la base de datos)
    const validCategories = ['camisetas', 'pantalones', 'sudaderas', 'chaquetas', 'zapatillas'];

    // Si viene una categoría, validamos que sea correcta
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        error: `Categoría inválida. Opciones: ${validCategories.join(', ')}`
      });
    }

    const products = await Product.getAll(category);
    res.json(products);

  } catch (error) {
    console.error('Error en getAllProducts:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Verificamos que el ID sea un número válido
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'ID de producto inválido' });
    }

    const product = await Product.getById(id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);

  } catch (error) {
    console.error('Error en getProductById:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

module.exports = { getAllProducts, getProductById };
