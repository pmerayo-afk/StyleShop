-- Crear y usar la base de datos
CREATE DATABASE IF NOT EXISTS tienda_ropa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_ropa;

-- ----------------------------------------
-- TABLA: productos
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150)   NOT NULL,
  description TEXT,
  price       DECIMAL(10,2)  NOT NULL,
  category    ENUM('camisetas','pantalones','sudaderas','chaquetas','zapatillas') NOT NULL,
  image_url   VARCHAR(500),
  stock       INT            NOT NULL DEFAULT 0,
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------
-- TABLA: orders (cabecera del pedido)
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  customer_name   VARCHAR(150) NOT NULL,
  customer_email  VARCHAR(200) NOT NULL,
  customer_address TEXT        NOT NULL,
  total_amount    DECIMAL(10,2) NOT NULL,
  status          ENUM('pending','confirmed','shipped','delivered') DEFAULT 'pending',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------
-- TABLA: order_items (detalle del pedido)
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  order_id    INT            NOT NULL,
  product_id  INT            NOT NULL,
  quantity    INT            NOT NULL,
  unit_price  DECIMAL(10,2)  NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

INSERT INTO products (name, description, price, category, image_url, stock) VALUES
-- Camisetas
('Camiseta Básica Blanca',    'Camiseta 100% algodón, corte regular, perfecta para el día a día.',          19.99, 'camisetas',  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 50),
('Camiseta Oversize Negra',   'Camiseta oversize con tejido grueso, estilo streetwear.',                    24.99, 'camisetas',  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400', 35),
('Camiseta Estampada Azul',   'Camiseta con estampado gráfico en azul marino, 100% algodón orgánico.',     29.99, 'camisetas',  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', 40),

-- Pantalones
('Vaquero Slim Fit',          'Pantalón vaquero slim fit en azul clásico, 98% algodón 2% elastano.',       59.99, 'pantalones', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 30),
('Chino Beige',               'Pantalón chino en color beige, corte recto, elegante y cómodo.',            49.99, 'pantalones', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', 25),
('Jogger Negro',              'Pantalón jogger con puños ajustables, perfecto para el deporte y la calle.',39.99, 'pantalones', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', 45),

-- Sudaderas
('Sudadera con Capucha Gris', 'Hoodie clásico en gris jaspeado, interior suave, bolsillo canguro.',        44.99, 'sudaderas',  'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', 40),
('Sudadera Cremallera Verde', 'Sudadera con cremallera completa en verde oliva, cuello redondo.',          54.99, 'sudaderas',  'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400', 20),
('Crewneck Universitaria',   'Sudadera cuello redondo estilo universitario americano, unisex.',            49.99, 'sudaderas',  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', 30),

-- Chaquetas
('Chaqueta Vaquera Clásica',  'Chaqueta denim azul con detalles bordados, corte relaxed.',                 79.99, 'chaquetas',  'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400', 15),
('Bomber Verde Militar',      'Bomber jacket en verde militar con forro interior a rayas.',                89.99, 'chaquetas',  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', 12),
('Cortavientos Azul',         'Cortavientos ligero y resistente al agua, capucha plegable.',               69.99, 'chaquetas',  'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=400', 20),

-- Zapatillas
('Zapatilla Blanca Clásica',  'Sneaker blanco de cuero sintético, suela vulcanizada, estilo minimalista.',  79.99, 'zapatillas', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', 25),
('Runner Negra Deportiva',    'Zapatilla de running con suela de goma amortiguada, muy ligera.',            99.99, 'zapatillas', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 30),
('Basket High-Top Beige',     'Bota basket estilo retro en color beige con detalle en el tobillo.',        109.99, 'zapatillas', 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400', 18);


select * from products;