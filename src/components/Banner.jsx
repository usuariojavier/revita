import React, { useState, useEffect } from "react";
import "./Banner.css";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileImages = ["/images/bannermovil3.webp", "/images/bannermovilhome2.webp", "/images/bannermovilhome.png", "/images/bannermovilhome4.png", "/images/bannerhomemovil5.png"];
  const desktopImages = ["/images/bannerhome1.webp", "/images/bannerhome2.webp", "/images/bannerhome3.webp", "/images/bannerhome4.jpg"];
  
  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

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
