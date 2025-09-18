// src/utils/uploadProductos.js
import { database } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import productos from "../data/productos";

export const subirProductosAFirebase = () => {
  productos.forEach((producto) => {
    const productoRef = ref(database, `productos/${producto.id}`);
    set(productoRef, producto)
      .then(() => console.log(`✅ Producto ${producto.nombre} subido`))
      .catch((error) => console.error(`❌ Error al subir ${producto.nombre}:`, error));
  });
};
