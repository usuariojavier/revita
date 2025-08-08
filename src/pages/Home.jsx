import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard"; 
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import i18n from "../i18n/i18n";
import Banner from "../components/Banner";




export default function Home() {  //
  const [products] = useState([                  // LISTA DE PRODUCTOS
    { id: 1, name: "Camiseta Mujer", price: 19.99, image:"Camiseta-mujer.jpg" , category: "mujer", size: "M" },
    { id: 2, name: "Zapatillas Hombre", price: 49.99, image:"Zapatillas-hombre.jpeg" , category: "hombre", size: "L" },
    { id: 3, name: "Chaqueta Niño", price: 39.00,  image:"Chaqueta-nen.webp"  ,category: "nino", size: "S" },
    { id: 4, name: "Zapatillas niño", price: 29.99, image:"zapatillas-nen.jpg" , category: "nino", size: "s" },
    { id: 5, name: "Zapatillas Mujer", price: 59.99, image:"zapatillas-mujer.jpeg" , category: "mujer", size: "M" },
    { id: 6, name: "Camisa Hombre", price: 24.99, image:"camisa-hombre.jpeg" , category: "hombre", size: "S" },
    { id: 7, name: "Vestido Niña", price: 34.99, image:"vestido-nena.jpg" , category: "nina", size: "s" },
    { id: 8, name: "Pantalones Mujer", price: 39.99, image:"pantalones-mujer.jpeg" , category: "mujer", size: "L" },
    { id: 9, name: "Sudadera Hombre", price: 44.99, image:"sudadera-hombre.jpeg" , category: "hombre", size: "XL" },
    { id: 10, name: "Botas Niño", price: 49.99, image:"botas-nen.jpeg" , category: "nino", size: "L" },
    { id: 11, name: "Chaqueta Niña", price: 39.99, image:"chaqueta-nena.jpeg" , category: "nina", size: "M" },
    { id: 12, name: "Zapatillas Mariquita", price: 29.99, image:"zapatillas-mariquita.jpeg" , category: "mariquita", size: "S" }
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




    const filterProducts = (f) => {
    let res = products;
    if (f.category) res = res.filter(p => p.category === f.category);
    if (f.price) {
      const [min,max] = f.price.split("-").map(Number);
      res = res.filter(p => p.price >= min && p.price <= max);
    }
    if (f.size) res = res.filter(p => p.size === f.size);
    setDisplayed(res);
  };



return (


    <div>

      <Banner />
    
        <h1>REVITA</h1>
                            {/*<SearchBar onSearch={handleSearch} /> */}{ /* Componente de búsqueda repetido */}

        <div style={{ display: "flex" }}>
            <Filters onFilter={filterProducts} />   
            
    <div style={{ flex: 1, padding: "20px" }}>  aqui productos
        {/* Aquí  cards */}
    </div>


    </div> 
       

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
            ))}
        </div>

        <Footer />
    </div>



);
}


