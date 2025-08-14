import React, { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        
        position: "fixed",
        bottom: "1em",
        right: "1em",
        padding: "0.1em  0.1em",
        backgroundColor: 'transparent',
        
        color: "#12e2ef",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: 1000,
        transition: "opacity 0.3s ease",
      }}
    >
      <img
        src="/images/up.png"
        alt="Ir hacia arriba"
        style={{ width: "3em", height: "3em" }}
      />
    </button>
  );
}
