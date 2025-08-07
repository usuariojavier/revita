import { useCart } from "../context/CartContext";




export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h1>Carrito 🛒</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        cart.map((item, idx) => (
          <div key={idx}>
            <p>{item.name} - {item.price}€</p>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}
