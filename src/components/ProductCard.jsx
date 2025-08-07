import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <img src={`/images/${product.image}`} alt={product.name}  className="card-img" />
    
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
      <button onClick={() => addToCart(product)} style={styles.button}>
        Añadir al carrito
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center"
  },
  img: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px"
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

