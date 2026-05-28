// ============================================
// context/CartContext.jsx – Estado global del carrito
// Usamos React Context para compartir el carrito
// entre todos los componentes sin prop-drilling
// ============================================

import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
};

export const CartProvider = ({ children }) => {
  // El carrito es un array de objetos: { ...product, quantity }
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Drawer del carrito

  // Añadir producto al carrito
  const addItem = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        // Si ya existe, sumamos 1 a la cantidad
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Si es nuevo, lo añadimos con cantidad 1
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true); // Abrimos el drawer al añadir
  }, []);

  // Actualizar la cantidad de un ítem
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      // Si la cantidad llega a 0, eliminamos el ítem
      setItems(prev => prev.filter(i => i.id !== productId));
    } else {
      setItems(prev =>
        prev.map(i => i.id === productId ? { ...i, quantity } : i)
      );
    }
  }, []);

  // Eliminar un ítem del carrito
  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  // Vaciar el carrito completo
  const clearCart = useCallback(() => setItems([]), []);

  // Número total de unidades en el carrito (para el badge)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  // Precio total del carrito
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      setIsOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};
