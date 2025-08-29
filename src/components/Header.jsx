import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import i18n from "../i18n/i18n";
import { AlignLeft, Space } from "lucide-react";
import { useCart } from "../context/CartContext";
import HamburgerMenu from "./HamburgerMenu";
import { Menu, X} from "lucide-react"; 

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

  ////////    ESTILOS MEJORADOS   //////////

  const styles = {
    header: {
      position: "fixed",
      top: 64,
      left: 0,
      right: 0,
      zIndex: 10,
      padding: "15px 30px",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
    },

    dropdown: {
      position: "absolute",
      top: "100%",
      left: "-20px",
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
      fontWeight: "600",
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
      padding: "6px 0",
      transition: "all 0.2s ease",
      borderRadius: "4px",
      "&:hover": {
        color: "#12e2ef",
        paddingLeft: "10px",
      },
    },

    //////////////////////////////////////  NAVBAR ///////////////////////////////////////
    mainNavLink: {
      textShadow: "1px 1px 1px rgba(1, 1, 1, 1), 1px 1px 5px rgba(1, 1, 1, 0.5)",
      color: scrolled ? "#191919ff" : "#fff",
      textDecoration: "none",
      fontSize: "19px",
      fontWeight: "500",
      padding: "10px 15px",
      borderRadius: "6px",
      transition: "all 0.8s ease",
      position: "relative",
      "&:hover": {
        color: "#12e2ef",
      },
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
      "&:hover": {
        transform: "translateY(-1px)",
      },
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

  return (
    <div>
      <header style={{
        ...styles.header,
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(15px)" : "none",
        transition: "all 0.3s ease",
        padding: isMobile ? "10px 15px" : "15px 30px",
      }}>
        
        {/* MENU HAMBURGUESA */}
        {isMobile && (
          <HamburgerMenu
            onToggle={() => setMenuOpen((prev) => !prev)}
            isOpen={menuOpen}
            icon={menuOpen ? <X size={24} color="#12e2ef" /> : <Menu size={24} color="#12e2ef" />}
          />
        )}

        <nav style={{
          display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? "20px" : "40px",
          justifyContent: "space-between",
          position: isMobile ? "absolute" : "static",
          top: isMobile ? "100%" : "auto",
          left: isMobile ? "0" : "auto",
          right: isMobile ? "0" : "auto",
          backgroundColor: isMobile ? "rgba(255, 255, 255, 0.98)" : "transparent",
          padding: isMobile ? "20px" : "0",
          borderRadius: isMobile ? "0 0 8px 8px" : "0",
          boxShadow: isMobile ? "0 4px 15px rgba(0,0,0,0.1)" : "none",
          zIndex: isMobile ? 999 : "auto",
        }}>
          
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: isMobile ? "20px" : "40px",
            flexDirection: isMobile ? "column" : "row",
            width: isMobile ? "100%" : "auto",
          }}>
            {!isMobile && (
              <Link to="/">
                <img src="/images/home.png" alt="home" width="28px" />
              </Link>
            )}

            {/* MUJER */}
            <div
              onMouseEnter={() => !isMobile && setShowWomenMenu(true)}
              onMouseLeave={() => !isMobile && setShowWomenMenu(false)}
              style={{ position: "relative", width: isMobile ? "100%" : "auto" }}
            >
              <Link 
                to="/mujer" 
                style={{
                  ...styles.mainNavLink,
                  textAlign: isMobile ? "center" : "left",
                  display: isMobile ? "block" : "inline",
                  width: isMobile ? "100%" : "auto",
                  padding: isMobile ? "12px 20px" : "10px 15px",
                }}
                onClick={() => isMobile && setMenuOpen(false)}
              >
                {t("women")}
              </Link>
              {showWomenMenu && !isMobile && (
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
                      { to: "/mujer/ropa/sudaderas", text: t("sweatshirts") }
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
                      { to: "/mujer/calzado/casa", text: t("house_sleepers") }
                    ]}
                  />
                  <CategorySection 
                    title={t("accessories")}
                    links={[
                      { to: "/mujer/complementos/bolsos", text: t("pockets") },
                      { to: "/mujer/complementos/mochilas", text: t("backpack") },
                      { to: "/mujer/complementos/carteras", text: "Carteras" },
                      { to: "/mujer/complementos/gafas-sol", text: t("sunglasess") },
                      { to: "/mujer/complementos/cinturones", text: t("belts") },
                      { to: "/mujer/complementos/gorras", text: t("cups") }
                    ]}
                  />
                </div>
              )}
            </div>

            {/* HOMBRE */}
            <div
              onMouseEnter={() => !isMobile && setShowMenMenu(true)}
              onMouseLeave={() => !isMobile && setShowMenMenu(false)}
              style={{ position: "relative", width: isMobile ? "100%" : "auto" }}
            >
              <Link 
                to="/hombre" 
                style={{
                  ...styles.mainNavLink,
                  textAlign: isMobile ? "center" : "left",
                  display: isMobile ? "block" : "inline",
                  width: isMobile ? "100%" : "auto",
                  padding: isMobile ? "12px 20px" : "10px 15px",
                }}
                onClick={() => isMobile && setMenuOpen(false)}
              >
                {t("men")}
              </Link>
              {showMenMenu && !isMobile && (
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
                      { to: "/hombre/ropa/abrigos", text: t("coats") }
                    ]}
                  />
                  <CategorySection 
                    title={t("footwear")}
                    links={[
                      { to: "/hombre/calzado/zapatillas", text: t("sneakers") },
                      { to: "/hombre/calzado/zapatos", text: t("shoes") },
                      { to: "/hombre/calzado/botas", text: t("boots") },
                      { to: "/hombre/calzado/chanclas", text: t("sandals") },
                      { to: "/hombre/calzado/casa", text: t("house_sleepers") }
                    ]}
                  />
                  <CategorySection 
                    title={t("accessories")}
                    links={[
                      { to: "/hombre/complementos/bolsos", text: t("pockets") },
                      { to: "/hombre/complementos/mochilas", text: t("backpack") },
                      { to: "/hombre/complementos/gafas-sol", text: t("sunglasess") },
                      { to: "/hombre/complementos/cinturones", text: t("belts") },
                      { to: "/hombre/complementos/gorras", text: t("cups") }
                    ]}
                  />
                </div>
              )}
            </div>

            {/* NIÑO */}
            <div
              onMouseEnter={() => !isMobile && setShowBoyMenu(true)}
              onMouseLeave={() => !isMobile && setShowBoyMenu(false)}
              style={{ position: "relative", width: isMobile ? "100%" : "auto" }}
            >
              <Link 
                to="/nino" 
                style={{
                  ...styles.mainNavLink,
                  textAlign: isMobile ? "center" : "left",
                  display: isMobile ? "block" : "inline",
                  width: isMobile ? "100%" : "auto",
                  padding: isMobile ? "12px 20px" : "10px 15px",
                }}
                onClick={() => isMobile && setMenuOpen(false)}
              >
                {t("boy")}
              </Link>
              {showBoyMenu && !isMobile && (
                <div style={styles.dropdown}>
                  <CategorySection 
                    title={t("clothing")}
                    links={[
                      { to: "/nino/ropa/pantalones", text: t("pants") },
                      { to: "/nino/ropa/bermudas", text: "Bermudas" },
                      { to: "/nino/ropa/camisetas", text: t("tshirt") },
                      { to: "/nino/ropa/sudaderas", text: t("sweatshirts") },
                      { to: "/nino/ropa/chaquetas", text: t("jackets") }
                    ]}
                  />
                  <CategorySection 
                    title={t("footwear")}
                    links={[
                      { to: "/nino/calzado/zapatillas", text: t("sneakers") },
                      { to: "/nino/calzado/zapatos", text: t("shoes") },
                      { to: "/nino/calzado/botas", text: t("boots") }
                    ]}
                  />
                  <CategorySection 
                    title={t("accessories")}
                    links={[
                      { to: "/nino/complementos/mochilas", text: t("backpack") },
                      { to: "/nino/complementos/gorras", text: t("cups") }
                    ]}
                  />
                </div>
              )}
            </div>

            {/* NIÑA */}
            <div
              onMouseEnter={() => !isMobile && setShowGirlMenu(true)}
              onMouseLeave={() => !isMobile && setShowGirlMenu(false)}
              style={{ position: "relative", width: isMobile ? "100%" : "auto" }}
            >
              <Link 
                to="/nina" 
                style={{
                  ...styles.mainNavLink,
                  textAlign: isMobile ? "center" : "left",
                  display: isMobile ? "block" : "inline",
                  width: isMobile ? "100%" : "auto",
                  padding: isMobile ? "12px 20px" : "10px 15px",
                }}
                onClick={() => isMobile && setMenuOpen(false)}
              >
                {t("girl")}
              </Link>
              {showGirlMenu && !isMobile && (
                <div style={styles.dropdown}>
                  <CategorySection 
                    title={t("clothing")}
                    links={[
                      { to: "/nina/ropa/pantalones", text: t("pants") },
                      { to: "/nina/ropa/shorts", text: "Shorts" },
                      { to: "/nina/ropa/camisetas", text: t("tshirt") },
                      { to: "/nina/ropa/vestidos", text: t("dress") },
                      { to: "/nina/ropa/faldas", text: t("skirt") }
                    ]}
                  />
                  <CategorySection 
                    title={t("footwear")}
                    links={[
                      { to: "/nina/calzado/zapatillas", text: t("sneakers") },
                      { to: "/nina/calzado/zapatos", text: t("shoes") },
                      { to: "/nina/calzado/botas", text: t("boots") }
                    ]}
                  />
                  <CategorySection 
                    title={t("accessories")}
                    links={[
                      { to: "/nina/complementos/bolsos", text: t("pockets") },
                      { to: "/nina/complementos/mochilas", text: t("backpack") },
                      { to: "/nina/complementos/gorras", text: t("cups") }
                    ]}
                  />
                </div>
              )}
            </div>

            <Link 
              to="/marcas" 
              style={{
                ...styles.mainNavLink,
                textAlign: isMobile ? "center" : "left",
                display: isMobile ? "block" : "inline",
                width: isMobile ? "100%" : "auto",
                padding: isMobile ? "12px 20px" : "10px 15px",
              }}
              onClick={() => isMobile && setMenuOpen(false)}
            >
              {t("brands")}
            </Link>
          </div>

          {/* BOTONES DE IDIOMA */}
          <div style={{
            ...styles.languageButtons,
            flexDirection: isMobile ? "row" : "row",
            gap: isMobile ? "10px" : "5px",
            justifyContent: isMobile ? "center" : "flex-start",
            width: isMobile ? "100%" : "auto",
            marginTop: isMobile ? "10px" : "0",
          }}>
            <button
              onClick={() => {
                i18n.changeLanguage("ca");
                isMobile && setMenuOpen(false);
              }}
              style={{
                ...styles.langButton,
                background: "linear-gradient(45deg, #ff0000, #fff701ff)",
                color: "white",
                border: "none",
                padding: isMobile ? "8px 16px" : "6px 12px",
              }}
            >
              CAT
            </button>
            <button
              onClick={() => {
                i18n.changeLanguage("es");
                isMobile && setMenuOpen(false);
              }}
              style={{
                ...styles.langButton,
                background: "linear-gradient(45deg, #ff0000, #fff701ff)",
                color: "white", 
                border: "none",
                padding: isMobile ? "8px 16px" : "6px 12px",
              }}
            >
              ES
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}