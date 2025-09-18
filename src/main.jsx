// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Importa tu AuthProvider

// Asegúrate de que tu index.html no tiene la inicialización de Firebase duplicada.
// Solo debe haber un <div id="root"></div> y un <script type="module" src="/src/main.jsx"></script>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Envuelve tu App con AuthProvider para que toda la app tenga acceso al estado de autenticación */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

