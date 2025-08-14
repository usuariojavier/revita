import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import { useCart } from "../context/CartContext";




export default function Home({ productos }) {
  const [productosConStock, setProductosConStock] = useState(productos);

  const { addToCart } = useCart();


const handleAddToCart = (producto) => {
  if (producto.stock > 0) {
    addToCart(producto); // ✅ Añade al carrito

    const nuevosProductos = productosConStock.map(p =>
      p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
    );
    setProductosConStock(nuevosProductos); // ✅ Actualiza stock
  }
};






  return (
    <div style={{ padding: "5px" }}>
      <Banner />
      <img src ="/images/larepercha.jpg" alt="Menu" style={{ width: "50em", height: "30em" }} />
      

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(12em, 1fr))",
          gap: "16px",
          padding: "1px",
        }}
      >
        {productosConStock.map(p => (          //FUNCION AGREGAR AL CARRITO
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

