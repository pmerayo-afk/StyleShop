// ============================================
// config/database.js - Conexión a MySQL
// ============================================

const mysql = require('mysql2/promise');

// Creamos un "pool" de conexiones:
// En lugar de abrir/cerrar una conexión por cada consulta,
// el pool reutiliza conexiones, lo que es más eficiente.
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'tienda_ropa',

  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : undefined,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificamos la conexión al arrancar
pool.getConnection()
  .then(conn => {
    console.log('✅ Conectado a MySQL correctamente');
    conn.release(); // Importante: liberar la conexión al pool
  })
  .catch(err => {
    console.error('❌ Error al conectar con MySQL:', err.message);
    console.error('   Verifica tu archivo .env y que MySQL esté corriendo');
  });

module.exports = pool;
