



export default function Devoluciones() {
  return (
    <div style={styles.container}>


        <img src="/images/devolucion.gif" alt="Devoluciones" style={{ width: "60%", marginBottom: "20px" }} />
      <h1 style={styles.title}>Política de Devoluciones</h1>
      <p style={styles.text}>
        Puedes devolver cualquier producto dentro de los 30 días posteriores a la compra. Asegúrate de que el artículo esté sin usar y en su embalaje original.
      </p>
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "800px", margin: "0 auto" },
  title: { fontSize: "28px", marginBottom: "20px" },
  text: { fontSize: "16px", lineHeight: "1.6" },
};
