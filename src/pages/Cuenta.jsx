// src/pages/Cuenta.jsx

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // <-- ¡IMPORTA Link!

import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";

export default function Cuenta() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const adminEmails = ['sesehuesca@gmail.com', 'lareperchashop@gmail.com'];

  // Redirige si el usuario ya está logeado Y ES ADMIN
  useEffect(() => {
    if (!authLoading && currentUser && adminEmails.includes(currentUser.email.toLowerCase())) {
        navigate("/admin"); // Si es admin, redirige al panel
    }
    // Si es un usuario normal, PERMANECE en esta página para ver las opciones
  }, [currentUser, navigate, authLoading, adminEmails]);


  const toggleForm = () => {
    setIsLogin(prev => !prev);
    setMessage("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", { email, password, isLogin, name });

    setMessage("");
    setLoading(true);

    if (!email || !password || (!isLogin && !name)) {
      setMessage("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("¡Has iniciado sesión correctamente!");
        // La redirección post-login ahora la gestiona el useEffect para admins,
        // o el usuario se queda aquí si es un usuario normal.
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user && name) {
          await updateProfile(user, { displayName: name });
        }
        setMessage(`¡Cuenta creada para ${name || email}! Has iniciado sesión automáticamente.`);
        // No redirige automáticamente para que el usuario pueda ver las opciones.
      }

    } catch (error) {
      console.error("Firebase Auth Error:", error.code, error.message);
      let errorMessage = "Ocurrió un error inesperado.";
      // ... (tu lógica de errores existente) ...
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "El correo electrónico ya está en uso. Intenta iniciar sesión o usa otro correo.";
          break;
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico es inválido.";
          break;
        case 'auth/weak-password':
          errorMessage = "La contraseña debe tener al menos 6 caracteres.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No se encontró ningún usuario con ese correo electrónico.";
          break;
        case 'auth/wrong-password':
          errorMessage = "La contraseña es incorrecta.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Error de conexión. Revisa tu conexión a internet.";
          break;
        default:
          errorMessage = `Error de autenticación: ${error.message}`;
          break;
      }
      setMessage(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  // Nuevo bloque JSX para usuarios logeados
  if (currentUser && !authLoading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Mi Cuenta</h1>
        <p>Bienvenido, {currentUser.displayName || currentUser.email}</p>
        <div style={styles.optionsContainer}>
          <Link to="/mis-pedidos" style={styles.optionButton}>Ver Mis Pedidos</Link>
          {/* Aquí puedes añadir más opciones: editar perfil, direcciones, etc. */}
          <button onClick={() => { /* Lógica para cerrar sesión, aunque ya está en App.jsx */ }} style={{ ...styles.optionButton, backgroundColor: '#dc3545' }}>Cerrar Sesión</button>
        </div>
      </div>
    );
  }




  // JSX original para el formulario de login/registro
  return (

    <div style={styles.pageWrapper}>
    <div style={styles.container}>
      <h1 style={styles.title}>{isLogin ? "Iniciar sesión" : "Crear cuenta"}</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            disabled={loading}
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          disabled={loading}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Cargando..." : (isLogin ? "Entrar" : "Registrarse")}
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      <p style={styles.toggleText}>
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button onClick={toggleForm} style={styles.toggleButton} disabled={loading}>
          {isLogin ? "Crear una cuenta" : "Iniciar sesión"}
        </button>
      </p>
    </div>
    <div style={styles.footerSpacer}></div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "-350px",
    padding: "40px",
    maxWidth: "400px",
    margin: "25px auto",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#12e2ef",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    }
  },
  toggleText: {
    marginTop: "20px",
    fontSize: "14px",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#12e2ef",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "14px",
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    }
  },
  optionsContainer: { // Nuevo estilo
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  optionButton: { // Nuevo estilo
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none', // Para Link
  },
  pageWrapper: {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // ← altura completa de la ventana
},

footerSpacer: {
  flexGrow: 1, // ← empuja el footer hacia abajo si el contenido es corto
},



};

