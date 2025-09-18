// src/pages/Home.jsx

import { useState, useEffect } from "react"; // Mantener useEffect por si acaso, pero ya no leerá de Firebase aquí
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import { useCart } from "../context/CartContext";
import TopNotice from "../components/TopNotice";
import Banner2 from "../components/banner2";

// import { database } from "../firebaseConfig"; // <--- ¡ELIMINAR ESTA IMPORTACIÓN!
// import { ref, onValue } from "firebase/database"; // <--- ¡ELIMINAR ESTA IMPORTACIÓN!

// Home ahora recibe la lista de productos como una prop
export default function Home({ productos }) { // <--- Recibe 'productos' como prop
  // productsWithStock ahora será directamente los 'productos' recibidos, a menos que necesites un estado local para el stock
  const [productosConStock, setProductosConStock] = useState(productos); // Inicializa con los productos recibidos
  const { addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  checkMobile(); // Ejecuta al montar
  window.addEventListener("resize", checkMobile);

  return () => window.removeEventListener("resize", checkMobile);
}, []);


  // Si los productos llegan via props, no necesitamos leerlos aquí de Firebase
  // useEffect(() => { // <--- ¡ELIMINAR ESTE useEffect!
  //   const productosRef = ref(database, "productos");
  //   onValue(productosRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const productosArray = Object.entries(data).map(([id, producto]) => ({
  //         id,
  //         ...producto,
  //       }));
  //       setProductosConStock(productosArray);
  //     }
  //   });
  // }, []);

  // Actualiza productosConStock cuando cambian los productos de las props (ej. por filtro o carga inicial)
  useEffect(() => {
    setProductosConStock(productos);
  }, [productos]);


  const handleAddToCart = (producto) => {
    if (producto.stock > 0) {
      addToCart(producto);
      const nuevosProductos = productosConStock.map(p =>
        p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
      );
      setProductosConStock(nuevosProductos);
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
          marginTop: isMobile ? "-120px" : "-50px" , // ajusta según la altura del div container de los productos  ********************************
        }}
      >
        {productosConStock.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={() => handleAddToCart(p)}
          />
        ))}
      </div>
    </div>
  );
}
