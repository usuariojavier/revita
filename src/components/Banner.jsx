import React, { useState, useEffect } from 'react';
import './Banner.css'; // Asegúrate de crear este archivo para los estilos

const images = [
  '/public/images/descuento.jpeg',
  '/public/images/oferta.jpeg',
  '/public/images/oferta2.jpeg'
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // cambia cada 3 segundos

    return () => clearInterval(interval); // limpia el intervalo al desmontar
  }, []);

  return (
    <div className="banner-container">
      <img
        src={images[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        className="banner-image"
      />
    </div>
  );
};

export default Banner;