import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();





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
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          style={styles.img}
        />
        <h3>{t(product.name)}</h3>
        <p>{product.price} €</p>
        <p>Stock: {product.stock}</p>
      </Link>

      <button
        onClick={onAddToCart}
        disabled={product.stock <= 0}
        style={{
          ...styles.button,
          backgroundColor: product.stock <= 0 ? "#ccc" : "#12e2ef",
          cursor: product.stock <= 0 ? "not-allowed" : "pointer",
        }}
      >
        {product.stock <= 0 ? "Sin stock" : "Añadir al carrito"}
      </button>
    </div>
  );
}

  




const styles = {
  card: {
    /*border: "1px solid #ccc",*/ //  borde productos
    borderRadius: "6px",
    padding: "8px",
    textAlign: "center",
    transition: "transform 0.3s",
    width: "100%",

  },
  cardHover: {
    transform: "scale(1.1)",
  },
  img: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px",
   
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
