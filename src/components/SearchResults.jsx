import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import productos from '../data/productos';
import { useCart } from '../context/CartContext';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const query = searchParams.get('q') || '';

  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      const searchResults = productos.filter(product =>
        product.nombre?.toLowerCase().includes(searchTerm) ||
        product.name?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.genero?.toLowerCase().includes(searchTerm) ||
        product.categoria?.toLowerCase().includes(searchTerm) ||
        product.subcategoria?.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm)
      );
      setResults(searchResults);
      setFilteredResults(searchResults);
    } else {
      setResults([]);
      setFilteredResults([]);
    }

    setLoading(false);
  }, [query]);

  const handleFilter = (filters) => {
    let filtered = [...results];

    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category === filters.category ||
        product.genero === filters.category
      );
    }

    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      filtered = filtered.filter(product =>
        product.price >= min && (max ? product.price <= max : true)
      );
    }

    if (filters.size) {
      filtered = filtered.filter(product =>
        product.size?.toLowerCase() === filters.size.toLowerCase()
      );
    }

    setFilteredResults(filtered);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Buscando productos...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.searchHeader}>
        <h1 style={styles.title}>
          {query ? `Resultados para: "${query}"` : 'Todos los productos'}
        </h1>
        <p style={styles.resultsCount}>
          {filteredResults.length} {filteredResults.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
      </div>

      <div style={styles.content}>
        <main style={styles.resultsGrid}>
          {filteredResults.length === 0 ? (
            <div style={styles.noResults}>
              <h3>No se encontraron productos</h3>
              <p>Intenta con otros términos de búsqueda o ajusta los filtros</p>
            </div>
          ) : (
            filteredResults.map(product => (
              <div key={product.id} style={styles.productCard}>
                
                {/* Enlace al detalle del producto */}
                <Link 
                  to={`/producto/${product.id}`} 
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={styles.imageContainer}>
                    <img 
                      src={`/images/${product.image}`} 
                      alt={product.nombre || product.name}
                      style={styles.productImage}
                      onError={(e) => {e.target.src = "/images/placeholder.jpg"}}
                    />
                    {product.stock < 5 && (
                      <div style={styles.stockBadge}>¡Últimas unidades!</div>
                    )}
                  </div>

                  <div style={styles.productInfo}>
                    <h3 style={styles.productName}>
                      {product.nombre || product.name}
                    </h3>
                    <p style={styles.productBrand}>{product.brand}</p>
                    <p style={styles.productCategory}>
                      {product.categoria} • {product.subcategoria}
                    </p>
                    <div style={styles.productPricing}>
                      <span style={styles.productPrice}>{product.price}€</span>
                      <span style={styles.productSize}>Talla: {product.size}</span>
                    </div>
                  </div>
                </Link>

                {/* Botón fuera del Link */}
                {/*<button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  style={{
                    ...styles.addToCartBtn,
                    backgroundColor: product.stock <= 0 ? "#ccc" : "#12e2ef",
                    cursor: product.stock <= 0 ? "not-allowed" : "pointer"
                  }}
                >
                  {product.stock <= 0 ? t("Sin stock") : "Añadir al carrito"}
                </button>*/}
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "15px auto 0",
    padding: "200px 20px ",
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
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    padding: "50px",
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
    boxShadow: "0 2px 8px rgba(41, 211, 64, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  imageContainer: {
    position: "relative",
    height: "300px",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
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
    fontWeight: "bold",
  },
  productInfo: {
    padding: "15px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
    lineHeight: "1.3",
  },
  productBrand: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
    fontStyle: "italic",
  },
  productCategory: {
    fontSize: "12px",
    color: "#999",
    marginBottom: "10px",
    textTransform: "capitalize",
  },
  productPricing: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  productPrice: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#12e2ef",
  },
  productSize: {
    fontSize: "12px",
    color: "#666",
    backgroundColor: "#f0f0f0",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  addToCartBtn: {   //anulado
    width: "100%",
    padding: "10px",
    backgroundColor: "#12e2ef",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};
