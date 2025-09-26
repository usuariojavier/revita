import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';


export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { products } = useProducts();

  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      const searchResults = products.filter(product =>
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
  }, [query, products]);

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
                <Link 
                  to={`/product/${product.id}`} 
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={styles.imageContainer}>
                    <img 
                      src={product.images?.[0] || "/images/placeholder.jpg"}
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
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
