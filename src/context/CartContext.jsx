// src/context/CartContext.jsx

import { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext"; // <--- ¡NUEVA IMPORTACIÓN!

// Exportación nombrada
export const CartContext = createContext();

// Custom hook opcional para usar el carrito
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Estado del carrito, inicializado desde localStorage o como un array vacío
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Obtener el usuario actual del contexto de autenticación
  const { currentUser } = useAuth(); // <--- ¡OBTENEMOS EL USUARIO ACTUAL!

  // Efecto para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // !!! NUEVO EFECTO PARA VACIAR EL CARRITO CUANDO EL USUARIO CIERRA SESIÓN !!!
  useEffect(() => {
    // Si currentUser es null (es decir, el usuario ha cerrado sesión)
    // Y el carrito no está ya vacío (para evitar bucles o llamadas innecesarias)
    if (currentUser === null && cart.length > 0) {
      console.log("Detectado cierre de sesión: Vaciando carrito."); // Mensaje para depuración
      setCart([]); // Vacía el carrito
    }
  }, [currentUser, cart.length]); // Este efecto se ejecuta cuando currentUser o la longitud del carrito cambian

  // Función para añadir un producto al carrito
  const addToCart = (product) => {
    const itemWithUniqueId = { ...product, cartItemId: uuidv4() };
    setCart(prev => [...prev, itemWithUniqueId]);
  };

  // Función para eliminar un producto del carrito por su cartItemId
  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Función para vaciar completamente el carrito (ya existente)
  const clearCart = () => {
    setCart([]);
  };

  // Objeto de valor que se pasará a los consumidores del contexto
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
