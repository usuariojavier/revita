import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext"; // 👈 para acceder al carrito
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const { t } = useTranslation();
  const { cart } = useCart(); // 👈 accede al estado del carrito
  

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    price: "",
    size: "",
  });

  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  if (isMobile) return null;

  const handleSearch = () => {
    onSearch({ query, filter });
  };

  return (


    
    <div   style={{
        ...styles.container,
        
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0)" : "transparent", // ✅ usa scrolled
        backdropFilter: scrolled ? "blur(10px)" : "none", // ✅ usa scrolled
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
      }}                  >
      

      {/* Logo y barra de búsqueda */}

      <Link to="/">
                  <img src="/images/larepercha.png" alt="Buscar" style={{ width: "10em", height: "4em" , zIndex: "1000"}} />
                </Link>
      

      <input
        type="text"
        placeholder={t("🔍 search")}
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          onSearch({ query: value, filter });
        }}
        style={styles.input}
      />

      

        {/* Enlaces de carrito y cuenta */}
      <Link to="/cart">
        <img src="/images/carrito.png" alt="Carrito" style={{ width: "25px" }} />
        {cart.length}
      </Link>

      <Link to="/cuenta" className="header-action">
        <span className="action-icon">
          <img src="/images/logoUser.jpg" alt="user" width={"25px"} />
        </span>
        <span className="action-text"></span>
      </Link>


    </div>
  );
}

const styles = {
  container: {
    textAlingn: "center",
    zIndex: 1000,
    position: "fixed",
    top: "0px",
    left: "4em",
    rigth: "4em",
    width: "88%",
 
   
    boxShadow: "0 4px 8px #12e2ef(0,0,0,1)",
    padding: "5px",
    borderRadius: "5px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "45px",
    fontSize: "14px",
    color: "white",
    



  },
  input: {
    padding: "0.5em",
    border: "none",
    borderRadius: "4px",
    flex: "1 1 10%",
    backgroundColor: "#f3f4f6",
    color: "black",
    fontSize: "20px",
  },
};
