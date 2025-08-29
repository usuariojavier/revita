import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { FaSearch } from "react-icons/fa";
import productos from "../data/productos";

export default function SearchBar({ onSearch }) {
  const { t } = useTranslation();
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    price: "",
    size: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filteredProducts = productos.filter(product =>
        product.nombre?.toLowerCase().includes(query.toLowerCase()) ||
        product.name?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.categoria?.toLowerCase().includes(query.toLowerCase()) ||
        product.subcategoria?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(filteredProducts);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // 🔹 Nueva función para limpiar
  const clearSearch = () => {             // limpia la barra de busqueda
    setQuery("");
    setShowSuggestions(false);
  };

     {/*if (isMobile) return null;       */      }     // si es movil no se muestra  ////////////////////////////////////////////////

  const handleSearch = (searchQuery = query) => {             // para buscar
    const finalQuery = searchQuery.trim();
    if (!finalQuery) return;

    const newUrl = `/search?q=${encodeURIComponent(finalQuery)}`;       // para buscar
    if (window.location.pathname + window.location.search !== newUrl) {
      navigate(newUrl);
    }
    clearSearch(); // limpia al buscar
  };

  const handleKeyPress = (e) => {       // para buscar con enter
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (product) => {      // para elegir sugerencia
    handleSearch(product.nombre || product.name);
    clearSearch(); // limpia al elegir sugerencia
  };

  return (
    <div style={{
      ...styles.container,
      backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(15px)" : "none",
      transition: "all 0.3s ease",
      padding: isMobile ? "8px 10px" : "10px 20px",
      gap: isMobile ? "10px" : "25px",
    }}>
      <Link to="/" onClick={clearSearch}>
        <img   
          src="/images/larepercha (1).png" 
          alt="repercha" 
          style={{ 
            width: isMobile ? "6em" : "10em", 
            height: isMobile ? "2.5em" : "4em", 
            zIndex: "1000",
            boxShadow: scrolled ?  "none"  : "0px 4px 8px rgba(1, 1, 1, 5)" , 
            transition: "all 0.3s ease",
            backgroundColor: scrolled ? "none" : "rgba(255, 255, 255, 0.95)"
          }} 
        />
      </Link>

      <div style={{
        ...styles.searchContainer,
        flex: isMobile ? "1 1 50%" : "1 1 40%",
        maxWidth: isMobile ? "none" : "500px",
      }}>
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder={t("🔍 search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
            style={{
              ...styles.input,
              padding: isMobile ? "10px 40px 10px 12px" : "12px 50px 12px 15px",
              fontSize: isMobile ? "14px" : "16px",
            }}
          />
          <button onClick={() => handleSearch()} style={{
            ...styles.searchButton,
            width: isMobile ? "30px" : "35px",
            height: isMobile ? "30px" : "35px",
            right: isMobile ? "3px" : "5px",
          }}>
            <FaSearch />👽
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div style={styles.suggestionsContainer}>
            {suggestions.map((product, index) => (
              <div
                key={product.id || index}
                style={styles.suggestionItem}
                onClick={() => handleSuggestionClick(product)}
              >
                <img 
                  src={`/images/${product.image}`} 
                  alt={product.nombre || product.name}
                  style={styles.suggestionImage}
                  onError={(e) => {e.target.src = "/images/placeholder.jpg"}}
                />
                <div style={styles.suggestionText}>
                  <div style={styles.suggestionName}>{product.nombre || product.name}</div>
                  <div style={styles.suggestionPrice}>{product.price}€</div>
                  <div style={styles.suggestionBrand}>{product.brand}</div>
                </div>
              </div>
            ))}
            <div 
              style={styles.viewAllResults} 
              onClick={() => handleSearch()}
            >
              Ver todos los resultados para "{query}"
            </div>
          </div>
        )}
      </div>

      <div style={{
        ...styles.actionsContainer,
        gap: isMobile ? "10px" : "20px",
      }}>
        <Link to="/cart" style={styles.actionLink} onClick={clearSearch}>
          <img 
            src="/images/bolsa.png" 
            alt="Carrito" 
            style={{ 
              width: isMobile ? "20px" : "25px",
              boxShadow: scrolled ?  "none"  : "0px 0px 9px 5px  white",
              transition: "all 1s ease",
              backgroundColor: scrolled ? "none" : "rgba(255, 255, 255, 0.95)"
            }} 
          />
          <span style={styles.cartCount}>{cart.length},   </span>
        </Link>
        <Link to="/cuenta" style={styles.actionLink} onClick={clearSearch}>
          <img 
            src="/images/logoUser.jpg" 
            alt="user" 
            style={{ 
              width: isMobile ? "20px" : "25px",
              boxShadow: scrolled ?  "none"  : "0px 0px 9px 7px  white",
              transition: "all 1s ease",
              backgroundColor: scrolled ? "none" : "rgba(255, 255, 255, 0.95)"
            }} 
          />
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    zIndex: 1000,
    position: "fixed",
    top: "0px",
    left: "0",
    right: "0",
    width: "100%",
    
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    gap: "25px",
    fontSize: "14px",
    color: "white",
    justifyContent: "space-between",
  },

  searchContainer: {
    position: "relative",
    flex: "1 1 40%",
    maxWidth: "500px",
  },

  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  input: {
    width: "100%",
    padding: "12px 50px 12px 15px",
    border: "1px solid #e0e0e0",
    borderRadius: "25px",
    backgroundColor: "#ffffff",
    color: "#333",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  searchButton: {
    position: "absolute",
    right: "5px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#12e2ef",
    border: "none",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    transition: "all 0.2s ease",
  },

  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    marginTop: "5px",
    zIndex: 1001,
    maxHeight: "300px",
    overflowY: "auto",
  },

  suggestionItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
    transition: "background-color 0.2s ease",
  },

  suggestionImage: {
    width: "40px",
    height: "40px",
    borderRadius: "4px",
    marginRight: "10px",
    objectFit: "cover",
  },

  suggestionText: {
    flex: 1,
  },

  suggestionName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "2px",
  },

  suggestionPrice: {
    fontSize: "12px",
    color: "#666",
  },

  suggestionBrand: {
    fontSize: "11px",
    color: "#999",
    fontStyle: "italic",
  },

  viewAllResults: {
    padding: "12px 15px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    color: "#12e2ef",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "14px",
    borderTop: "1px solid #e0e0e0",
  },

  actionsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  actionLink: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "inherit",
    textDecoration: "none",
  },

  cartCount: {
    backgroundColor: "#12e2ef",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  }
};