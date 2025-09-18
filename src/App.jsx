// src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
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
// import productos from "./data/productos"; // <--- ¡¡YA ELIMINADA/COMENTADA!!
import Marcas from "./pages/Marcas";
import Cuenta from "./pages/Cuenta";

import "./i18n/i18n";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SearchResults from "./components/SearchResults";

import { useTranslation } from "react-i18next";
import CookieBanner from "./components/CookieBanner";

import { useAuth } from "./context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, database } from "./firebaseConfig"; // <--- Importa 'database'

// Realtime Database imports
import { ref, onValue } from "firebase/database"; // <--- Importa ref y onValue

import AdminDashboard from "./pages/AdminDashboard"; // <--- Importa el componente AdminDashboard
import UserStatusHeader from "./components/UserStatusHeader"; // <--- imprta UserStatusHeader de components

import MyOrders from "./pages/MyOrders"; // <--importa MyOrders de pages

import ScrollToTop from "./components/ScrollToTop";

import ChatBot from "./components/ChatBot"; // <--- Importa el componente ChatBot



export default function App() {
  const [allProducts, setAllProducts] = useState([]); // <--- Estado para TODOS los productos de Firebase
  const [filtered, setFiltered] = useState([]);       // <--- Productos filtrados para Home o SearchResults
  const [productsLoading, setProductsLoading] = useState(true); // <--- Estado de carga para los productos

  const { t } = useTranslation();
  const { currentUser, loading: authLoading } = useAuth(); // Renombramos 'loading' a 'authLoading'

  // ***** Define las direcciones de correo electrónico de los administradores *****
  // Asegúrate de usar los correos exactos con los que se registrarán en Firebase Auth
  const adminEmails = ["sesehuesca@gmail.com", "lareperchashop@gmail.com"];

  // Definición de alturas para la posición de los encabezados fijos
  const USER_STATUS_HEADER_HEIGHT = 40; // Estima la altura de UserStatusHeader (ajustar si es necesario)
  const SEARCH_BAR_HEIGHT = 70; // Estima la altura de SearchBar (ajustar si es necesario)
  const TOTAL_HEADER_HEIGHT = USER_STATUS_HEADER_HEIGHT + SEARCH_BAR_HEIGHT;

  // Ruta Protegida (solo requiere que el usuario esté logeado)
  const RutaProtegida = ({ children }) => {
    if (!authLoading && !currentUser) {
      return <Navigate to="/cuenta" replace />;
    }
    return children;
  };

  // ***** NUEVA RUTA PROTEGIDA PARA ADMINISTRADORES *****
  const RutaAdminProtegida = ({ children }) => {
    if (authLoading) {
      // Todavía estamos cargando el estado de autenticación, no hacemos nada
      return null; // O un spinner de carga si prefieres
    }

    if (!currentUser) {
      // No hay usuario logeado, redirige al login
      return <Navigate to="/cuenta" replace />;
    }

    // Verifica si el email del usuario logeado está en la lista de administradores  ///////////////////
    if (!adminEmails.includes(currentUser.email.toLowerCase())) {
      // Si no es un administrador, redirige a algún lugar (ej. home, o una página de acceso denegado)
      return <Navigate to="/" replace />; // Podrías crear una /acceso-denegado
    }

    // Si todo está bien, muestra el contenido
    return children;
  };

  // console.log para depuración, puedes eliminarlo después
  console.log(
    "App - Current User:",
    currentUser ? currentUser.email : "No user",
    "Loading Auth:",
    authLoading
  );

  // ***** useEffect para leer productos de Firebase Realtime Database *****
  useEffect(() => {
    setProductsLoading(true); // Activar carga al inicio
    const productsRef = ref(database, "productos"); // Apunta al nodo 'productos'

    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        const data = snapshot.val();
        const productsArray = [];
        if (data) {
          for (let key in data) {
           // *** ¡¡ESTE ES EL CAMBIO CLAVE Y DEFINITIVO PARA EL ID!! ***
            const productData = data[key];
            // Destructuramos para OMITIR la propiedad 'id' si ya existe en el objeto original
            // Esto asegura que el ID de Firebase (la 'key') sea SIEMPRE el 'id' del producto.
            const { id, ...restOfProductData } = productData;
            productsArray.push({ id: key, ...restOfProductData });
            // *********************************************************************
          }
        }
        setAllProducts(productsArray); // Guarda todos los productos
        setFiltered(productsArray); // Inicializa filtered con todos los productos
        setProductsLoading(false); // Desactivar carga
      },
      (error) => {
        console.error("Error al leer productos de Firebase:", error);
        setProductsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("¡Sesión cerrada con éxito!");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert(
        "No se pudo cerrar la sesión. Revisa la consola para más detalles."
      );
    }
  };

  // Pantalla de carga global mientras se verifica la autenticación O se cargan los productos
  if (authLoading || productsLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "24px",
        }}
      >
        {authLoading ? "Cargando autenticación..." : "Cargando productos..."}
      </div>
    );
  }

  // Modifica handleSearch para que filtre sobre 'allProducts'
  const handleSearch = ({ query, filter }) => {
    let results = allProducts.filter(
      (
        p // <--- Filtra sobre allProducts
      ) =>
        // Asegúrate de que p.name existe y es una cadena
        (p.name ? t(p.name).toLowerCase() : "").includes(query.toLowerCase())
    );

    if (filter.category) {
      results = results.filter((p) => p.category === filter.category);
    }
    if (filter.price) {
      const [min, max] =
        filter.price === "100+"
          ? [100, Infinity]
          : filter.price.split("-").map(Number);
      results = results.filter((p) => p.price >= min && p.price <= max);
    }
    if (filter.size) {
      results = results.filter((p) => p.size === filter.size);
    }

    setFiltered(results);
  };




                                      /*    RETURN    */



  return (
    <CartProvider> 
      <Router>
        <ScrollToTop />  {/* Asegura que la página se desplace hacia arriba en cada navegación */}
        {/* 1. Nuevo componente de estado de usuario, fijo en la parte superior */}
        <UserStatusHeader /> {/* <--- ¡Añadido aquí! */}

        


        {/* 2. SearchBar, ahora desplazado hacia abajo por la altura de UserStatusHeader */}
        {/* 'products' prop ahora pasa allProducts de Firebase a SearchBar */}
        {/* 'topOffset' prop desplaza SearchBar hacia abajo para evitar superposición */}
        <SearchBar onSearch={handleSearch} products={allProducts} topOffset={USER_STATUS_HEADER_HEIGHT} />
        
        <BackToTopButton />
        <Header /> {/* Tu componente Header existente */}


        <ChatBot />


        {/* 3. El contenedor principal del contenido, desplazado hacia abajo por ambos encabezados fijos */}
        {/* El paddingTop evita que el contenido principal se superponga con los encabezados fijos */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: `${TOTAL_HEADER_HEIGHT}px` }}>
          <Routes>
            {/* Rutas públicas */}
            {/* Ahora Home recibe los productos filtrados de Firebase */}
            <Route path="/" element={<Home productos={filtered} />} />
            {/* ProductDetail también necesitará acceso a allProducts para encontrar el producto por ID */}
            <Route
              path="/producto/:id"
              element={<ProductDetail allProducts={allProducts} />}
            />
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/novedades" element={<Novedades />} />
            <Route path="/envios" element={<Envios />} />
            <Route path="/devoluciones" element={<Devoluciones />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* SearchResults también recibirá los productos filtrados de Firebase */}
            <Route
              path="/search"
              element={<SearchResults filteredProducts={filtered} />}
            />
           
            {/* Esa lógica ahora reside completamente dentro de Cuenta.jsx */}
            <Route path="/cuenta" element={<Cuenta />} /> 

            {/* Rutas dinámicas de categorías */}
           
            <Route
              path="/:genero"
              element={<Category allProducts={allProducts} />}
            />
            <Route
              path="/:genero/:category"
              element={<Category allProducts={allProducts} />}
            />
            <Route
              path="/:genero/:category/:subcategoria"
              element={<Category allProducts={allProducts} />}
            />
            {/* Rutas PROTEGIDAS (requieren login) */}
            <Route
              path="/cart"
              element={
                <RutaProtegida>
                  <Cart />
                </RutaProtegida>
              }
            />
            <Route
              path="/checkout"
              element={
                <RutaProtegida>
                  <Checkout />
                </RutaProtegida>
              }
            />
            {/* ***** NUEVA RUTA PROTEGIDA PARA ADMINISTRADORES ***** */}
            <Route
              path="/admin"
              element={
                <RutaAdminProtegida>
                  <AdminDashboard />
                </RutaAdminProtegida>
              }
            />

            {/* ***** NUEVA RUTA PROTEGIDA PARA MIS PEDIDOS ***** */}
        <Route path="/mis-pedidos"element={ <RutaProtegida> <MyOrders /> </RutaProtegida> } />
        

            {/* Ruta por defecto para 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <CookieBanner />
        <Footer />
      </Router>
    </CartProvider>
  );
}
