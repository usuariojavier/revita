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
      cart: "Carrito"
    }
  },
  ca: {
    translation: {
      home: "Inici",
      women: "Dona",
      men: "Home",
      boy: "Nen",
      girl: "Nena",
      brands: "Marques",
      cart: "Carret"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // idioma por defecto
    interpolation: { escapeValue: false }
  });

export default i18n;
