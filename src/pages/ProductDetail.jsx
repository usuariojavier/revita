import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [hovered, setHovered] = useState(false);









  






  useEffect(() => {
    const allProducts = [
      { id: 1, name: "Camiseta Mujer", price: 19.99, image: "Camiseta-mujer.jpg", category: "mujer", size: "M", description: "Camiseta cómoda y ligera." },
      { id: 2, name: "Zapatillas Hombre", price: 49.99, image: "Zapatillas-hombre.jpeg", category: "hombre", size: "L", description: "Zapatillas deportivas para hombre." },
    { id: 3, name: "Chaqueta Niño", price: 39.00,  image:"Chaqueta-nen.webp"  ,category: "nino", size: "S" },
    { id: 4, name: "Zapatillas niño", price: 29.99, image:"zapatillas-nen.jpg" , category: "nino", size: "s" },
    { id: 5, name: "Zapatillas Mujer", price: 59.99, image:"zapatillas-mujer.jpeg" , category: "mujer", size: "M" },
    { id: 6, name: "Camisa Hombre", price: 24.99, image:"camisa-hombre.jpeg" , category: "hombre", size: "S" },
    { id: 7, name: "Vestido Niña", price: 34.99, image:"vestido-nena.jpg" , category: "nina", size: "s" },
    { id: 8, name: "Pantalones Mujer", price: 39.99, image:"pantalones-mujer.jpeg" , category: "mujer", size: "L" },
    { id: 9, name: "Sudadera Hombre", price: 44.99, image:"sudadera-hombre.jpeg" , category: "hombre", size: "XL" },
    { id: 10, name: "Botas Niño", price: 49.99, image:"botas-nen.jpeg" , category: "nino", size: "L" },
    { id: 11, name: "Chaqueta Niña", price: 39.99, image:"chaqueta-nena.jpeg" , category: "nina", size: "M" },
    { id: 12, name: "Zapatillas Mariquita", price: 29.99, image:"zapatillas-mariquita.jpeg" , category: "mariquita", size: "S" }
    ];
    const found = allProducts.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  const isInCart = cart.some(item => item.id === product?.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
      toast.success("✅ Producto añadido al carrito", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (!product) return <p>Producto no encontrado</p>;

  return (

    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>


        <img
  src={`/images/${product.image}`}
  alt={product.name}
  style={{
    width: "400px",
    borderRadius: "8px",
    transition: "transform 0.3s ease",
    transform: hovered ? "scale(1.6)" : "scale(1)",
  }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
/>




        <div>
          <p><strong>Precio:</strong> {product.price} €</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Talla:</strong> {product.size}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            style={{
              padding: "10px 20px",
              backgroundColor: isInCart ? "#ccc" : "#3070d4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isInCart ? "not-allowed" : "pointer",
              marginTop: "10px",
            }}
          >
            {isInCart ? "Ya en el carrito" : "Añadir al carrito"}
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
