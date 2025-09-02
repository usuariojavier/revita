import i18n from "../i18n/i18n";                     //  para traducir
import { useTranslation } from "react-i18next";       //  para traducir





import { useState } from "react";

export default function Cuenta() {
  const [isLogin, setIsLogin] = useState(true);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");


  const { t } = useTranslation();                    //  para traducir

  const toggleForm = () => setIsLogin(prev => !prev);
  
  const handleSubmit = (e) => {     //  Simulación de envío del formulario
  e.preventDefault();

  if (!email || !password || (!isLogin && !name)) {
    setMessage("Por favor, completa todos los campos.");
    return;
  }

  if (isLogin) {
    // Simulación de login
    setMessage(`Bienvenido de nuevo, ${email}`);
  } else {
    // Simulación de registro
    setMessage(`Cuenta creada para ${name}`);
  }

  // Limpia los campos
  setName("");
  setEmail("");
  setPassword("");
};

 


  return (
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
    />
  )}

  <input
    type="email"
    placeholder="Correo electrónico"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={styles.input}
  />
  <input
    type="password"
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={styles.input}
  />

  <button type="submit" style={styles.button}>
    {isLogin ? "Entrar" : "Registrarse"}
  </button>
</form>


    {message && <p style={styles.message}>{message}</p>}


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
    margin: "25px auto",
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

