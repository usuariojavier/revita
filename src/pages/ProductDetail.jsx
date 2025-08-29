//////   PAGINA DETALLE DE PRODUCTO, ABRE CUANDO SE HACE CLICK EN UN PRODUCTO  //////////

import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify"; // para notificaciones
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import productos from "../data/productos";
import i18n from "../i18n/i18n";  // para traducciones


export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [visibleStock, setVisibleStock] = useState(null);





 useEffect(() => {
  const found = productos.find(p => p.id === parseInt(id));
  setProduct(found);
  setVisibleStock(found?.stock || 0);
}, [id]);


const quantityInCart = cart.filter(item => item.id === product?.id).length;




const handleAddToCart = () => {
  // Evita añadir si no hay producto, sin stock o ya alcanzaste el stock
  if (!product || visibleStock <= 0 || quantityInCart >= product.stock) {
    toast.error("❌ No hay más stock disponible", {
      position: "top-right",
      autoClose: 3000,
    });
    return; // 🔹 Sale sin añadir al carrito
  }

  addToCart(product);
  setVisibleStock(prev => prev - 1); // Reducir stock local
  toast.success("✅ Producto añadido al carrito", {
    position: "top-right",
    autoClose: 3000,
  });
};







  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.nombre}</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          style={{
            width: "300px",
            borderRadius: "8px",
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.4)" : "scale(1)",
            zIndex: 9,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />

        <div className="product-details">
          <p>
            <strong>Precio:</strong> {product.price} €
          </p>
          {/*<p>
            <strong>Categoría:</strong> {product.category}
          </p>*/}
          <p>
            <strong>Talla:</strong> {product.size}
          </p>
          <p>
            <strong>Descripción:</strong> {product.description}
          </p>
            <p>
                <strong>Marca:</strong> {product.brand}
            </p>
         {/* <p>
             <strong>Stock disponible:</strong> {visibleStock}
          </p>*/}
          



          {/*  --------   BOTON AÑADIR     --------------   */}
         <button
  onClick={handleAddToCart}
  disabled={visibleStock <= 0 || quantityInCart >= product.stock}
  style={{
    padding: "10px 20px",
    backgroundColor:
      quantityInCart >= product.stock || visibleStock <= 0 ? "#ccc" : "#12e2ef",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor:
      quantityInCart >= product.stock || visibleStock <= 0
        ? "not-allowed"
        : "pointer",
    marginTop: "10px",
  }}
>
  {quantityInCart >= product.stock || visibleStock <= 0
    ? "Sin stock disponible"
    : "Añadir al carrito"}
</button>





        </div>
      </div>




      {/* Galería de imágenes adicionales si las hay */}
      {product.images && product.images.length > 1 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Más imágenes</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {product.images.map((img, i) => (
              <img
                key={i}
                src={`/images/${img}`}
                alt={`Vista ${i + 1}`}
                style={{ width: "100px", borderRadius: "4px" }}
              />
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
