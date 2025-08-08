import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import i18n from "../i18n/i18n";

export default function Header() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <header >

        <SearchBar />
        <nav style={{ display: "flex", gap: "15px" }}>
          <Link to="/"> {t("home")}</Link>
          <Link to="/mujer"> {t("women")}</Link>
          <Link to="/hombre">{t("men")}</Link>
          <Link to="/nino">{t("boy")}</Link>
          <Link to="/nina">{t("girl")}</Link>
          <Link to="/marcas">{t("brands")}</Link>
          <Link to="/cart"> 🛒{t("cart")} </Link>
          {/*<img
            src="/public/images/logo.png"
            alt="imagen"
            className="logo"
            style={{ width: "50px", height: "50px" }}
          ></img>   */}



           <div >
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
