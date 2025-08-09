export default function Novedades() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Novedades</h1>
      <p style={styles.text}>
        Descubre las últimas colecciones, tendencias y productos recién llegados. ¡Mantente al día con lo más nuevo!
      </p>
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "800px", margin: "0 auto" },
  title: { fontSize: "28px", marginBottom: "20px" },
  text: { fontSize: "16px", lineHeight: "1.6" },
};
