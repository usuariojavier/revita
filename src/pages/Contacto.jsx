// src/pages/Contacto.jsx

import i18n from "../i18n/i18n";                     //  para traducir
import { useTranslation } from "react-i18next";    // para traducir



export default function Contacto() {


  const { t } = useTranslation();    // para  traducir

  return (
    <div style={styles.container}>
      <img
        src="/images/atencionn.png"
        alt="Contacto"
        style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}
      />
      <h1 style={styles.title}>{t("contact")}</h1>
      <p style={styles.text}>{t("doubtsOrSuggestions")}:</p>
      <form style={styles.form}>
        <input type="text" placeholder= {t("name")}style={styles.input} />
        <input type="email" placeholder="email" style={styles.input} />
        <textarea placeholder={t("message")}rows="5" style={styles.textarea}></textarea>
        <button type="submit" style={styles.button}>Enviar</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "10px 20px", maxWidth: "600px", margin: "10px auto" , marginTop:10},
  title: { fontSize: "28px", marginBottom: "20px" },
  text: { fontSize: "16px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" },
  textarea: { padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" },
  button: { padding: "12px", fontSize: "16px", backgroundColor: "#12e2ef", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
};
