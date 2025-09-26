
// src/pages/Home.jsx

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import { useCart } from "../context/CartContext";
import TopNotice from "../components/TopNotice";
import Banner2 from "../components/banner2";
import { useToast } from "../hooks/useToast"; // ✅ Importa el hook personalizado

export default function Home({ productos }) {
  const [productosConStock, setProductosConStock] = useState(productos);
  const { addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const { success, error } = useToast(); // ✅ Desestructura las funciones del hook

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
  const productosInvertidos = [...productos].reverse(); // ✅ invierte el orden
  setProductosConStock(productosInvertidos);
}, [productos]);


  const handleAddToCart = (producto) => {        //     AÑADIR AL CARRITO  //
    if (producto.stock > 0) {
      addToCart(producto);
      const nuevosProductos = productosConStock.map(p =>
        p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
      );
      setProductosConStock(nuevosProductos);
      success("✅ Producto añadido al carrito"); // ✅ Toast de confirmación
    } else {
      error("❌ No hay más stock disponible"); // ✅ Toast de error
    }
  };

  return (
    <div style={{ padding: "5px" }}>
      <TopNotice />
      <Banner />
      <Banner2 />

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(15em, 1fr))",
          gap: "2px",
          padding: "1px",
          marginTop: isMobile ? "-120px" : "-50px",
        }}
      >
        {productosConStock.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={() => handleAddToCart(p)} // ✅ Pasa la función personalizada
          />
        ))}
      </div>
    </div>
  );
}
