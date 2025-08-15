



export default function FAQ() {
  return (
    <div style={styles.container}>

        <img src="/images/preguntas.gif" alt="FAQ" style={{ width: "200px", margin: "20px auto", display: "block" }} />
      <h1 style={styles.title}>Preguntas Frecuentes</h1>
      <ul style={styles.list}>
        <li><strong>¿Cuánto tarda el envío?</strong> — Entre 2 y 5 días hábiles.</li>
        <li><strong>¿Puedo devolver un producto usado?</strong> — No, debe estar sin usar y en su embalaje original.</li>
        <li><strong>¿Qué métodos de pago aceptan?</strong> — Tarjeta, PayPal y Bizum.</li>
      </ul>
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "800px", margin: "0 auto" },
  title: { fontSize: "28px", marginBottom: "20px" },
  list: { fontSize: "16px", lineHeight: "1.8", listStyleType: "none", paddingLeft: 0 },
};
