////////////  PAGINA CATEGORIA, ABRE CUANDO SE HACE CLICK EN UNA CATEGORIA o subcategoria  //////////////////////

import { useParams } from "react-router-dom";
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import { ToastContainer, toast } from "react-toastify";  // para notificaciones de carrito
import i18n from "../i18n/i18n";  // para traducciones

export default function Category() {
  const { genero, category, subcategoria } = useParams();

  // Filtrado según URL
  let filtrados = productos;
  if (genero) filtrados = filtrados.filter(p => p.genero === genero);
  if (category) filtrados = filtrados.filter(p => p.categoria === category);
  if (subcategoria) filtrados = filtrados.filter(p => p.subcategoria === subcategoria);

  return (
    <div style={styles.container}>
      {/* Cabecera igual que SearchResults */}
      <div style={styles.searchHeader}>
        <h1 style={styles.title}>
          {genero ? genero.toUpperCase() : "Todos los productos"}{" "}
          {category ? `/ ${category.toUpperCase()}` : ""}{" "}
          {subcategoria ? `/ ${subcategoria.toUpperCase()}` : ""}
        </h1>
        <p style={styles.resultsCount}>
          {filtrados.length} {filtrados.length === 1 ? "producto encontrado" : "productos encontrados"}
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
              <div key={p.id} style={styles.productCard}>
                <ProductCard product={p} />
              </div>
            ))
          )}
        </main>
      </div>  <ToastContainer />
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
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  resultsCount: {
    fontSize: "16px",
    color: "#666",
    margin: 0,
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
    justifyContent: "space-between"
  }
};
