// src/pages/ProductDetail.jsx




import { PhotoProvider, PhotoView } from 'react-photo-view';  // ✅ Importamos PhotoProvider y PhotoView para el visor
import 'react-photo-view/dist/react-photo-view.css';


import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import productos from "../data/productos"; // <--- ¡¡ESTA LÍNEA DEBE SER ELIMINADA!!
import Footer from "../components/Footer";

// Asegúrate de que este componente reciba la prop 'allProducts'
export default function ProductDetail({ allProducts }) { // <--- ¡¡CAMBIO AQUÍ!!
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [visibleStock, setVisibleStock] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);


  useEffect(() => {
    // La búsqueda ahora es sobre 'allProducts' y sin parseInt()
    const found = allProducts.find(p => p.id === id); // <--- ¡¡CAMBIO AQUÍ!!
    setProduct(found);
    setVisibleStock(found?.stock || 0);
  }, [id, allProducts]); // <-- Añadir allProducts a las dependencias del useEffect

  const quantityInCart = cart.filter(item => item.id === product?.id).length;

  const handleAddToCart = () => {
    if (!product || visibleStock <= 0 || quantityInCart >= product.stock) {
      toast.error("❌ No hay más stock disponible", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

                                    /////////  TOAST PERSONALIZADO  CARTEL PRODUCTO AÑADIDO  //////////////  useState
    addToCart(product);
    setVisibleStock(prev => prev - 1);
    toast.success("✅ Producto añadido al carrito", {
      position: "top-right",
      autoClose: 1000,
      style: {
    backgroundColor: "#12e2ef",
    color: "#fff",
    fontWeight: "bold",
  },
    });
  };

  if (!product) {
  return <p>Producto no encontrado</p>;
}

  return (
    <>
      <div
        style={{
          minHeight: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "10px",
        }}
      >
        <h2   style={{  marginBottom : 50, marginTop: -120}}  >{product.nombre}</h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent : "center",
            alignItems: "center",
           
            fontFamily: "Avenir Next Medium",
          }}
        >
          
  <PhotoProvider>
  <PhotoView src={Object.values(product.images)?.[activeImageIndex]}>
    <img
      src={Object.values(product.images)?.[activeImageIndex]}
      alt={product.name}
      style={{ width: "300px", borderRadius: "8px", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }}
    />
  </PhotoView>
</PhotoProvider>



          <div
            className="product-details"
            style={{
              fontFamily: "Avenir Next Medium",
              /*transform: hovered ? "rotate(-360deg)" : "translate(-150px)",
              transition: hovered
                ? "transform 0.5s ease-in"
                : "transform 1000s ease-out",*/
            }}
          >

              {product.images && Object.values(product.images).length > 0 && (    //  
            <div style={{ marginTop: "20px" }}>
            <h4>Galería del producto</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Object.values(product.images).map((url, i) => (
              <img
          key={i}
          src={url}
          alt={`Vista ${i + 1}`}
          onClick={() => setActiveImageIndex(i)}
          style={{
            width: "100px",
            borderRadius: "4px",
            cursor: "pointer",
            border: activeImageIndex === i ? "2px solid #12e2ef" : "2px solid transparent",
            boxShadow: activeImageIndex === i ? "0 0 6px rgba(18,226,239,0.6)" : "none"
          }}
          onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }}
          />
          ))}
              </div>
            </div>
      )}


         <p>     </p>


            <p>
              <strong>Precio:</strong> {product.price} €
            </p>
            <p>
              <strong>Talla:</strong> {product.size}
            </p>
            <p>
              <strong>Descripción:</strong> {product.description}
            </p>
            <p>
              <strong>Marca:</strong> {product.brand}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={visibleStock <= 0 || quantityInCart >= product.stock}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  quantityInCart >= product.stock || visibleStock <= 0
                    ? "#ccc"
                    : "#12e2ef",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor:
                  quantityInCart >= product.stock || visibleStock <= 0
                    ? "not-allowed"
                    : "pointer",
                marginTop: "1px",
              }}
            >
              {quantityInCart >= product.stock || visibleStock <= 0
                ? "Sin stock disponible"
                : "Añadir al carrito"}
            </button>
          </div>
        </div>

        




      </div>

      <Footer />
      <ToastContainer/>

    </>
  );
}
