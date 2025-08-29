import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();
  const { addToCart, cart } = useCart();

  // unidades de este producto en el carrito
  const quantityInCart = cart.reduce(
    (acc, item) => item.id === product?.id ? acc + 1 : acc,
    0
  );

  const handleAddToCart = () => {
    // 🔹 validación a prueba de todo
    if (!product) return;

    if (product.stock <= 0 || quantityInCart >= product.stock) {
      toast.error("❌ No hay más stock disponible", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    addToCart(product);
    toast.success("✅ Producto añadido al carrito", {
      position: "top-right",
      autoClose: 3000,
    });
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
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          style={styles.img}
        />
        {product.stock < 5 && (
          <div style={styles.stockBadge}>¡Últimas unidades!</div>
        )}
        <h3>
          {capitalize(product.subcategoria)} - {product.brand}
        </h3>
        <p style={{ fontWeight: "bold" }}>{product.price} €</p>
        <p>{t(product.description)}</p>
      </Link>

      {/*  */}
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
    position: "relative"
  },
  cardHover: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transform: "translateY(-6px)",
    transition: "transform 0.3s",
    zIndex: 1000
  },
  img: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    marginBottom: "10px"
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
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px"
  }
};

