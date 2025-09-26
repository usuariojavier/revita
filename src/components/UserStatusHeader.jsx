// src/components/UserStatusHeader.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function UserStatusHeader() {
  const { currentUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = {
    padding: '2px 20px',
    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(8px)',
    transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
    borderBottom: '1px solid #eee',
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '15px',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: 1001,
    boxSizing: 'border-box',
  };

  return (
    <div style={headerStyle}>
      {currentUser ? (
        <>
          <span style={{ fontSize: '12px', color: '#000000ff' }}>
            Bienvenida, {currentUser.displayName || currentUser.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: '1px solid #fff',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        <span style={{ fontSize: '14px', color: '#666' }}>
          No has iniciado sesión.
        </span>
      )}
    </div>
  );

  async function handleLogout() {
    try {
      await signOut(auth);
      alert('¡Sesión cerrada con éxito!');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('No se pudo cerrar la sesión. Revisa la consola para más detalles.');
    }
  }
}
