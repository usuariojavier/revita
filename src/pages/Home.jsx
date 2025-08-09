import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";

export default function Home({ productos }) {
  return (
    <div style={{ padding: "20px" }}>
      <Banner />
      <h1 style={{ marginBottom: "20px" }}>REVITA</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}
      >
        {productos.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
