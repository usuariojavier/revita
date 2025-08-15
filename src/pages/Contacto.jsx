



export default function Contacto() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contacto</h1>
      <p style={styles.text}>¿Tienes alguna duda o sugerencia? Escríbenos:</p>
      <form style={styles.form}>
        <input type="text" placeholder="Tu nombre" style={styles.input} />
        <input type="email" placeholder="Tu correo" style={styles.input} />
        <textarea placeholder="Tu mensaje" rows="5" style={styles.textarea}></textarea>
        <button type="submit" style={styles.button}>Enviar</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "600px", margin: "0 auto" },
  title: { fontSize: "28px", marginBottom: "20px" },
  text: { fontSize: "16px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" },
  textarea: { padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" },
  button: { padding: "12px", fontSize: "16px", backgroundColor: "#12e2ef", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
};
