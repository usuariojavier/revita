



export default function FAQ() {
  return (
    <div style={styles.container}>

        <img
        src="/images/chica.png"
        alt="preguntas"
        style={{ width: "100%", maxWidth: "600px", marginBottom: "10px", paddingTop:0 , marginTop:-150  }}
      />
      <h1 style={styles.title}>Preguntas Frecuentes</h1>
      <ul style={styles.list}>
        <li><strong>¿Cuánto tarda el envío?</strong> — Entre 2 y 5 días hábiles.</li>
        <li><strong>¿Puedo devolver un producto usado?</strong> — No, debe estar sin usar y en su embalaje original.</li>
        <li><strong>¿Qué métodos de pago aceptan?</strong> — Tarjeta, PayPal y Bizum.</li>
        <li><strong>¿Cómo puedo contactar con atención al cliente?</strong> — A través del formulario en la página de contacto.</li>
        <li><strong>¿Ofrecen garantía en sus productos?</strong> — Sí, todos nuestros productos tienen garantía de 3 meses.</li>
        <li><strong>¿Puedo cambiar mi pedido después de realizarlo?</strong> — Sí, contáctanos lo antes posible para gestionar el cambio.</li>
        <li><strong>¿Hacen envíos internacionales?</strong> — Actualmente solo enviamos a España.</li>
        <li><strong>¿Cómo puedo rastrear mi pedido?</strong> — Recibirás un email con el número de seguimiento una vez enviado.</li>
        <li><strong>¿Tienen tienda física?</strong> — No, solo operamos online.</li>

      </ul>
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "800px", margin: "0 auto" },
  title: { fontSize: "28px", marginBottom: "20px" },
  list: { fontSize: "16px", lineHeight: "1.8", listStyleType: "none", paddingLeft: 0 },
};
