# StyleShop – Tienda de Ropa

E-commerce de aprendizaje construido con **React + Vite** (frontend) y **Node.js + Express + MySQL** (backend).

---

## Estructura del proyecto

```
tienda-ropa/
├── backend/          ← API REST (Node.js + Express)
│   ├── database/
│   │   └── schema.sql          ← Tablas y datos de ejemplo
│   ├── src/
│   │   ├── config/database.js  ← Conexión MySQL
│   │   ├── controllers/        ← Lógica de negocio
│   │   ├── models/             ← Consultas SQL
│   │   └── routes/             ← Endpoints
│   ├── .env.example
│   └── server.js
│
└── frontend/         ← App React + Vite
    ├── src/
    │   ├── components/         ← Navbar, ProductCard, CartDrawer…
    │   ├── context/            ← Estado global del carrito
    │   ├── pages/              ← Home, Products, Checkout
    │   └── services/api.js     ← Llamadas al backend
    └── vite.config.js
```

---

## Requisitos previos

| Herramienta | Versión mínima |
|-------------|---------------|
| Node.js     | 18+           |
| npm         | 9+            |
| MySQL       | 8+            |

---

## 🚀 Pasos para ejecutar el proyecto

### 1 · Clona o descomprime el proyecto

```bash
cd tienda-ropa
```

---

### 2 · Configura la base de datos MySQL

Abre tu cliente MySQL (Workbench, DBeaver, terminal…) y ejecuta:

```sql
source backend/database/schema.sql
```

Esto crea la base de datos `tienda_ropa`, las tres tablas y carga 15 productos de ejemplo.

---

### 3 · Configura el backend

```bash
cd backend

# Copia el archivo de variables de entorno
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de MySQL:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=tienda_ropa
```

Instala dependencias e inicia el servidor:

```bash
npm install
npm run dev        # desarrollo con auto-reload (nodemon)
# ó
npm start          # producción
```

El backend estará disponible en **http://localhost:3001**

Prueba rápida:
```bash
curl http://localhost:3001/api/health
# → { "status": "ok" }

curl http://localhost:3001/api/products
# → [...lista de productos]
```

---

### 4 · Configura el frontend

Abre una **nueva terminal**:

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en **http://localhost:5173**

---

## Endpoints de la API

| Método | Ruta                              | Descripción                        |
|--------|-----------------------------------|------------------------------------|
| GET    | `/api/health`                     | Estado del servidor                |
| GET    | `/api/products`                   | Todos los productos                |
| GET    | `/api/products?category=camisetas`| Filtrado por categoría             |
| GET    | `/api/products/:id`               | Un producto por ID                 |
| POST   | `/api/orders`                     | Crear un pedido                    |

### Ejemplo: crear un pedido (POST /api/orders)

```json
{
  "customer_name": "Ana García",
  "customer_email": "ana@email.com",
  "customer_address": "Calle Mayor 12, Madrid",
  "items": [
    { "product_id": 1, "quantity": 2, "unit_price": 19.99 },
    { "product_id": 7, "quantity": 1, "unit_price": 44.99 }
  ]
}
```

---

## Páginas del frontend

| Ruta         | Página             |
|--------------|--------------------|
| `/`          | Inicio             |
| `/products`  | Listado + filtros  |
| `/checkout`  | Formulario + resumen de pedido |

---

## Categorías disponibles

`camisetas` · `pantalones` · `sudaderas` · `chaquetas` · `zapatillas`

---

## Próximos pasos sugeridos

- [ ] Autenticación de usuarios (JWT)
- [ ] Pasarela de pagos real (Stripe)
- [ ] Panel de administración para gestionar productos
- [ ] Historial de pedidos por usuario
- [ ] Sistema de tallas y stock por talla
- [ ] Imágenes propias subidas con Multer
