import { createContext, useState, useContext, useEffect } from "react";

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

  const addToCart = (product) => setCart(prev => [...prev, product]);
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

