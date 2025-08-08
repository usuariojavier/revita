import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      home: "Inicio",
      women: "Mujer",
      men: "Hombre",
      boy: "Niño",
      girl: "Niña",
      brands: "Marcas",
      cart: "Carrito",
      search: "Buscar",
      shirt: "Camisa",
      pants: "Pantalons",
      shoes: "Zapatos",
      socks: "Calcetines",
      accessories: "Accesorios",
      apply: "Aplicar",
      filters: "Filtros",
      category: "Categoría",
      price: "Precio",
      size: "Talla",
      allCategories: "Todas las categorías",
      allPrices: "Todos los precios",
      allSizes: "Todas las tallas",
      applyFilters: "Aplicar filtros",
      searchProducts: "Buscar productos...",
      jacket: "Chaqueta",
      dress: "Vestido",
      back: "volver",
      top: "arriba",
    },
  },
  ca: {
    translation: {
      home: "Inici",
      women: "Dona",
      men: "Home",
      boy: "Nen",
      girl: "Nena",
      brands: "Marques",
      cart: "Carret",
      search: "Cercar",
      shirt: "Camisa",
      pants: "Pantalons",
      shoes: "Zapats",

      accessories: "Accesoris",
      apply: "Aplicar",
      filters: "Filtres",
      category: "Categoria",
      price: "Preu",
      size: "Talla",
      allCategories: "Totes les categories",
      allPrices: "Tots els preus",
      allSizes: "Totes les taules",
      applyFilters: "Aplicar filtres",
      dress: "Vestit",
      socks: "Mitjons",
      back: "tornar",
      top: "Arriba",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ca', // idioma por defecto
    interpolation: { escapeValue: false }
  });

export default i18n;
