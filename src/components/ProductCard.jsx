// src/components/ProductCard.jsx


import { PhotoProvider, PhotoView } from 'react-photo-view';  // ✅ Importamos PhotoProvider y PhotoView para el visor
import 'react-photo-view/dist/react-photo-view.css';  // ✅ Importamos los estilos para el visor


import { Link } from "react-router-dom";  // ✅ Importamos Link
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useToast } from "../hooks/useToast"; // ✅ Usamos el hook personalizado

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();
  const { addToCart, cart } = useCart();
  const { success, error } = useToast(); // ✅ Desestructuramos las funciones del hook

  const quantityInCart = cart.reduce(
    (acc, item) => (item.id === product?.id ? acc + 1 : acc),
    0
  );

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock <= 0 || quantityInCart >= product.stock) {
      error("❌ No hay más stock disponible");
      return;
    }

    addToCart(product);
    success("✅ Producto añadido al carrito");
  };

  function capitalize(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  }

  return (
    <div
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={`/producto/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div style={styles.imageWrapper}>
  <PhotoProvider>
    {product.images && Object.values(product.images).length > 0 ? (
      <PhotoView src={Object.values(product.images)[0]}>
        <img
          src={Object.values(product.images)[0]}
          alt={product.name}
          style={styles.img}
          onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }}
        />
      </PhotoView>
    ) : (
      <img
        src={product.image || "/images/placeholder.jpg"}
        alt={product.name}
        style={styles.img}
      />
    )}
  </PhotoProvider>
</div>


        {product.stock < 5 && (
          <div style={styles.stockBadge}>¡Últimas unidades!</div>
        )}
        <h3>
          {capitalize(product.subcategoria)} - {product.brand}
        </h3>
        <p style={{ fontWeight: "bold" }}>{product.price} €</p>
        <p>{t(product.description)}</p>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0 || quantityInCart >= product.stock}
        style={{
          ...styles.button,
          backgroundColor:
            product.stock <= 0 || quantityInCart >= product.stock
              ? "#ccc"
              : "#12e2ef",
          cursor:
            product.stock <= 0 || quantityInCart >= product.stock
              ? "not-allowed"
              : "pointer",
          visibility: hovered ? "visible" : "hidden",
        }}
      >
        {product.stock <= 0 || quantityInCart >= product.stock
          ? t("Sin stock")
          : "Añadir al carrito"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "8px",
    textAlign: "center",
    transition: "transform 0.3s",
    width: "100%",
    position: "relative",
  },
  cardHover: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transform: "translateY(-6px)",
    transition: "transform 0.3s",
    zIndex: 8,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: "100%",
    overflow: "hidden",
    marginBottom: "10px",
    borderRadius: "4px",
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  stockBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#ff4757",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
