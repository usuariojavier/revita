import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.banner}>
      <p style={styles.text}>
        Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra política de cookies.
      </p>
      <button onClick={handleAccept} style={styles.button}>
        Aceptar
      </button>
    </div>
  );
}

const styles = {
  banner: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    right: "20px",
    backgroundColor: "#191919",
    color: "#fff",
    padding: "16px 24px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999,
    flexWrap: "wrap",
    gap: "12px",
  },
  text: {
    flex: 1,
    fontSize: "14px",
    lineHeight: "1.4",
  },
  button: {
    backgroundColor: "#12e2ef",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
};
