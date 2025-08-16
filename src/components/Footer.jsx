

import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";


export default function Footer() 
{const { t } = useTranslation();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Sección de navegación */}
        <div style={styles.column}>
          <h4 style={styles.heading}>{t("collections")}</h4>
          <Link to="/mujer" style={styles.link}>
            {t("women")}
          </Link>
          <Link to="/hombre" style={styles.link}>
            {t("men")}
          </Link>
          <Link to="/ninos" style={styles.link}>
            {t("children")}
          </Link>
          <Link to="/novedades" style={styles.link}>
            {t("news")}
          </Link>
        </div>

        {/* Sección de ayuda */}
        <div style={styles.column}>
          <h4 style={styles.heading}>{t("help")}</h4>
          <Link to="/Envios" style={styles.link}>
            {t("shipments")}
          </Link>
          <Link to="/Devoluciones" style={styles.link}>
            {t("returns")}
          </Link>
          <Link to="/FAQ" style={styles.link}>
           FAQ
          </Link>
          <Link to="/Contacto" style={styles.link}>
            {t("contact")}
          </Link>
        </div>

        {/* Sección de redes */}
        <div style={styles.column}>
          <h4 style={styles.heading}>{t("followUs")}</h4>
          <Link
            to="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            Instagram
          </Link>
          <Link
            to="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            Facebook
          </Link>
          <Link
            to="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            TikTok
          </Link>
        </div>
      </div>

      {/* Línea inferior */}
      <div style={styles.bottom}>
        <p style={styles.bottomText}>
          © 2025 REVITA — Todos los derechos reservados
        </p>
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





