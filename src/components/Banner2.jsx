import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function Banner2() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const banner2Ref = ref(database, "banner2");
    const unsubscribe = onValue(banner2Ref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setImageSrc(isMobile ? data.mobile : data.desktop);
      }
    });

    return () => unsubscribe();
  }, [isMobile]);

  const bannerStyle = {
    position: 'relative',
    top: isMobile ? '-150px' : '-70px',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
  };

  return (
    <div style={bannerStyle}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Banner promocional"
          style={{
            width: '100%',
            maxWidth: isMobile ? '100%' : '1200px',
            height: 'auto',
          }}
        />
      ) : (
        <p style={{ fontSize: '16px', color: '#666' }}>📭 Banner no disponible</p>
      )}
    </div>
  );
}
