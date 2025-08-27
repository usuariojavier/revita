import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();


        function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
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
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          style={styles.img}
        />
        {/*<h3>{t(product.name)}</h3>    --------------------cambio para que no se vea el nombre completo */}
          
        {product.stock < 5 && (
                      <div style={styles.stockBadge}>¡Últimas unidades!</div>
                    )}
                 

        <h3>{capitalize(product.subcategoria)} - {product.brand}</h3>

        <p style={{ fontWeight: "bold" }}  >{product.price} €</p>
        <p>{t(product.description)}</p>
        {/*<p>Stock: {product.stock}</p>*/}
      </Link>

      <button
        onClick={onAddToCart}
        disabled={product.stock <= 0}
        style={{
          ...styles.button,
          backgroundColor: product.stock <= 0 ? "#ccc" : "#12e2ef",    //  color del boton
          cursor: product.stock <= 0 ? "not-allowed" : "pointer",   // desactiva el boton si no hay stock
          visibility: hovered ? "visible" : "hidden",  // ocultar el boton si no se pasa el mouse
        }}
      >
        {product.stock <= 0 ? t("Sin stock") : ("Añadir al carrito")}
      </button>
    </div>
  );
}

  




const styles = {
  card: {
    border: "1px solid #ccc", //  borde productos
    borderRadius: "6px",
    padding: "8px",
    textAlign: "center",
    transition: "transform 0.3s",
    width: "100%",
  },

  cardHover: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transform: "translateY(-6px)",
    transition: "transform 0.3s",
    zIndex: 1000,

    //transform: "rotate (-35deg), translateY(-6px)", //  rotacion de los productos
  },

  img: {
    width: "100%",
    height: "120px",
    maxWidth: "100%",
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
