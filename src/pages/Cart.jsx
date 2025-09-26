
// Cart.jsx


import { PhotoProvider, PhotoView } from 'react-photo-view';   // ✅ Importamos PhotoProvider y PhotoView para el visor
import 'react-photo-view/dist/react-photo-view.css';


import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Cart() {
  const { t } = useTranslation();
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = (id) => {
    setRemovingId(id);   
    setTimeout(() => {
      removeFromCart(id);
      toast.info("🗑️ Producto eliminado", { autoClose: 1500 });
      setRemovingId(null);
    }, 300); // tiempo para animación
  };

  const total = cart.reduce((sum, i) => sum + i.price, 0).toFixed(2);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {t("cart")}
        <img src="/images/bolsa.png" alt="Carrito" style={styles.icon} />
      </h1>

      {!cart.length ? (
        <p style={styles.empty}>{t("emptyCart")} 😔</p>
      ) : (
        <>
          <ul style={styles.list}>
            {cart.map((item) => (
              <li
                key={item.cartItemId}
                style={{
                  ...styles.item,
                  opacity: removingId === item.cartItemId ? 0.4 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <Link to={`/producto/${item.id}`} style={styles.link}>
                  <PhotoProvider>
  <PhotoView src={item.images?.[0] || item.image}>
    <img
      src={item.images?.[0] || item.image}
      alt={item.name}
      style={styles.image}
      onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }}
    />
  </PhotoView>
</PhotoProvider>




                  <div style={styles.details}>
                    <h3 style={styles.name}>{t(item.name)}</h3>
                    <p style={styles.price}>{item.price}€</p>
                    {item.quantity && item.quantity > 1 && (
                      <p style={styles.quantity}>Cantidad: {item.quantity}</p>
                    )}
                  </div>
                </Link>

                <button
                  onClick={() => handleRemove(item.cartItemId)}
                  style={styles.removeBtn}
                >
                  <span className="desktop">Eliminar</span>
                  <span className="mobile">🗑️</span>
                </button>
              </li>
            ))}
          </ul>

          <div style={styles.summary}>
            <h2 style={styles.total}>Total: {total} €</h2>
            <button onClick={() => navigate("/checkout")} style={styles.checkoutBtn}>
              {t("proceedToPurchase")}
            </button>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
}



const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto auto 40px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "28x",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "30px",
    color: "#333",
  },
  icon: {
    width: "40px",
  },
  empty: {
    fontSize: "18px",
    color: "#666",
    textAlign: "center",
    marginTop: "60px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    padding: "12px",
    flexWrap: "wrap",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    textDecoration: "none",
    color: "inherit",
    flex: 1,
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "600",
  },
  price: {
    fontSize: "15px",
    color: "#12e2ef",
    fontWeight: "bold",
  },
  quantity: {
    fontSize: "14px",
    color: "#666",
  },
  removeBtn: {
    backgroundColor: "#ff4757",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  summary: {
    marginTop: "40px",
    textAlign: "center",
  },
  total: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  checkoutBtn: {
    padding: "12px 24px",
    backgroundColor: "#12e2ef",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
