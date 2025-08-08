import { useState } from "react";
import i18n from "../i18n/i18n";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    price: "",
    size: ""
  });

  const handleSearch = () => {
    onSearch({ query, filter });
  };

  return (
    <div style={styles.container}>
      {/* Campo de búsqueda */}

        <img src="/public/images/logo.png"alt="imagen"lassName="logo" style={{ width: "50px", height: "50px" }} ></img>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      {/* Filtro por categoría */}
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

      {/* Filtro por precio */}
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

      {/* Filtro por talla */}
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

      {/* Botón de búsqueda */}
      <button onClick={handleSearch} style={styles.button}>
        🔍 Buscar
      </button>
    </div>
  );
}



/*ESTILOS BARRA*/


const styles = {
  container: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "2px",
    flexWrap: "wrap"
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: "1 1 200px"
  },
  select: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

