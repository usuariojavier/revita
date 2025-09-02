import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productos from "../data/productos";
import Footer from "../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [visibleStock, setVisibleStock] = useState(null);

  useEffect(() => {
    const found = productos.find(p => p.id === parseInt(id));
    setProduct(found);
    setVisibleStock(found?.stock || 0);
  }, [id]);

  const quantityInCart = cart.filter(item => item.id === product?.id).length;

  const handleAddToCart = () => {
    if (!product || visibleStock <= 0 || quantityInCart >= product.stock) {
      toast.error("❌ No hay más stock disponible", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    addToCart(product);
    setVisibleStock(prev => prev - 1);
    toast.success("✅ Producto añadido al carrito", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <>
      <div
        style={{
          minHeight: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <h2>{product.nombre}</h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            fontFamily: "Avenir Next Medium",
          }}
        >
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            style={{
              width: "300px",
              borderRadius: "8px",
              transform: hovered ? "rotate(355deg)" : "translate(150px)",
              transition: hovered
                ? "transform 0.5s ease-in"
                : "transform 1000s ease-out",
              zIndex: 9,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />

          <div
            className="product-details"
            style={{
              fontFamily: "Avenir Next Medium",
              transform: hovered ? "rotate(-360deg)" : "translate(-150px)",
              transition: hovered
                ? "transform 0.5s ease-in"
                : "transform 1000s ease-out",
            }}
          >
            <p>
              <strong>Precio:</strong> {product.price} €
            </p>
            <p>
              <strong>Talla:</strong> {product.size}
            </p>
            <p>
              <strong>Descripción:</strong> {product.description}
            </p>
            <p>
              <strong>Marca:</strong> {product.brand}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={visibleStock <= 0 || quantityInCart >= product.stock}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  quantityInCart >= product.stock || visibleStock <= 0
                    ? "#ccc"
                    : "#12e2ef",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor:
                  quantityInCart >= product.stock || visibleStock <= 0
                    ? "not-allowed"
                    : "pointer",
                marginTop: "1px",
              }}
            >
              {quantityInCart >= product.stock || visibleStock <= 0
                ? "Sin stock disponible"
                : "Añadir al carrito"}
            </button>
          </div>
        </div>

        {product.images && product.images.length > 1 && (
          <div style={{ marginTop: "20px" }}>
            <h4>Más imágenes</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={`/images/${img}`}
                  alt={`Vista ${i + 1}`}
                  style={{ width: "100px", borderRadius: "4px" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
}
