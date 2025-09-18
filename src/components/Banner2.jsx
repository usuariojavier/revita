// src/components/Banner2.jsx

import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Banner2() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const bannerStyle = {
    position: 'relative', 
    top: isMobile ? '-150px' : '-70px',       // ajusta según la altura del slider  ********************************
    width: '100%',
    zIndex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    /*boxShadow: '0 2px 5px rgba(0,0,0,0.1)',*/
  };

  const imageSrc = isMobile
    ?  
     '/images/bannerabajomovil.webp' : '/images/bannerabajoescritorio.webp' ;

  return (
    <div style={bannerStyle}>
      <img
        src={imageSrc}
        alt="Banner promocional"
        style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '1200px',
          height: 'auto',
        }}
      />
    </div>
  );
}






