import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import productos from "../data/productos";


export default function Category() {
  const { genero, category, subcategoria } = useParams();

  const productos = [
    { id: 1, name: "Camiseta Mujer",  genero: "mujer", categoria: "ropa", subcategoria: "camisetas", price: 19.99, image:"Camiseta-mujer.jpg" ,  size: "M" },
    { id: 2, name: "Zapatillas Hombre", genero: "hombre", categoria: "calzado", subcategoria: "zapatillas", price: 49.99, image:"Zapatillas-hombre.jpeg" , category: "hombre", size: "L" },
    { id: 3, name: "Chaqueta Niño",  genero: "nino", categoria: "ropa", subcategoria: "chaquetas", price: 39.00,  image:"Chaqueta-nen.webp"  ,category: "nino", size: "S" },
    { id: 4, name: "Zapatillas niño",  genero: "nino", categoria: "calzado", subcategoria: "zapatillas", price: 29.99, image:"zapatillas-nen.jpg" , category: "nino", size: "s" },
    { id: 5, name: "Zapatillas Mujer", genero: "mujer", categoria: "calzado", subcategoria: "zapatillas", price: 59.99, image:"zapatillas-mujer.jpeg" , category: "mujer", size: "M" },
    { id: 6, name: "Camisa Hombre", genero: "hombre", categoria: "ropa", subcategoria: "camisas", price: 24.99, image:"camisa-hombre.jpeg" , category: "hombre", size: "S" },
    { id: 7, name: "Vestido Niña", genero: "nina", categoria: "ropa", subcategoria: "vestidos", price: 34.99, image:"vestido-nena.jpg" , category: "nina", size: "s" },
    { id: 8, name: "Pantalones Mujer", genero: "mujer", categoria: "ropa", subcategoria: "pantalones", price: 39.99, image:"pantalones-mujer.jpeg" , category: "mujer", size: "L" },
    { id: 9, name: "Sudadera Hombre", genero: "hombre", categoria: "ropa", subcategoria: "sudaderas", price: 44.99, image:"sudadera-hombre.jpeg" , category: "hombre", size: "XL" },
    { id: 10, name: "Botas Niño", genero: "nino", categoria: "calzado", subcategoria: "botas", price: 49.99, image:"botas-nen.jpeg" , category: "nino", size: "L" },
    { id: 11, name: "Chaqueta Niña", genero: "nina", categoria: "ropa", subcategoria: "chaquetas", price: 39.99, image:"chaqueta-nena.jpeg" , category: "nina", size: "M" },
    { id: 12, name: "Zapatillas Mariquita", genero: "niña", categoria: "calzado", subcategoria: "zapatillas", price: 29.99, image:"zapatillas-mariquita.jpeg" , category: "mariquita", size: "S" },
    { id: 13, name: "Camiseta Hombre", genero: "hombre", categoria: "ropa", subcategoria: "camisetas", price: 19.99, image:"Camiseta-hombre.jpeg" , category: "hombre", size: "M" },
    { id: 14, name: "Pantalones Niño", genero: "nino", categoria: "ropa", subcategoria: "pantalones", price: 29.99, image:"Pantalones-nen.jpeg" , category: "nino", size: "S" },
    { id: 15, name: "Botas Mujer", genero: "mujer", categoria: "calzado", subcategoria: "botas", price: 59.99, image:"Botas-mujer.jpeg" , category: "mujer", size: "L" },
    { id: 16, name: "Gafas de Sol mujer ", genero: "mujer", categoria: "complementos", subcategoria: "gafas-sol", price: 39.0, image: "gafasSolMujer.jpeg", category: "mujer", size: "M", },
    { id: 17, name: "Gafas de Sol Hombre", genero: "hombre", categoria: "complementos", subcategoria: "gafas-sol", price: 39.0, image: "gafasSolHombre.jpg", category: "hombre", size: "M" },


  ];

  let filtrados = productos;

  if (genero) filtrados = filtrados.filter(p => p.genero === genero);
  if (category) filtrados = filtrados.filter(p => p.categoria === category);
  if (subcategoria) filtrados = filtrados.filter(p => p.subcategoria === subcategoria);

  return (


    <div style={{ padding: "20px" }}>
  <h1>
    {genero ? genero.toUpperCase() : ""}{" "}
    {category ? `/ ${category.toUpperCase()}` : ""}{" "}
    {subcategoria ? `/ ${subcategoria.toUpperCase()}` : ""}
  </h1>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      justifyContent: "center",
      maxWidth: "1000px",
      margin: "0 auto",
    }}
  >
    {filtrados.map(p => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
</div>



  );
}

