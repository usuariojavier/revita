import React, { useState, useEffect } from "react";
import "./Banner.css"; // Asegúrate de crear este archivo para los estilos

const images = [


  "/public/images/off3.png",
  "/public/images/off2.png",
  "/public/images/off1.png",
  
   
  
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // cambia cada 2 segundos

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
