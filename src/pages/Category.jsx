import { useParams } from "react-router-dom";

export default function Category() {
  const { category } = useParams();

  return (
    <div>
      <h1>Categoría: {category}</h1>
      <p>Aquí mostraremos los productos filtrados por categoría.</p>
    </div>
  );
}

