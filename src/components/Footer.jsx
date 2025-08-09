import React from "react";
import { Link } from "react-router-dom";



export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Sección de navegación */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Colecciones</h4>
          <Link to="/mujer" style={styles.link}>Mujer</Link>
          <Link to="/hombre" style={styles.link}>Hombre</Link>
          <Link to="/ninos" style={styles.link}>Niños</Link>
          <Link to="/novedades" style={styles.link}>Novedades</Link>
        </div>

        {/* Sección de ayuda */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Ayuda</h4>
          <Link to="/Envios" style={styles.link}>Envíos</Link>
          <Link to="/Devoluciones" style={styles.link}>Devoluciones</Link>
          <Link to="/FAQ" style={styles.link}>Preguntas frecuentes</Link>
          <Link to="/Contacto" style={styles.link}>Contacto</Link>
        </div>

        {/* Sección de redes */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Síguenos</h4>
          <Link to="https://instagram.com" target="_blank" rel="noreferrer" style={styles.link}>Instagram</Link>
          <Link to="https://facebook.com" target="_blank" rel="noreferrer" style={styles.link}>Facebook</Link>
          <Link to="https://tiktok.com" target="_blank" rel="noreferrer" style={styles.link}>TikTok</Link>
        </div>
      </div>

      {/* Línea inferior */}
      <div style={styles.bottom}>
        <p style={styles.bottomText}>© 2025 REVITA — Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    
    background: "#333",
    color: "#fff",
    paddingTop: "5px",
    paddingBottom: "20px",
    fontFamily: "sans-serif",
    fontSize: "14px",
  },
  container: {
    display: "flex",
    
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "0 20px",
    marginBottom: "5px",
  },
  column: {
    minWidth: "150px",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "16px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  link: {
    display: "block",
    color: "#ccc",
    textDecoration: "none",
    marginBottom: "6px",
    fontSize: "14px",
  },
  bottom: {
    borderTop: "1px solid #555",
    textAlign: "center",
    paddingTop: "15px",
  },
  bottomText: {
    fontSize: "13px",
    color: "#aaa",
  },
};

