import { useCart } from "../context/CartContext";
import i18n from "../i18n/i18n";
import Footer from "../components/Footer"; 
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";




export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (

    <>

    <div> 

        <img src="/images/carrito-compra.gif" alt="Carrito" style={{ width: "600px", margin: "200px auto", display: "block" }} />
   <h1>Mi carrito 🛒</h1>
{!cart.length ? <p>Carrito vacío   😔  </p> : (
  <>

    {cart.map(item => (
  <div key={item.id} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <Link to={`/producto/${item.id}`} style={{ display: "flex", gap: "10px", alignItems: "center", textDecoration: "none", color: "inherit" }}>
      <img src={`/images/${item.image}`} alt={item.name} style={{ width: "80px" }} />
      <div>
        <p>{item.name}</p>
        <p>{item.price}€</p>
      </div>
    </Link>
    <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
  </div>
))}



    <h2>Total: {cart.reduce((sum, i) => sum + i.price, 0).toFixed(2)} €</h2>
    <button onClick={() => navigate('/checkout')} style={{ padding: "10px", backgroundColor: "#007bff", color: "white" }}>Proceder a compra</button>
        </>
)}
 
    </div>


              </>
  );
}
