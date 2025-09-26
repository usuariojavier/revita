
// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setShowResend(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("⚠️ Tu correo no está verificado.");
        setShowResend(true);
        await signOut(auth);
        return;
      }

      navigate("/");
    } catch (err) {
      setError("❌ Credenciales incorrectas o usuario no registrado.");
      console.error(err.message);
    }
  };

  const handleResendVerification = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setMessage("📩 Email de verificación reenviado. Revisa tu bandeja de entrada.");
        setShowResend(false);
      }
    } catch (err) {
      setError("❌ No se pudo reenviar el email. Intenta más tarde.");
      console.error(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "40px" }}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#12e2ef", color: "white", border: "none", borderRadius: "4px" }}>
          Entrar
        </button>
      </form>

      {showResend && (
        <button onClick={handleResendVerification} style={{ marginTop: "10px", backgroundColor: "#03fb1cff", padding: "8px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Reenviar email de verificación
        </button>
      )}

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        ¿No tienes una cuenta? <Link to="/register" style={{ color: "#12e2ef" }}>Regístrate aquí</Link>
      </p>
    </div>
  );
}
