
// src/components/Header.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import i18n from "../i18n/i18n";
import { AlignLeft, Space } from "lucide-react";
import { useCart } from "../context/CartContext";
import HamburgerMenu from "./HamburgerMenu";
import { Menu, X} from "lucide-react"; 

import { useLocation } from "react-router-dom";





export default function Header() {
  const { t } = useTranslation();

  // useStates PARA MENU MUJER
  const [showWomenMenu, setShowWomenMenu] = useState(false);
  const [showClothingMenu, setShowClothingMenu] = useState(false);
  const [showShoesMenu, setShowShoesMenu] = useState(false);
  const [showAccessoriesMenu, setShowAccessoriesMenu] = useState(false);

  // useStates PARA MENU NIÑA
  const [showGirlMenu, setShowGirlMenu] = useState(false);
  const [showGirlClothingMenu, setShowGirlClothingMenu] = useState(false);
  const [showGirlShoesMenu, setShowGirlShoesMenu] = useState(false);
  const [showGirlAccessoriesMenu, setShowGirlAccessoriesMenu] = useState(false);

  // useStates PARA MENU NIÑO
  const [showBoyMenu, setShowBoyMenu] = useState(false);
  const [showBoyClothingMenu, setShowBoyClothingMenu] = useState(false);
  const [showBoyShoesMenu, setShowBoyShoesMenu] = useState(false);
  const [showBoyAccessoriesMenu, setShowBoyAccessoriesMenu] = useState(false);

  //usestates para menu HOMBRE
  const [showMenMenu, setShowMenMenu] = useState(false);
  const [showMenClothingMenu, setShowMenClothingMenu] = useState(false);
  const [showMenShoesMenu, setShowMenShoesMenu] = useState(false);
  const [showMenAccessoriesMenu, setShowMenAccessoriesMenu] = useState(false);

  const { cart } = useCart();

  // constantes para saber si esta en movil o no
  const [scrolled, setScrolled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /// useStates para saber si esta en la pagina de inicio o no  ////
  const isHome = location.pathname === "/";
  const linkColor = isHome && !scrolled ? "#fff" : "#191919ff";

  //   ////
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };      

  if (menuOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [menuOpen]);


  ////////    ESTILOS MEJORADOS   //////////

  const styles = {
    header: {
      position: "fixed",
      top: isMobile ? "0px" : "85px",
      left: 0,
      right: 0,
      zIndex: 10,
      padding: "0px 30px",
      borderBottom: "0px",
      

    },

    dropdown: {                     /*  ESTILOS DEL MENU DESPLEGABLE  */
      position: "absolute",
      top: "100%",
      left: "-10px",
      width: "900px",
      maxWidth: "90vw",
      backgroundColor: "#ffffff",
      border: "none",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      borderRadius: "8px",
      padding: "25px",
      zIndex: 1100,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px",
      marginTop: "10px",
    },

    categorySection: {
      borderRight: "1px solid #f0f0f0",
      paddingRight: "25px",
      "&:last-child": {
        borderRight: "none",
      },
    },

    categoryTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#000000ff",
      marginBottom: "15px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      borderBottom: "2px solid #e0e0e0",
      paddingBottom: "8px",
    },

    //     ESTILOS DE CATEGORIAS

    categoryLinks: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    categoryLink: {
      color: "#000000ff",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "700",
      padding: "6px 0",
      transition: "all 0.2s ease",
      borderRadius: "4px",
    },

    //////////////////////////////////////  NAVBAR ///////////////////////////////////////
    mainNavLink: {
      textDecoration: "none",
      fontSize: "20px",
      /* The above code is setting the `fontWeight` style property to "800" in a React component. */
      fontWeight:600,
      padding: "10px 15px",
      borderRadius: "6px",

      position: "relative",
    },

    languageButtons: {
      display: "flex",
      gap: "5px",
    },

    langButton: {
      padding: "6px 12px",
      border: "1px solid #ddd",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },

    ////////////////////////////   MOVIL MENU  ///////////////////////////////////
    mobileMenu: {
      position: "  fixed",
      top: "70px",
      left: 0,
      right: 0,
      backgroundColor: "#ffffff",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      zIndex: 9999,
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      borderRadius: "0 0 12px 12px",
    },

    mobileLink: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#191919",
      textDecoration: "none",
      padding: "10px 15px",
      borderRadius: "6px",
      backgroundColor: "#f5f5f5ff",
      transition: "background-color 0.3s ease",
    },
  };

  const CategorySection = ({ title, links }) => (
    <div style={styles.categorySection}>
      <div style={styles.categoryTitle}>{title}</div>
      <div style={styles.categoryLinks}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            style={styles.categoryLink}
            onMouseEnter={(e) => {
              e.target.style.color = "#12e2ef";
              e.target.style.paddingLeft = "8px";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#666";
              e.target.style.paddingLeft = "0";
            }}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
  ///////////////////////////////////////////////////////////     RETURN ///////////////////////////////////

  return (
    <div>

      {/*------------------------------------MENU HABURGUESA --------------*/}
        {isMobile && (
          <HamburgerMenu
            onToggle={() => setMenuOpen((prev) => !prev)}
            isOpen={menuOpen}
            icon={
              menuOpen ? (
                <X size={28} color="#12e2ef" />
              ) : (
                <Menu size={28} color="#12e2ef" />
              )
            }
            style={{ zIndex: 9999 }}
          />
        )}




      <header
        style={{
          ...styles.header,
         backgroundColor: isHome
  ? (scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.10)")
  : "rgba(255, 255, 255, 0.95)",
      backdropFilter: scrolled ? "blur(15px)" : "none",
      transition: "all 0.3s ease",
        }}
      >
        

        {/*  ------------------------------------------------MENU MOBIL -----------*/}
       {isMobile && menuOpen && (
  <div ref={mobileMenuRef} style={styles.mobileMenu}>
    <Link to="/mujer" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
      {t("women")}
    </Link>
    <Link to="/hombre" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
      {t("men")}
    </Link>
    <Link to="/nina" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
      {t("girl")}
    </Link>
    <Link to="/nino" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
      {t("boy")}
    </Link>
    <Link to="/marcas" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
      {t("brands")}
    </Link>
  </div>
)}



{!isMobile && (                   // MENU ESCRITORIO                    //////////////////////////
        <nav
          style={{
            display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: "40px",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>

            
           {/* <Link to="/">
              <img src="/images/home.png" alt="home" width="28px" />   // ICONO DE HOME eliminado
            </Link>
            */}

            {/* MUJER */}
            <div
              onMouseEnter={() => setShowWomenMenu(true)}
              onMouseLeave={() => setShowWomenMenu(false)}
              style={{ position: "relative" }}
            >
              <Link
                to="/mujer"
                style={{
                  ...styles.mainNavLink,
                  color: linkColor,
                }}
              >
                {t("women")}
              </Link>

              {!isMobile && showWomenMenu && (
                <div style={styles.dropdown}>
                  <CategorySection
                    title={t("clothing")}
                    links={[
                      { to: "/mujer/ropa/pantalones", text: t("pants") },
                      { to: "/mujer/ropa/shorts", text: "Shorts" },
                      { to: "/mujer/ropa/top", text: "Tops" },
                      { to: "/mujer/ropa/camisetas", text: t("tshirt") },
                      { to: "/mujer/ropa/vestidos", text: t("dress") },
                      { to: "/mujer/ropa/faldas", text: t("skirt") },
                      { to: "/mujer/ropa/mallas", text: t("leggings") },
                      { to: "/mujer/ropa/abrigos", text: t("jackets") },
                      { to: "/mujer/ropa/sudaderas", text: t("sweatshirts") },
                    ]}
                  />
                  <CategorySection
                    title={t("footwear")}
                    links={[
                      { to: "/mujer/calzado/zapatillas", text: t("sneakers") },
                      { to: "/mujer/calzado/zapatos", text: t("shoes") },
                      { to: "/mujer/calzado/botas", text: t("boots") },
                      { to: "/mujer/calzado/botines", text: "Botines" },
                      { to: "/mujer/calzado/chanclas", text: t("sandals") },
                      { to: "/mujer/calzado/casa", text: t("house_sleepers") },
                    ]}
                  />
                  <CategorySection
                    title={t("accessories")}
                    links={[
                      { to: "/mujer/complementos/bolsos", text: t("pockets") },
                      {
                        to: "/mujer/complementos/mochilas",
                        text: t("backpack"),
                      },
                      { to: "/mujer/complementos/carteras", text: "Carteras" },
                      {
                        to: "/mujer/complementos/gafas-sol",
                        text: t("sunglasess"),
                      },
                      {
                        to: "/mujer/complementos/cinturones",
                        text: t("belts"),
                      },
                      { to: "/mujer/complementos/gorras", text: t("cups") },
                    ]}
                  />
                </div>
              )}
            </div>

            {/* HOMBRE */}
            <div
              onMouseEnter={() => setShowMenMenu(true)}
              onMouseLeave={() => setShowMenMenu(false)}
              style={{ position: "relative" }}
            >
              <Link
                to="/hombre"
                style={{
                  ...styles.mainNavLink,
                  color: linkColor,
                }}
              >
                {t("men")}
              </Link>

              {!isMobile && showMenMenu && (
                <div style={styles.dropdown}>
                  <CategorySection
                    title={t("clothing")}
                    links={[
                      { to: "/hombre/ropa/pantalones", text: t("pants") },
                      { to: "/hombre/ropa/bermudas", text: "Bermudas" },
                      { to: "/hombre/ropa/camisetas", text: t("tshirt") },
                      { to: "/hombre/ropa/camisas", text: t("shirt") },
                      { to: "/hombre/ropa/sudaderas", text: t("sweatshirts") },
                      { to: "/hombre/ropa/chaquetas", text: t("jackets") },
                      { to: "/hombre/ropa/abrigos", text: t("coats") },
                    ]}
                  />
                  <CategorySection
                    title={t("footwear")}
                    links={[
                      { to: "/hombre/calzado/zapatillas", text: t("sneakers") },
                      { to: "/hombre/calzado/zapatos", text: t("shoes") },
                      { to: "/hombre/calzado/botas", text: t("boots") },
                      { to: "/hombre/calzado/chanclas", text: t("sandals") },
                      { to: "/hombre/calzado/casa", text: t("house_sleepers") },
                    ]}
                  />
                  <CategorySection
                    title={t("accessories")}
                    links={[
                      { to: "/hombre/complementos/bolsos", text: t("pockets") },
                      {
                        to: "/hombre/complementos/mochilas",
                        text: t("backpack"),
                      },
                      {
                        to: "/hombre/complementos/gafas-sol",
                        text: t("sunglasess"),
                      },
                      {
                        to: "/hombre/complementos/cinturones",
                        text: t("belts"),
                      },
                      { to: "/hombre/complementos/gorras", text: t("cups") },
                    ]}
                  />
                </div>
              )}
            </div>

            {/* NIÑO */}
            <div
              onMouseEnter={() => setShowBoyMenu(true)}
              onMouseLeave={() => setShowBoyMenu(false)}
              style={{ position: "relative" }}
            >
              <Link
                to="/niño"
                style={{
                  ...styles.mainNavLink,
                  color: linkColor,
                }}
              >
                {t("boy")}
              </Link>

              {!isMobile && showBoyMenu && (
                <div style={styles.dropdown}>
                  <CategorySection
                    title={t("clothing")}
                    links={[
                      { to: "/nino/ropa/pantalones", text: t("pants") },
                      { to: "/nino/ropa/bermudas", text: "Bermudas" },
                      { to: "/nino/ropa/camisetas", text: t("tshirt") },
                      { to: "/nino/ropa/sudaderas", text: t("sweatshirts") },
                      { to: "/nino/ropa/chaquetas", text: t("jackets") },
                    ]}
                  />
                  <CategorySection
                    title={t("footwear")}
                    links={[
                      { to: "/nino/calzado/zapatillas", text: t("sneakers") },
                      { to: "/nino/calzado/zapatos", text: t("shoes") },
                      { to: "/nino/calzado/botas", text: t("boots") },
                    ]}
                  />
                  <CategorySection
                    title={t("accessories")}
                    links={[
                      {
                        to: "/nino/complementos/mochilas",
                        text: t("backpack"),
                      },
                      { to: "/nino/complementos/gorras", text: t("cups") },
                    ]}
                  />
                </div>
              )}
            </div>

            {/* NIÑA */}
            <div
              onMouseEnter={() => setShowGirlMenu(true)}
              onMouseLeave={() => setShowGirlMenu(false)}
              style={{ position: "relative" }}
            >
              <Link
                to="/niña"
                style={{
                  ...styles.mainNavLink,
                  color: linkColor,
                }}
              >
                {t("girl")}
              </Link>

              {!isMobile && showGirlMenu && (
                <div style={styles.dropdown}>
                  <CategorySection
                    title={t("clothing")}
                    links={[
                      { to: "/nina/ropa/pantalones", text: t("pants") },
                      { to: "/nina/ropa/shorts", text: "Shorts" },
                      { to: "/nina/ropa/camisetas", text: t("tshirt") },
                      { to: "/nina/ropa/vestidos", text: t("dress") },
                      { to: "/nina/ropa/faldas", text: t("skirt") },
                    ]}
                  />
                  <CategorySection
                    title={t("footwear")}
                    links={[
                      { to: "/nina/calzado/zapatillas", text: t("sneakers") },
                      { to: "/nina/calzado/zapatos", text: t("shoes") },
                      { to: "/nina/calzado/botas", text: t("boots") },
                    ]}
                  />
                  <CategorySection
                    title={t("accessories")}
                    links={[
                      { to: "/nina/complementos/bolsos", text: t("pockets") },
                      {
                        to: "/nina/complementos/mochilas",
                        text: t("backpack"),
                      },
                      { to: "/nina/complementos/gorras", text: t("cups") },
                    ]}
                  />
                </div>
              )}
            </div>

            <Link
              to="/marcas"
              style={{
                ...styles.mainNavLink,
                color: linkColor,
              }}
            >
              {t("brands")}
            </Link>
          </div>

          {/* BOTONES DE IDIOMA */}
          <div style={styles.languageButtons}>
            <button
              onClick={() => i18n.changeLanguage("ca")}
              style={{
                ...styles.langButton,
                background: "linear-gradient(45deg, #ff0000, #fff701ff)",
                color: "white",
                border: "none",
              }}
            >
              CAT
            </button>
            <button
              onClick={() => i18n.changeLanguage("es")}
              style={{
                ...styles.langButton,
                background: "linear-gradient(45deg, #ff0000, #fff701ff)",
                color: "white",
                border: "none",
              }}
            >
              ES
            </button>
          </div>
        </nav>
)}




      </header>
    </div>
  );
}