import { useCart } from "../context/CartContext";
import i18n from "../i18n/i18n";                 //  para traducir
import Footer from "../components/Footer"; 
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";        //  para traducir


///////////////////////////////////////////      CARRITO      /////////////////////////////////////////////

export default function Cart() {
  const { t } = useTranslation(); //  para traducir
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <div>
                {/*<img
                  src="/images/carrito-compra.gif"
                  alt="Carrito"
                  style={{ width: "200px", margin: "199px auto", display: "block" }}
                />*/}
        <h1>
          {t("cart")}{" "}
          <img
            src="/images/bolsa.png"
            alt="Carrito"
            style={{ width: "50px", margin: "199px 10px", }}
          />
        </h1>
        {!cart.length ? (
          <p> {t("emptyCart")} 😔 </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <Link
                  to={`/producto/${item.id}`}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    style={{ width: "200px" }}
                  />
                  <div>
                    <p>{t(item.name)}</p>
                    <p style={{ fontWeight: "bold" }}>{item.price}€</p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  style={{
                    padding: "10px",
                    backgroundColor: "#12e2ef",
                    color: "white",
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}

            <h2>
              Total: {cart.reduce((sum, i) => sum + i.price, 0).toFixed(2)} €
            </h2>
            <button
              onClick={() => navigate("/checkout")}
              style={{
                padding: "10px",
                marginBottom: "18px",
                backgroundColor: "#12e2ef",
                color: "white",
              }}
            >
              {t("proceedToPurchase")}
            </button>
          </>
        )}
      </div>
    </>
  );
}
