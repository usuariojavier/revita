
// src/components/TopNotice.jsx


import { useEffect, useState } from "react";

export default function TopNotice() {
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowNotice(window.scrollY < 10); // solo visible cuando estás arriba
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showNotice) return null;

  return (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#12e2ef",
    color: "#fff",
    overflow: "hidden", // ← importante para ocultar el desbordamiento
    padding: "2px 10px",
    fontSize: "15px",
    fontWeight: "500",
    zIndex: 1001,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  }}>
    <div className="notice-text">
      🚚 Envíos gratis en pedidos superiores a 50€ — ¡Solo esta semana!
    </div>
  </div>
);

}




