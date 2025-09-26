// src/pages/Checkout.jsx



import { PhotoProvider, PhotoView } from 'react-photo-view';  // ✅ Importamos PhotoProvider y PhotoView para el visor
import 'react-photo-view/dist/react-photo-view.css';


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebaseConfig";
import { ref, push, serverTimestamp } from "firebase/database";


export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth();


  const [message, setMessage] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (cart.length === 0) {
      setMessage("Tu carrito está vacío. Por favor, añade algunos productos para continuar.");
    } else if (!currentUser) {
      setMessage("Debes iniciar sesión para completar tu compra.");
    } else {
      setMessage(""); // Clear message if ready to checkout
    }
  }, [cart, currentUser]);


  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };


  const handlePlaceOrder = async () => {
    if (!currentUser) {
      alert("Debes iniciar sesión para realizar un pedido.");
      navigate("/cuenta"); // Redirige a la página de cuenta
      return;
    }
    if (cart.length === 0) {
      alert("El carrito está vacío. Por favor, añade productos.");
      navigate("/"); // Redirige a la página principal
      return;
    }
    // Basic validation for shipping info
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.country) {
        alert("Por favor, completa toda la información de envío.");
        return;
    }


    try {
      // Prepara los datos del pedido
      const orderData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        timestamp: serverTimestamp(),
        items: cart.map(item => ({
          productId: item.id,
          name: item.nombre || item.name,
          price: item.price,
          quantity: item.quantity || 1
        })),
        total: calculateTotal(),
        status: "pending",
        shippingInfo: shippingInfo,
      };

      const ordersRef = ref(database, 'orders');
      await push(ordersRef, orderData);

      clearCart();
      alert("¡Pedido realizado con éxito!");
      navigate("/confirmacion-pedido");

    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      alert("Error al realizar el pedido. Por favor, inténtalo de nuevo.");
    }
  };


  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      <h1>Finalizar Compra</h1>

      {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}

      {!message && (
        <>
          <h2>Resumen del Carrito</h2>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.cartItemId} style={{ borderBottom: "1px solid #eee", padding: "10px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}> {/* <-- ¡CAMBIO AQUÍ: alignItems: "center"! */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> {/* <-- Nuevo div para la imagen y el texto */}


                    <PhotoProvider>
  <PhotoView src={item.images?.[0] || item.image}>
    <img
      src={item.images?.[0] || item.image}
      alt={item.nombre || item.name}
      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
      onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }}
    />
  </PhotoView>
</PhotoProvider>



                    <span>{item.nombre || item.name} (x{item.quantity || 1})</span>
                  </div>
                  <span>{item.price * (item.quantity || 1)} €</span>
                </div>
              ))}
              <h3 style={{ textAlign: "right", marginTop: "20px" }}>Total: {calculateTotal()} €</h3>
            </div>
          )}

          <h2>Información de Envío</h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
            <label>
              Nombre Completo:
              <input type="text" name="name" value={shippingInfo.name} onChange={handleShippingChange} style={styles.input} required />
            </label>
            <label>
              Dirección:
              <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} style={styles.input} required />
            </label>
            <label>
              Ciudad:
              <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingChange} style={styles.input} required />
            </label>
            <label>
              Código Postal:
              <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingChange} style={styles.input} required />
            </label>
            <label>
              País:
              <input type="text" name="country" value={shippingInfo.country} onChange={handleShippingChange} style={styles.input} required />
            </label>
          </form>

          {/* Botón para finalizar el pedido */}
          <button
            onClick={handlePlaceOrder}
            style={{ padding: "15px 30px", backgroundColor: "#12e2ef", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1.2em", marginTop: "30px" }}
          >
            Confirmar Pedido y Pagar
          </button>
        </>
      )}
    </div>
  );
}

// Estilos básicos (puedes ajustar o mover a un archivo de estilos)
const styles = {
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
};
