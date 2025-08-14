import { useState } from "react";

export default function Cuenta() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(prev => !prev);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isLogin ? "Iniciar sesión" : "Crear cuenta"}</h1>

      <form style={styles.form}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Nombre completo"
            style={styles.input}
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {isLogin ? "Entrar" : "Registrarse"}
        </button>
      </form>

      <p style={styles.toggleText}>
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button onClick={toggleForm} style={styles.toggleButton}>
          {isLogin ? "Crear una cuenta" : "Iniciar sesión"}
        </button>
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px #12e2ef(0,0,0,0.1)",
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
  },
};

