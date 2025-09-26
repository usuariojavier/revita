import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import "./Banner.css";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [images, setImages] = useState([]);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cargar imágenes desde Firebase
  useEffect(() => {
    const bannersRef = ref(database, "banner");
    const unsubscribe = onValue(bannersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const raw = isMobile ? data.mobile : data.desktop;
        const array = raw ? Object.values(raw) : [];
        setImages(array);
      } else {
        setImages([]);
      }
    });

    return () => unsubscribe();
  }, [isMobile]);

  // Reiniciar índice si cambian las imágenes
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Carrusel automático
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="banner-container">
      {images.length > 0 ? (
        <img
          key={currentIndex} // 🔥 fuerza el cambio visual
          src={images[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="banner-image"
        />
      ) : (
        <p className="banner-empty">📭 No hay banners disponibles</p>
      )}
    </div>
  );
};

export default Banner;
