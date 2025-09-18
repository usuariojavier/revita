import { AlignCenter } from "lucide-react";
import { CiTextAlignCenter } from "react-icons/ci";




export default function Envios() {
  return (
    <div style={styles.container}>
     <img
        src="/images/atencionn.png"
        alt="Contacto"
        style={{ width: "100%", maxWidth: "600px", marginBottom: "10px", paddingTop:0 , marginTop:-150  }}
      />
      <h1 style={styles.title}>Información de Envíos</h1>
      <p style={styles.text}>

       Todos los gastos de envío se detallan en el proceso de compra.

        Realizamos envíos a toda España. El tiempo estimado de entrega es de 2 a
        5 días hábiles. Los pedidos superiores a 50€ tienen envío gratuito.
        Los pedidos se envían a través de empresas de mensajería confiables para
        garantizar que lleguen en perfectas condiciones.
        Una vez que tu pedido haya sido enviado, recibirás un correo electrónico
        con la información de seguimiento para que puedas rastrear tu paquete en
        todo momento.


      </p>

      
    </div>
  );
}

const styles = {
  container: { padding: "10px 20px", maxWidth: "600px", margin: "10px auto" , marginTop:-160},
  title: { fontSize: "28px", marginBottom: "20px" },
  text: { fontSize: "16px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" },
  textarea: { padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" },
  button: { padding: "12px", fontSize: "16px", backgroundColor: "#12e2ef", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
};
