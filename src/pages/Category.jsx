import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ToastContainer } from "react-toastify";
import i18n from "../i18n/i18n";
import { useState, useEffect } from "react";

export default function Category({ allProducts }) {
  const { genero, category, subcategoria } = useParams();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  let filtrados = allProducts;
  if (genero) filtrados = filtrados.filter(p => p.genero === genero);
  if (category) filtrados = filtrados.filter(p => p.categoria === category);
  if (subcategoria) filtrados = filtrados.filter(p => p.subcategoria === subcategoria);

  const containerStyle = {
    ...styles.container,
    marginTop: isMobile ? "0px" : "60px",
  };

  return (
    <div style={containerStyle}>
      <div style={styles.searchHeader}>
        <h1 style={styles.title}>
          {genero && <span>{genero.toUpperCase()}</span>}
          {category && <span> / {category.toUpperCase()}</span>}
          {subcategoria && <span> / {subcategoria.toUpperCase()}</span>}
        </h1>

        {genero && (
          <p style={styles.description}>
            Explora nuestra selección exclusiva para {genero.toLowerCase()}
          </p>
        )}

        <p style={styles.resultsCount}>
          🛍️ {filtrados.length} {filtrados.length === 1 ? "producto disponible" : "productos disponibles"}
        </p>
      </div>

      <div style={styles.content}>
        <main style={styles.resultsGrid}>
          {filtrados.length === 0 ? (
            <div style={styles.noResults}>
              <h3>No se encontraron productos</h3>
              <p>Intenta con otros términos de búsqueda o ajusta los filtros</p>
            </div>
          ) : (
            filtrados.map(p => (
              <div key={p.id} className="productCard" style={styles.productCard}>
                <ProductCard product={p} />
              </div>
            ))
          )}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "80px auto 0",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  searchHeader: {
    marginBottom: "30px",
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: "20px",
  },
  title: {
    fontSize: "2em",
    fontWeight: "700",
    color: "#222",
    marginBottom: "10px",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  description: {
    fontSize: "0.85em",
    color: "#888",
    textAlign: "center",
    marginBottom: "10px",
  },
  resultsCount: {
    fontSize: "0.95em",
    color: "#555",
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "10px",
  },
  content: {
    display: "flex",
    gap: "30px",
  },
  resultsGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
  },
  noResults: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  productCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};
