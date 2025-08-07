import { useState } from "react";

export default function Filters({ onFilter }) {
  const [filters, setFilters] = useState({ category: "", price: "", size: "" });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const apply = () => onFilter(filters);

  return (
    <aside style={styles.sidebar}>
      <h2>Filtros</h2>
      <label>
        Categoría
        <select name="category" value={filters.category} onChange={handleChange} style={styles.input}>
          <option value="">Todas</option>
          <option value="mujer">Mujer</option>
          <option value="hombre">Hombre</option>
        </select>
      </label>
      <label>
        Precio
        <select name="price" value={filters.price} onChange={handleChange} style={styles.input}>
          <option value="">Todos</option>
          <option value="0-20">0‑20€</option>
          <option value="20-50">20‑50€</option>
        </select>
      </label>
      <label>
        Talla
        <select name="size" value={filters.size} onChange={handleChange} style={styles.input}>
          <option value="">Todas</option>
          <option value="S">S</option>
          <option value="M">M</option>
        </select>
      </label>
      <button onClick={apply} style={styles.button}>Aplicar</button>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    padding: "20px",
    borderRight: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    minHeight: "calc(100vh - 60px)"
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0"
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    width: "100%"
  }
};
