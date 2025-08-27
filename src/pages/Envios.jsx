



export default function Envios() {
  return (
    <div style={styles.container}>
      <img src="/images/envios.gif" alt="Envíos" style={styles.image} />
      <h1 style={styles.title}>Información de Envíos</h1>
      <p style={styles.text}>
        Realizamos envíos a toda España. El tiempo estimado de entrega es de 2 a
        5 días hábiles. Los pedidos superiores a 50€ tienen envío gratuito.
      </p>

      
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "800px", margin: "0 auto" },
  title: { fontSize: "28px", marginBottom: "20px" },
  text: { fontSize: "16px", lineHeight: "1.6" },
};
