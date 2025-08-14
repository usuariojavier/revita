import { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Instala con: npm install uuid

// Exportación nombrada
export const CartContext = createContext();

//  Custom hook opcional
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
  const itemWithUniqueId = { ...product, cartItemId: uuidv4() };
  setCart(prev => [...prev, itemWithUniqueId]);
};

const removeFromCart = (cartItemId) => {
  setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

