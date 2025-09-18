
// src/components/ChatBot.jsx

import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';




export default function ChatBot() {

    const isMobile = useMediaQuery({ maxWidth: 768 });  // Verificar si el dispositivo es móvil
    const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 300 });





  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  const dragRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const normalizarTexto = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const contiene = (palabras, texto) =>
    palabras.some((p) => texto.includes(p));

  

  const generateReply = (text) => {
    const cleanText = normalizarTexto(text);

    


    if (contiene(["tiempo", "entrega", "tardan", "tarda envio", "tiempo envio ", "envio", "envios"], cleanText))
      return "Los envíos tardan entre 24 y 48h.";
    if (contiene(["devolucion", "devoluciones"], cleanText))
      return "Puedes devolver tu pedido en 15 días.";
    if (contiene(["contacto"], cleanText))
      return "Puedes escribirnos desde la sección de contacto, abajo de la web.";
    if (contiene(["pago"], cleanText))
      return "Aceptamos pagos con tarjeta, PayPal y Bizum.";
    if (contiene(["garantia"], cleanText))
      return "Todos nuestros productos tienen garantía de 3 meses.";
    if (contiene(["cambio"], cleanText))
      return "Puedes cambiar tu pedido contactando con nosotros lo antes posible.";
    if (contiene(["seguimiento", "rastrear"], cleanText))
      return "Recibirás un email con el número de seguimiento una vez enviado.";
    if (contiene(["tienda"], cleanText))
      return "No tenemos tienda física, solo operamos online.";
    if (contiene(["envios internacionales", "internacionales envios", "internacional", "pais", "paises", "alemania", "francia", "italia", , "portugal", "america", "mexico", "polonia", "latam","lationo"], cleanText))
      return "Actualmente solo enviamos a España peninsular.";
    if (contiene(["envios  blaeares", "canarias envios", "canarias envios", "envios islas", "islas envios", "canarias", "baleares", "ibiza", "mallorca", "menorca", "palma", "envios ibiza", "envios mallorca", "envios menorca", "envios palma" , "formentera", "el hierro"], cleanText))
      return "lo sentimos mucho, actualmente solo enviamos a España peninsular";


    if (contiene(["devolver producto usado"], cleanText))
      return "No, debe estar sin usar y en su embalaje original.";
    if (contiene(["horario atencion cliente", "horario", "atencion cliente"], cleanText))
      return "Nuestro horario de atención al cliente es de lunes a viernes de 9:00 a 18:00.";
    if (contiene(["ofertas", "descuentos", "promociones"], cleanText))
      return "Puedes suscribirte a nuestra newsletter para recibir las últimas ofertas y promociones.";
    if (contiene(["productos nuevos", "novedades"], cleanText))
      return "Puedes visitar la sección de 'Novedades' en nuestro sitio web para ver los productos más recientes.";
    if (contiene(["registro", "crear cuenta", "cuenta"], cleanText))
      return "Puedes crear una cuenta haciendo clic en el icono de usuario en la esquina superior derecha y seleccionando 'Crear cuenta'.";
    if (contiene(["recuperar contraseña", "olvidé mi contraseña", "contraseña"], cleanText))
      return "Puedes recuperar tu contraseña haciendo clic en 'Olvidé mi contraseña' en la página de inicio de sesión.";
    if (contiene(["modificar datos personales", "editar perfil", "datos personales"], cleanText))
      return "Puedes modificar tus datos personales desde la sección 'Mi Cuenta' después de iniciar sesión.";
    if (contiene(["ver mis pedidos", "mis pedidos", "historial de pedidos"], cleanText))
      return "Puedes ver el historial de tus pedidos en la sección 'Mis Pedidos' dentro de 'Mi Cuenta'.";
    if (contiene(["cancelar pedido", "cancelar mi pedido"], cleanText))
      return "Puedes cancelar tu pedido contactando con nuestro servicio de atención al cliente lo antes posible.";
    if (contiene(["ofertas para estudiantes", "descuentos para estudiantes"], cleanText))
      return "Ofrecemos un 10% de descuento para estudiantes.";
   
    if (contiene(["envio gratis", "envios gratis", "gratis", "gratis envio", "gratis envios"], cleanText))
      return "Los pedidos superiores a 50€ tienen envío gratuito.";
    if (contiene(["gracias", "adios", "agur", "adeu","eskerrik asko", "merçi", "mila esker"], cleanText))
        return "¡Un placer! Si tienes más preguntas, no dudes en preguntar. Feliz compra !";
    if (contiene(["saludos", "hola", "buenos dias", "buenas tardes", "buenas noches", "buen dia ", "bon dia", "egun on", ], cleanText))
      return "¡Hola! Como puedo ayudarte?";

    if (contiene(["quien eres", "que eres", "que puedes hacer", "quien sos", "que sos", "carne"], cleanText))
      return "Soy tu asistente virtual, estoy aqui para ayudarte con tus preguntas sobre nuestros productos.";
    if (contiene(["politica privacidad", "privacidad"], cleanText))
      return "Puedes leer nuestra política de privacidad en el enlace al pie de página de nuestro sitio web.";
    if (contiene(["terminos y condiciones", "terminos", "condiciones"], cleanText))
      return "Puedes leer nuestros t&eacute;rminos y condiciones en el enlace al pie de página de nuestro sitio web.";
    if (contiene(["sostenibilidad", "medio ambiente"], cleanText))
      return "Nos comprometemos con la sostenibilidad utilizando materiales reciclables y procesos de producción eco-amigables.";
    if (contiene(["trabaja con nosotros", "empleo", "ofertas de trabajo"], cleanText))
      return "Puedes pregunar sobre ofertas de trabajo actuales en el formulario de contacto.";
    if (contiene(["como estas", "que tal estas", "Que tal", "como va"], cleanText))
      return "Estoy bien, gracias por preguntar. Como puedo ayudarte?";
    if (contiene(["cual es tu nombre", "tu nombre", "que es tu nombre", " como es tu nombre", "como te llamas", "llamas"], cleanText))
      return "Mi nombre es Mery, soy tu asistente virtual.En que puedo ayudarte hoy?";
    if (contiene(["donde estan ubicados", "donde estan", "ubicacion", "donde estan ubicados", "ubicacion", "de donde eres" ,"donde estas "], cleanText))
      return "Estamos ubicados en Lleida, España.";
    if (contiene(["cuantos años", "cuantos años tienes", "que edad tienes", "edad"], cleanText))
        return "Soy un programa de inteligencia artificial, no tengo edad.";
    if (contiene(["quien te creo", "quien te hizo", "quien es tu creador", "quien es tu creadora", "quien te desarrollo", "quien te desarrollo"], cleanText))
        return "Fui desarrollado por un equipo de ingenieros y diseñadores dedicados a mejorar la experiencia del cliente.";
    if (contiene(["quien es tu creador", "quien es tu creadora", "quien te desarrollo", "quien te desarrollo"], cleanText))
        return "Fui desarrollado por un equipo de ingenieros y diseño dedicados a mejorar la experiencia del cliente.";
    if (contiene(["guapa", "atracriva", "sexy", "bella"], cleanText))
        return "Muchas gracias, en que puedo ayudarte ?.";
    if (contiene(["eres humana", "eres humano", "eres real", "eres real ", "eres una persona", "eres un robot", "eres una IA", "eres una inteligencia artificial"], cleanText))
        return "No, soy una inteligencia artificial diseñada para ayudarte con tus preguntas sobre nuestros productos.";
    if (contiene(["eres un robot", "eres una inteligencia artificial", "robot", " eres robot"], cleanText))
        return "No, soy una inteligencia artificial diseñada para ayudarte con tus preguntas sobre nuestros productos.";
    if (contiene(["me puedes ayudar", "puedes ayudarme", "ayudame", "ayuda"], cleanText))
        return "Claro, estoy aqui para ayudarte. Que necesitas saber ?";
    if (contiene(["hablar persona", "persona", "persona real", "humano"], cleanText))
        return "Claro, puedes contactar con nuestro servicio de atención al cliente a través del formulario de contacto en nuestra web.";
    if (contiene(["fea", "tonta", "feo", "tonto", "estupido", "estupida", "puta"], cleanText))
        return "Lo siento si no he cumplido tus expectativas. Estoy aqui para ayudarte con cualquier pregunta que tengas sobre nuestros productos.";
    if (contiene(["chiste", "cuentame un chiste", "broma"], cleanText))
        return "¿Qué hace una blusa en la cama? — Espera que no sea la última vez que te la pongas… ¡porque no es tuya!";
   
    
    


    return "No entendí bien, ¿Puedes reformular la pregunta?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    const botReply = { sender: "bot", text: generateReply(input) };
    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;  // Solo mover si se está arrastrando
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startDrag = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - dragRef.current.getBoundingClientRect().left,
      y: e.clientY - dragRef.current.getBoundingClientRect().top,
    };
  };


