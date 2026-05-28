// ============================================
// services/api.js – Capa de comunicación con el backend
// Centraliza todas las llamadas HTTP para que sean
// fáciles de modificar si cambia la URL o el formato
// ============================================

const BASE_URL = '/api'; // El proxy de Vite lo redirige a http://localhost:3001

// Función auxiliar para manejar errores de fetch
const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Error de red' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

// ---- PRODUCTOS ----

// Obtener todos los productos (con filtro opcional)
export const getProducts = (category = null) => {
  const url = category
    ? `${BASE_URL}/products?category=${category}`
    : `${BASE_URL}/products`;
  return fetch(url).then(handleResponse);
};

// Obtener un producto por su ID
export const getProductById = (id) =>
  fetch(`${BASE_URL}/products/${id}`).then(handleResponse);

// ---- PEDIDOS ----

// Crear un pedido (checkout)
export const createOrder = (orderData) =>
  fetch(`${BASE_URL}/orders`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(orderData),
  }).then(handleResponse);
