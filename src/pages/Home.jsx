import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard"; // Si no lo tienes aún, podemos crearlo
import Filters from "../components/Filters";


export default function Home() {  //
  const [products] = useState([                  // LISTA DE PRODUCTOS
    { id: 1, name: "Camiseta Mujer", price: 19.99, image:"Camiseta-mujer.jpg" , category: "mujer", size: "M" },
    { id: 2, name: "Zapatillas Hombre", price: 49.99, image:"Zapatillas-hombre.jpeg" , category: "hombre", size: "L" },
    { id: 3, name: "Chaqueta Niño", price: 39.00,  image:"Chaqueta-nen.webp"  ,category: "nino", size: "S" },
  ]);


      const [displayed, setDisplayed] = useState(products);  // Estado para los productos mostrados

    // Estado para los productos filtrados
  const [filtered, setFiltered] = useState(products);


  

  const handleSearch = ({ query, filter }) => {
    let results = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filter.category) {
      results = results.filter(p => p.category === filter.category);
    }
    if (filter.price) {
      const [min, max] = filter.price.includes("+")
        ? [parseFloat(filter.price), Infinity]
        : filter.price.split("-").map(Number);
      results = results.filter(p => p.price >= min && p.price <= max);
    }
    if (filter.size) {
      results = results.filter(p => p.size === filter.size);
    }

    setFiltered(results);
  };

  return (
    <div>
      <>  </>
      <h1>Bienvenido a REVITA</h1>

      <SearchBar onSearch={handleSearch} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}


