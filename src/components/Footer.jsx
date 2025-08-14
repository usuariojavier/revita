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
    width: "100%", //  Esto asegura que el footer ocupe todo el ancho
    background: "#ecececff",
    color: "#fff",
    paddingTop: "1em",
    paddingBottom: "1em",
    fontFamily: "sans-serif",
    fontSize: "14px",
    position: "absolute",
    zindex: "800",
    mrginTop: "30px",
  },

  container: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: " 0 20px",
    marginBottom: "5px",

    maxWidth: "100%", // ✅ Igual que el resto del sitio
    margin: "20 auto", // ✅ Centra el contenido
  },

  column: {
    minWidth: "8em",
    marginBottom: "1em",
  },

  heading: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#12e2ef",
  },

  link: {
    display: "block",
    color: "grey",

    textDecoration: "none",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "color 0.3s",
    hover: {
      color: "green",
    },
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