const endRef = useRef(null);                      //          Referencia al final de los mensajes

useEffect(() => {
  if (endRef.current) {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);








  return (
    <>
      {!visible && (
        <img
          src="/images/chat2.png"
          alt="Abrir chat"
          onClick={() => setVisible(true)}
          style={{
            position: "fixed",
            bottom: isMobile ? "20px" : "20px",
            left: isMobile ? "14px" : "30px",
            width: isMobile ? "50px" : "80px",
            height: isMobile ? "50px" :"80px",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />
      )}

      {visible && (
        <div                                           //  Div contenedor del chatbot
          ref={dragRef}
          style={{
            position: "fixed",
            top: position.y,
            left: position.x,
              
            width: "250px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            padding: "1px",
            zIndex: 9999,
          }}
        >
          <div
            onMouseDown={startDrag}
            style={{
              cursor: "move",
              backgroundColor: "#12e2ef",
              color: "#fff",
              padding: "8px",
              borderRadius: "6px 6px 0 0",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            <img src="/images/chat2.png" alt="Cerrar chat" style={{ width: "80px", height: "80px", marginTop: "-40px" , marginRight: "10px"}} />
            <button
              onClick={() => setVisible(false)}
              style={{
                float: "right",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              <img src="/images/x.png" alt="Cerrar chat" style={{ width: "30px", height: "30px", marginTop: "-18px" , marginRight: "0px"}} />
            </button>
          </div>

          <div style={{ maxHeight: "150px", 
          width: "100%",
          overflowY: "auto",
           marginBottom: "10px" ,
            flexDirection: "column",
            gap: "6px",}}>
            {messages.map((msg, i) => (
              <div key={i} >
                <p style={{
  backgroundColor: msg.sender === "user" ? "#e0f7fa" : "#f1f1f1",
  padding: "10px",
  borderRadius: "6px",
  margin: "4px 0",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left",
  wordBreak: "break-word",
}}>
  {msg.text}
</p>

<div ref={endRef} />

              </div>

            

            ))}
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta..."
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />


          {/*<button
            onClick={handleSend}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#12e2ef",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Enviar
          </button>  */}


        </div>
      )}
    </>
  );
}
