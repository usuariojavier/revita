import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
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
      </Link>

      <button onClick={() => addToCart(product)} style={styles.button}>
        Añadir al carrito
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
    transition: "transform 0.3s",
    width: "fit-content",
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
