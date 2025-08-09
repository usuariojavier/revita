import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import BackToTopButton from "./components/BackToTopButton";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Novedades from "./pages/Novedades";
import Envios from "./pages/Envios";
import Devoluciones from "./pages/Devoluciones";
import FAQ from "./pages/FAQ";
import Contacto from "./pages/Contacto";

import { CartProvider } from "./context/CartContext";
import productos from "./data/productos";

import "./i18n/i18n";
import "./index.css";
import "./pages/Home.css";

export default function App() {
  const [filtered, setFiltered] = useState(productos);

  const handleSearch = ({ query, filter }) => {
    let results = productos.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filter.category) {
      results = results.filter(p => p.category === filter.category);
    }
    if (filter.price) {
      const [min, max] = filter.price === "100+" ? [100, Infinity] : filter.price.split("-").map(Number);
      results = results.filter(p => p.price >= min && p.price <= max);
    }
    if (filter.size) {
      results = results.filter(p => p.size === filter.size);
    }

    setFiltered(results);
  };

  return (
    <CartProvider>
      <Router>
        
        <SearchBar onSearch={handleSearch} />
        <BackToTopButton />
          <Header />
        <Routes>
          <Route path="/" element={<Home productos={filtered} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/producto/:id" element={<ProductDetail />} />

          {/* Rutas dinámicas para categorías */}
          <Route path="/:genero" element={<Category />} />
          <Route path="/:genero/:category" element={<Category />} />
          <Route path="/:genero/:category/:subcategoria" element={<Category />} />

          {/* Rutas estáticas del footer */}
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/envios" element={<Envios />} />
          <Route path="/devoluciones" element={<Devoluciones />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contacto" element={<Contacto />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </Router>
    </CartProvider>
  );
}
