

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

// constantes ara saber si esta en movil o no 



const [isMobile, setIsMobile] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  handleResize(); // inicial
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);





////////    ESTILOS DE DROPDOWN Y SUBMENU   PRIMER SUBMENU  //////////


  const styles = {




  dropdown: {
    position: "absolute",
    top: "16px",
    left: "0",
    width: "180px",
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    boxShadow: "0 4px 8px rgba(0,0,0,5)",
    padding: "10px",
    zIndex: 1000,
    minWidth: "180px",
    display: "flex",
   
  
    flexDirection: "column",
    gap: "15px",
    borderRadius: "6px",

    color: "white",
    fontSize: "20px",
    textAlign: "right",
    

  },


  //   SEGUNDO SUBMENU  ///

  submenuTrigger: {
    position: "relative",
    padding: "6px 10px",
    cursor: "pointer",
    backgroundColor: "#12e2ef",
    borderRadius: "6px",
    transition: "background 0.5s",
    backgroundColor: "#ffffff",
    color: "white",
    fontSize: "16px",

  },

submenu: {
  position: isMobile ? "static" : "absolute",
  top: isMobile ? "auto" : 0,
  left: isMobile ? "auto" : "100%",
  width: "100%",
  maxWidth: "180px",
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  boxShadow: "0 4px 8px #12e2ef(0,0,0,0.9)",
  padding: "10px",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  borderRadius: "6px",
  textAlign: "left",
  fontSize: "1rem",
  color: "#333",
}

};




  return (
    <div>
      <header>
        {/*  -----------------------MENU HAMBURGUESA  -----------------------------     */}

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
          />
        )}

        <nav
          style={{
            display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
            flexDirection: isMobile ? "column" : "row",

            alignItems: "center",

            gap: "30px",
          }}
        >
          <Link to="/">
            {" "}
            {<img src="/images/home.png" alt="user" width={"25px"} />}
          </Link>

          {/*----------------------    MUJER -----------------------------*/}

          <div
            onMouseEnter={() => setShowWomenMenu(true)}
            onMouseLeave={() => {
              setShowWomenMenu(false);
              setShowClothingMenu(false);
              setShowShoesMenu(false);
              setShowAccessoriesMenu(false);
            }}
            style={{ position: "relative" }}
          >
            <Link to="/mujer">{t("women")}</Link>
            {showWomenMenu && (
              <div style={styles.dropdown}>
                <Link to="/mujer">{t("all")}</Link>

                <div
                  onMouseEnter={() => setShowClothingMenu(true)}
                  onMouseLeave={() => setShowClothingMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/mujer/ropa">{t("clothing")} ▸</Link>
                  {showClothingMenu && (
                    <div style={styles.submenu}>
                      <Link to="/mujer/ropa/pantalones"> {t("pants")}</Link>
                      <Link to="/mujer/ropa/shorts">Shorts</Link>
                      <Link to="/mujer/ropa/top">Top</Link>*
                      <Link to="/mujer/ropa/camisetas">{t("tshirt")}</Link>
                      <Link to="/mujer/ropa/vestidos">{t("dress")}</Link>
                      <Link to="/mujer/ropa/faldas">{t("skirt")}</Link>
                      <Link to="/mujer/ropa/mallas">{t("leggings")}</Link>
                      <Link to="/mujer/ropa/abrigos">{t("jackets")}</Link>
                      <Link to="/mujer/ropa/sudaderas">{t("sweatshirts")}</Link>
                      <Link to="/mujer/ropa/pijamas">Pijamas</Link>
                    </div>
                  )}
                </div>

                <div
                  onMouseEnter={() => setShowShoesMenu(true)}
                  onMouseLeave={() => setShowShoesMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/mujer/calzado">Calzado ▸</Link>
                  {showShoesMenu && (
                    <div style={styles.submenu}>
                      <Link to="/mujer/calzado/zapatillas">
                        {t("sneakers")}
                      </Link>
                      <Link to="/mujer/calzado/zapatos">{t("shoes")}</Link>
                      <Link to="/mujer/calzado/botas">{t("boots")}</Link>
                      <Link to="/mujer/calzado/botines">Botines</Link>
                      <Link to="/mujer/calzado/chanclas">Chanclas</Link>
                      <Link to="/mujer/calzado/casa">
                        {t("house_sleepers")}
                      </Link>
                    </div>
                  )}
                </div>

                <div
                  onMouseEnter={() => setShowAccessoriesMenu(true)}
                  onMouseLeave={() => setShowAccessoriesMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/Mujer/complementos"> {t("accessories")}▸ </Link>
                  {showAccessoriesMenu && (
                    <div style={styles.submenu}>
                      <Link to="/mujer/complementos/bolsos">
                        {t("pockets")}
                      </Link>
                      <Link to="/mujer/complementos/mochilas">
                        {t("backpack")}
                      </Link>
                      <Link to="/mujer/complementos/carteras">Carteras</Link>
                      <Link to="/mujer/complementos/monederos">Monederos</Link>
                      <Link to="/mujer/complementos/bufandas">{t("handkerchiefs")}</Link>
                      <Link to="/mujer/complementos/calcetines">
                        {t("socks")}
                      </Link>

                      <Link to="/mujer/complementos/gafas-sol">
                        {t("sunglasess")}
                      </Link>
                      <Link to="/mujer/complementos/gafas">{t("glasses")}</Link>
                      <Link to="/mujer/complementos/cinturones">
                        {t("belts")}
                      </Link>
                      <Link to="/mujer/complementos/gorras">{t("cups")}</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/*    -------------------------------HOMBRE    --------------------------------------*/}

          <div
            onMouseEnter={() => setShowMenMenu(true)}
            onMouseLeave={() => {
              setShowMenMenu(false);
              setShowMenClothingMenu(false);
              setShowMenShoesMenu(false);
              setShowMenAccessoriesMenu(false);
            }}
            style={{ position: "relative" }}
          >
            <Link to="/hombre">{t("men")}</Link>
            {showMenMenu && (
              <div style={styles.dropdown}>
                <Link to="/hombre">Todo</Link>

                {/* Ropa */}
                <div
                  onMouseEnter={() => setShowMenClothingMenu(true)}
                  onMouseLeave={() => setShowMenClothingMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/hombre/ropa">Ropa ▸</Link>
                  {showMenClothingMenu && (
                    <div style={styles.submenu}>
                      <Link to="/hombre/ropa/pantalones">Pantalones</Link>
                      <Link to="/hombre/ropa/bermudas">Bermudas</Link>
                      <Link to="/hombre/ropa/camisetas">Camisetas</Link>
                      <Link to="/hombre/ropa/camisas">Camisas</Link>
                      <Link to="/hombre/ropa/sudaderas">Sudaderas</Link>
                      <Link to="/hombre/ropa/chaquetas">Chaquetas</Link>
                      <Link to="/hombre/ropa/abrigos">Abrigos</Link>
                      <Link to="/hombre/ropa/pijamas">Pijamas</Link>
                      <Link to="/hombre/ropa/ropa-interior">Ropa interior</Link>
                    </div>
                  )}
                </div>

                {/* Calzado */}
                <div
                  onMouseEnter={() => setShowMenShoesMenu(true)}
                  onMouseLeave={() => setShowMenShoesMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/hombre/calzado">Calzado ▸</Link>
                  {showMenShoesMenu && (
                    <div style={styles.submenu}>
                      <Link to="/hombre/calzado/zapatillas">Zapatillas</Link>
                      <Link to="/hombre/calzado/zapatos">Zapatos</Link>
                      <Link to="/hombre/calzado/botas">Botas</Link>
                      <Link to="/hombre/calzado/chanclas">Chanclas</Link>
                      <Link to="/hombre/calzado/casa">Zapatillas de casa</Link>
                    </div>
                  )}
                </div>

                {/* Complementos */}
                <div
                  onMouseEnter={() => setShowMenAccessoriesMenu(true)}
                  onMouseLeave={() => setShowMenAccessoriesMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/hombre/complementos">Complementos ▸</Link>
                  {showMenAccessoriesMenu && (
                    <div style={styles.submenu}>
                      <Link to="/hombre/complementos/bolsos">Bolsos</Link>
                      <Link to="/hombre/complementos/mochilas">Mochilas</Link>
                      <Link to="/hombre/complementos/carteras">Carteras</Link>
                      <Link to="/hombre/complementos/gafas-sol">
                        Gafas de sol
                      </Link>
                      <Link to="/hombre/complementos/gafas">Gafas</Link>
                      <Link to="/hombre/complementos/cinturones">
                        Cinturones
                      </Link>
                      <Link to="/hombre/complementos/gorras">Gorras</Link>
                      <Link to="/hombre/complementos/calcetines">
                        Calcetines
                      </Link>
                      <Link to="/hombre/complementos/bufandas">Bufandas</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/*------------------------NIÑO--------------------*/}

          <div
            onMouseEnter={() => setShowBoyMenu(true)}
            onMouseLeave={() => {
              setShowBoyMenu(false);
              setShowBoyClothingMenu(false);
              setShowBoyShoesMenu(false);
              setShowBoyAccessoriesMenu(false);
            }}
            style={{ position: "relative" }}
          >
            <Link to="/nino">{t("boy")}</Link>
            {showBoyMenu && (
              <div style={styles.dropdown}>
                <Link to="/nino">Todo</Link>

                {/* Ropa */}
                <div
                  onMouseEnter={() => setShowBoyClothingMenu(true)}
                  onMouseLeave={() => setShowBoyClothingMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/nino/ropa">Ropa ▸</Link>
                  {showBoyClothingMenu && (
                    <div style={styles.submenu}>
                      <Link to="/nino/ropa/pantalones">Pantalones</Link>
                      <Link to="/nino/ropa/bermudas">Bermudas</Link>
                      <Link to="/nino/ropa/camisetas">Camisetas</Link>
                      <Link to="/nino/ropa/sudaderas">Sudaderas</Link>
                      <Link to="/nino/ropa/chaquetas">Chaquetas</Link>
                      <Link to="/nino/ropa/abrigos">Abrigos</Link>
                      <Link to="/nino/ropa/pijamas">Pijamas</Link>
                      <Link to="/nino/ropa/ropa-interior">Ropa interior</Link>
                    </div>
                  )}
                </div>

                {/* Calzado */}
                <div
                  onMouseEnter={() => setShowBoyShoesMenu(true)}
                  onMouseLeave={() => setShowBoyShoesMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/nino/calzado">Calzado ▸</Link>
                  {showBoyShoesMenu && (
                    <div style={styles.submenu}>
                      <Link to="/nino/calzado/zapatillas">Zapatillas</Link>
                      <Link to="/nino/calzado/zapatos">Zapatos</Link>
                      <Link to="/nino/calzado/botas">Botas</Link>
                      <Link to="/nino/calzado/chanclas">Chanclas</Link>
                      <Link to="/nino/calzado/casa">Zapatillas de casa</Link>
                    </div>
                  )}
                </div>

                {/* Complementos */}
                <div
                  onMouseEnter={() => setShowBoyAccessoriesMenu(true)}
                  onMouseLeave={() => setShowBoyAccessoriesMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/nino/complementos">Complementos ▸</Link>
                  {showBoyAccessoriesMenu && (
                    <div style={styles.submenu}>
                      <Link to="/nino/complementos/mochilas">Mochilas</Link>
                      <Link to="/nino/complementos/carteras">Carteras</Link>
                      <Link to="/nino/complementos/gafas-sol">
                        Gafas de sol
                      </Link>
                      <Link to="/nino/complementos/gafas">Gafas</Link>
                      <Link to="/nino/complementos/cinturones">Cinturones</Link>
                      <Link to="/nino/complementos/gorras">Gorras</Link>
                      <Link to="/nino/complementos/calcetines">Calcetines</Link>
                      <Link to="/nino/complementos/bufandas">Bufandas</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/*  ------------------   NIÑA  ----------------------------*/}
          <div
            onMouseEnter={() => setShowGirlMenu(true)}
            onMouseLeave={() => {
              setShowGirlMenu(false);
              setShowGirlClothingMenu(false);
              setShowGirlShoesMenu(false);
              setShowGirlAccessoriesMenu(false);
            }}
            style={{ position: "relative" }}
          >
            <Link to="/nina">{t("girl")}</Link>
            {showGirlMenu && (
              <div style={styles.dropdown}>
                <Link to="/nina">Todo</Link>

                {/* Ropa */}
                <div
                  onMouseEnter={() => setShowGirlClothingMenu(true)}
                  onMouseLeave={() => setShowGirlClothingMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/nina/ropa">Ropa ▸</Link>
                  {showGirlClothingMenu && (
                    <div style={styles.submenu}>
                      <Link to="/nina/ropa/pantalones">Pantalones</Link>
                      <Link to="/nina/ropa/shorts">Shorts</Link>
                      <Link to="/nina/ropa/top">Tops</Link>
                      <Link to="/nina/ropa/camisetas">Camisetas</Link>
                      <Link to="/nina/ropa/vestidos">Vestidos</Link>
                      <Link to="/nina/ropa/faldas">Faldas</Link>
                      <Link to="/nina/ropa/mallas">Mallas</Link>
                      <Link to="/nina/ropa/abrigos">Abrigos</Link>
                      <Link to="/nina/ropa/sudaderas">Sudaderas</Link>
                      <Link to="/nina/ropa/pijamas">Pijamas</Link>
                    </div>
                  )}
                </div>

                {/* Calzado */}
                <div
                  onMouseEnter={() => setShowGirlShoesMenu(true)}
                  onMouseLeave={() => setShowGirlShoesMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/nina/calzado">Calzado ▸</Link>
                  {showGirlShoesMenu && (
                    <div style={styles.submenu}>
                      <Link to="/nina/calzado/zapatillas">Zapatillas</Link>
                      <Link to="/nina/calzado/zapatos">Zapatos</Link>
                      <Link to="/nina/calzado/botas">Botas</Link>
                      <Link to="/nina/calzado/botines">Botines</Link>
                      <Link to="/nina/calzado/chanclas">Chanclas</Link>
                      <Link to="/nina/calzado/casa">Zapatillas de casa</Link>
                    </div>
                  )}
                </div>

                {/* Complementos */}
                <div
                  onMouseEnter={() => setShowGirlAccessoriesMenu(true)}
                  onMouseLeave={() => setShowGirlAccessoriesMenu(false)}
                  style={styles.submenuTrigger}
                >
                  <Link to="/nina/complementos">Complementos ▸</Link>
                  {showGirlAccessoriesMenu && (
                    <div style={styles.submenu}>
                      <Link to="/nina/complementos/bolsos">Bolsos</Link>
                      <Link to="/nina/complementos/mochilas">Mochilas</Link>
                      <Link to="/nina/complementos/carteras">Carteras</Link>
                      <Link to="/nina/complementos/monederos">Monederos</Link>
                      <Link to="/nina/complementos/bufandas">
                        Bufandas y pañuelos
                      </Link>
                      <Link to="/nina/complementos/calcetines">Calcetines</Link>
                      <Link to="/nina/complementos/gorros">Gorros</Link>
                      <Link to="/nina/complementos/gafas-sol">
                        Gafas de sol
                      </Link>
                      <Link to="/nina/complementos/gafas">Gafas</Link>
                      <Link to="/nina/complementos/cinturones">Cinturones</Link>
                      <Link to="/nina/complementos/gorras">Gorras</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link to="/marcas">{t("brands")}</Link>

          <Link to="/cart">
            <img
              src="/images/carrito.png"
              alt="Carrito"
              style={{ width: "25px" }}
            />{" "}
            {cart.length}
          </Link>

          <Link to="/cuenta" className="header-action">
            <span className="action-icon">
              <img src="/images/logoUser.jpg" alt="user" width={"25px"} />
            </span>
            <span className="action-text"></span>
          </Link>

          <div>
            <button
              onClick={() => i18n.changeLanguage("ca")}
              style={{
                marginLeft: "5px",
                backgroundImage:
                  "linear-gradient(to top, #ff0000, #fff701ff, #ff0000ff, #fff701ff , #ff0000, #fff701ff , #ff0000, #fff701ff , #ff0000)",
                color: "white",
                border: "none",
                padding: "0px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              CAT
            </button>
            <button
              onClick={() => i18n.changeLanguage("es")}
              style={{
                marginLeft: "5px",
                backgroundImage:
                  "linear-gradient(to top, #ff0000, #fff701ff , #ff0000)",
                color: "white",
                border: "none",
                padding: "0px",
                borderRadius: "4px",
                cursor: "pointer",
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
