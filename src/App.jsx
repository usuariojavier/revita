
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import "./i18n/i18n";
import SearchBar from "./components/SearchBar";
import "./index.css"; // Ensure styles are imported
import "./pages/Home.css"; // Import Home specific styles
import BackToTopButton from "./components/BackToTopButton";
import Banner from "./components/Banner";







export default function App() {
  return (
     <CartProvider>
      <Router>
                                  { /*  <SearchBar />   */}
        <Header />
       
        
        <BackToTopButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
   
        </Routes>
      </Router>  
    </CartProvider>
    
  
  );
}

