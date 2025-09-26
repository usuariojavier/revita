// src/components/SearchBar.jsx



import { useState, useEffect, useRef } from "react"; // <-- Importa useRef
import { Search, X } from "lucide-react";  // <-- Importa el icono de lupa y X
// Puedes eliminar FaSearch si no la usas en otros componentes de este archivo
// import { FaSearch } from "react-icons/fa";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";


// SearchBar ahora recibe 'products' como una prop desde App.jsx
export default function SearchBar({ onSearch, products , topOffset = 0 }) { // <--- topOffset con valor por defecto
  const { t } = useTranslation();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();    // Para detectar la ruta actual

  // Estados para la funcionalidad móvil
  const [isMobile, setIsMobile] = useState(false); // Determina si la pantalla es móvil
  const [showSearchInput, setShowSearchInput] = useState(false); // Controla la visibilidad del input en móvil
  const searchInputRef = useRef(null); // Ref para enfocar el input
  const searchContainerRef = useRef(null); // Ref para detectar clics fuera del contenedor de búsqueda

  // Estados existentes para la lógica de búsqueda
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);    // Estado para detectar si se ha hecho scroll
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const isHome = location.pathname === "/";     // Detecta si estás en la página de inicio  === ( home ) "/"
  const iconColor = isHome && !scrolled ? "#fff" : "#12e2ef";
  const cartIconSrc = isHome && !scrolled
    ? "/images/bolsa-blanca.png"
    : "/images/bolsa.png";
  const userIconSrc = isHome && !scrolled
    ? "/images/logoUser-blanco.png"
    : "/images/logoUser.jpg";





  // Efecto para detectar si la pantalla es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Establece el estado inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Efecto para detectar el scroll
  useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Efecto para sugerencias de búsqueda
  useEffect(() => {
    if (query.length > 1 && products && products.length > 0) {
      const filteredProducts = products.filter(product =>
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
  }, [query, products]);

  // Efecto para enfocar el input cuando se muestra en móvil
  useEffect(() => {
    if (showSearchInput && isMobile && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchInput, isMobile]);

  // Efecto para cerrar sugerencias/búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false); // Cierra sugerencias
        if (isMobile && showSearchInput) {
          setShowSearchInput(false); // Colapsa la barra de búsqueda en móvil
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, showSearchInput]);


  const clearSearch = () => {   // Limpia el estado de búsqueda
    setQuery("");
    setShowSuggestions(false);
  };

  const performSearch = (searchQuery = query) => { // Renombrada de handleSearch
    const finalQuery = searchQuery.trim();
    if (!finalQuery) return;

    onSearch({ query: finalQuery, filter: {} }); // Llama a onSearch de App.jsx
    navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
    
    clearSearch(); // Limpia la búsqueda después de navegar
    if (isMobile) {
      setShowSearchInput(false); // Oculta el input después de la búsqueda en móvil
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") performSearch();
  };

  const handleSuggestionClick = (product) => {
    performSearch(product.nombre || product.name);
  };

  /////////////////////  estilos de los contadores del carrito  /////////////////////
  const cartCountStyle = {
    backgroundColor: isHome && !scrolled ? "#fff" : "#12e2ef",
    color: isHome && !scrolled ? "#000" : "#fff",
    padding: "0px 5px",
    borderRadius: "50px",
    fontSize: "10px",
    fontWeight: "bold",
    marginLeft: "-9px",
  };


  

  ////////////////////////Estilos/////////////////////////////////////////
  const styles = {
    container: {
      zIndex: 1000,
      position: "fixed",
      left: 0,
      right: 0,
      width: "100%",
      padding: isMobile ? "10px 10px 10px 25px" : "10px 45px 0px 10px",

      display: "flex",
      alignItems: "center",
      gap: isMobile ? "5px" : "25px", // Ajusta el gap en móvil/escritorio
      fontSize: "14px",
      justifyContent: "space-between",
backgroundColor: isHome
  ? (scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.10)")   // ← fondo oscuro semitransparente cuando estás arriba
  : "rgba(255, 255, 255, 0.95)",
      backdropFilter: scrolled ? "blur(15px)" : "none",
      transition: "all 0.3s ease",
      top: `${topOffset}px`,      // Usa el prop topOffset para ajustar la posición superior de la barra
      
    },


    searchContainer: { //////////////////////// Este es el contenedor que contendrá el input/lupa y las sugerencias   🔍
      position: "relative",
      flex: "1 1 40%", // Controla el tamaño en desktop
      maxWidth: isMobile ? '220px' : '5000px',
      width: isMobile ? '170px' : '100%',
      display: "flex",
      justifyContent: isMobile ? 'flex-end' : 'center', // Alinea a la derecha en móvil
      
      
      alignItems: 'center',
      
      padding: isMobile ? "0px 0px 0px 5px" : "0px 0px 0px 100px",
      margin: isMobile ? "0px 0px 0px 20px" : "0px 20px 0px 0px",
    },


    searchWrapper: { //////////////////////////////// Contenedor del input y botón de búsqueda
      position: "relative",
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
    },


    input: {
       width : isMobile ? "70%" : "100%", // Ocupa todo el ancho disponible en móvil y escritorio  ******************************************
       right: isMobile ? "0" : "center", // Alinea a la derecha en móvil
      
      
      padding: "10px 50px 12px 15px",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      color: "#333",
      
      outline: "none",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      width: "100%", // ya está limitado por el contenedor

      padding: isMobile ? "8px 1px 8px 10px" : "10px 50px 12px 15px",
      fontSize: isMobile ? "14px" : "16px",


    },



    /*searchButton: {              //  BOTON DE BUSQUEDA ( eliminado por ahora )
      position: "absolute",
      right: "10px",
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
      zIndex: 10, //que esté por encima del input
    },*/
    
    suggestionsContainer: {   /////////////////////////// Contenedor de las sugerencias
      position: "absolute",
      top: "calc(100% + 5px)", // Debajo de la barra de búsqueda
      left: "0",
      right: "0",
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
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
      gap: "10px",
      justifyContent: "flex-end",
      minWidth: isMobile ? 'unset' : '150px',
    },
    actionLink: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      textDecoration: "none",
    },



    searchIconMobile: { // Estilo para el icono de lupa en móvil
      padding: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 'auto', // por si acaso
    },
    closeSearchIconMobile: { // Estilo para el icono X en móvil
      padding: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 'auto', // Empuja a la derecha             navigate
    }
  };



  return (
    <div className="search-bar" style={styles.container}>   {/************** * IMAGEN MOVIL LOGO *********************/}
      <Link to="/" onClick={clearSearch}>
        <img
          src={!scrolled && isHome ? "/images/larepercha (1)blanco.png" : "/images/larepercha (1).png"  }   // Cambia la ruta de la imagen depende del scroll

          alt="repercha"
          style={{
            width: isMobile ? "7em" : "10em",
            height: isMobile ? "3em" : "4em",
            
            marginLeft : isMobile ? "30px" : "15px",  /**********************************************************/



            zIndex: "1000",
          }}
        />
      </Link>

      {/* Contenedor principal de la lógica de búsqueda/sugerencias */}
      <div ref={searchContainerRef} style={{ display: 'flex', alignItems: 'center', flex: isMobile ? '0 0 auto' : '1' }}>
        {isMobile ? ( // Lógica para móvil
          <>
           {!showSearchInput ? (
  <div style={{
    position: 'absolute',
    right: '85px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1001,
  }}>
    <div
      style={{
        padding: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => setShowSearchInput(true)}
    >
      <Search size={25} color={iconColor} />
    </div>
  </div>

 


            ) : ( // Mostrar el input de búsqueda si está expandido
              <div style={styles.searchContainer}> {/* Usa searchContainer para el input   ⬆ */}
                <div style={styles.searchWrapper}>
                  <input  
                    ref={searchInputRef}
                    type="text"
                    placeholder={t("search")}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => query.length > 1 && setShowSuggestions(true)}
                    onBlur={() => { /* Manejar onBlur cuidadosamente para no cerrar sugerencias al hacer clic */ }}
                    style={styles.input}        //  Usa styles  de arriba para el input  , en styles ⬆ ⬆⬆⬆⬆⬆⬆⬆⬆          ⬆⬆⬆⬆⬆⬆   ⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆
                  />
                  {/*} <button onClick={() => performSearch()} style={styles.searchButton}>  navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
                    <Search size={20} />
                  </button>  */}
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div style={styles.suggestionsContainer}>


                    {suggestions.map((product, index) => (
  <div
    key={product.id || index}
    style={styles.suggestionItem}
    onClick={() => {
      navigate(`/producto/${product.id}`);    // Cambiado a /producto/ para que funcione con rutas en español

      clearSearch();
    }}
  >
    <img
      src={product.images?.[0] || "/images/placeholder.jpg"}
      alt={product.nombre || product.name}
      style={styles.suggestionImage}
      onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
    />
    <div style={styles.suggestionText}>
      <div style={styles.suggestionName}>{product.nombre || product.name}</div>
      <div style={styles.suggestionPrice}>{product.price}€</div>
      <div style={styles.suggestionBrand}>{product.brand}</div>
    </div>
  </div>
))}


                    
                    <div style={styles.viewAllResults} onClick={() => performSearch()}>
                      Ver todos los resultados para "{query}"
                    </div>
                  </div>
                )}
                <div style={styles.closeSearchIconMobile} onClick={() => setShowSearchInput(false)}>
                  <X size={25} color={iconColor} />
                </div>
              </div>
            )}


          </>
        ) : ( // Lógica para escritorio (siempre visible)
          <div style={styles.searchContainer}>
            <div style={styles.searchWrapper}>
              <input
                type="text"
                placeholder={t("search")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") performSearch();
                  }}
                onFocus={() => query.length > 1 && setShowSuggestions(true)}
                onBlur={() => { /* Esto se maneja con handleClickOutside */ }}
                style={styles.input}
                
              />
              {/*<button onClick={() => performSearch()} style={styles.searchButton}>   navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
                <Search size={10} />
              </button>  */}

            </div>
            {showSuggestions && suggestions.length > 0 && (  // SUGERENCIAS   
              <div style={styles.suggestionsContainer}>
                {suggestions.map((product, index) => (
                  <div
                    key={product.id || index}
                    style={styles.suggestionItem}
                    onClick={() => {
                        navigate(`/producto/${product.id}`);
                        clearSearch();
                          }}

                  >
                    <img
                      src={product.images?.[0] || "/images/placeholder.jpg"}

                      alt={product.nombre || product.name}
                      style={styles.suggestionImage}
                      onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
                    />
                    <div style={styles.suggestionText}>
                      <div style={styles.suggestionName}>{product.nombre || product.name}</div>
                      <div style={styles.suggestionPrice}>{product.price}€</div>
                      <div style={styles.suggestionBrand}>{product.brand}</div>
                    </div>
                  </div>
                ))}
                <div style={styles.viewAllResults} onClick={() => performSearch()}>
                  Ver todos los resultados para "{query}"
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/*----------CONTAINER CESTA Y USER ---------  */}
      <div style={styles.actionsContainer}>
        <Link to="/cart" style={{ ...styles.actionLink, color: iconColor }} onClick={clearSearch}>
          <img
            src={cartIconSrc}
            alt="Carrito"
            style={{
              width: isMobile ? "25px" : "25px",
            }}
          />
          <span style={cartCountStyle}>{cart.length}</span>
        </Link>
        <Link to="/cuenta" style={{ ...styles.actionLink, color: iconColor }} onClick={clearSearch}>
          <img
            src={userIconSrc}
            alt="user"
            style={{
              width: isMobile ? "25px" : "25px",
            }}
          />
        </Link>
      </div>
    </div>
  );
}
