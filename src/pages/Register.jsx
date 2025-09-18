
//src/pages/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setMessage("✅ Cuenta creada. Revisa tu correo para verificar tu email.");
      setTimeout(() => navigate("/login"), 3000); // Redirige después de unos segundos
    } catch (err) {
      setError("❌ No se pudo crear la cuenta. Revisa los datos.");
      console.error(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "40px" }}>
      <h2>Crear cuenta</h2>
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
          Registrarse
        </button>
      </form>
    </div>
  );
}
