import { useState, useEffect } from "react";
import i18n from "../i18n/i18n";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    price: "",
    size: "",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null; // 👈 Oculta el componente en móvil

  const handleSearch = () => {
    onSearch({ query, filter });
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      <select
        value={filter.category}
        onChange={(e) =>
          setFilter({ ...filter, category: e.target.value })
        }
        style={styles.select}
      >
        <option value="">Todas las categorías</option>
        <option value="mujer">Mujer</option>
        <option value="hombre">Hombre</option>
        <option value="nino">Niño</option>
        <option value="nina">Niña</option>
      </select>

      <select
        value={filter.price}
        onChange={(e) =>
          setFilter({ ...filter, price: e.target.value })
        }
        style={styles.select}
      >
        <option value="">Todos los precios</option>
        <option value="0-20">0€ - 20€</option>
        <option value="20-50">20€ - 50€</option>
        <option value="50-100">50€ - 100€</option>
        <option value="100+">Más de 100€</option>
      </select>

      <select
        value={filter.size}
        onChange={(e) =>
          setFilter({ ...filter, size: e.target.value })
        }
        style={styles.select}
      >
        <option value="">Todas las tallas</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <button onClick={handleSearch} style={styles.button}>
        🔍 Buscar
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlingn: "left",
    zIndex: 1000,
    position: "fixed",
    top: "0px",
    left: "0",
    width: "99%",
    backgroundColor: "none",
    border: "1px solid #ddd",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    padding: "5px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px",
    fontSize: "10px",
    color: "white",
  },
  input: {
    padding: "0.5em",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: "1 1 50%",
  },
  select: {
    padding: "0.6em",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#12e2ef",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
