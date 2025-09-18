// src/pages/MyOrders.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebaseConfig';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';

export default function MyOrders() {
  const { currentUser, loading: authLoading } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!currentUser) {
      setOrdersLoading(false);
      setMessage("Por favor, inicia sesión para ver tus pedidos.");
      return;
    }

    setOrdersLoading(true);
    setMessage("");

    const ordersRef = ref(database, 'orders');
    const userOrdersQuery = query(
      ordersRef,
      orderByChild('userId'),
      equalTo(currentUser.uid)
    );

    const unsubscribe = onValue(userOrdersQuery, (snapshot) => {
      const data = snapshot.val();
      const ordersArray = [];
      if (data) {
        for (let key in data) {
          const orderData = data[key];
          ordersArray.push({ orderId: key, ...orderData });
        }
      }
      ordersArray.sort((a, b) => {
        const tsA = typeof a.timestamp === 'object' && a.timestamp !== null ? a.timestamp.T : a.timestamp;
        const tsB = typeof b.timestamp === 'object' && b.timestamp !== null ? b.timestamp.T : b.timestamp;
        return tsB - tsA;
      });

      setUserOrders(ordersArray);
      setOrdersLoading(false);
      if (ordersArray.length === 0) {
        setMessage("No tienes pedidos registrados todavía.");
      }
    }, (error) => {
      console.error("Error al cargar los pedidos del usuario:", error);
      setOrdersLoading(false);
      setMessage("Error al cargar tus pedidos. Por favor, inténtalo de nuevo.");
    });

    return () => unsubscribe();
  }, [currentUser, authLoading]);

  if (ordersLoading) {
    return <div style={styles.container}><p>Cargando tus pedidos...</p></div>;
  }

  return (
    <div style={styles.container}>
      <h1>Mis Pedidos</h1>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green', textAlign: 'center' }}>{message}</p>}

      {!message && userOrders.length > 0 && (
        // *** CAMBIO CLAVE: Envuelve la tabla en un div con estilo para overflow ***
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID Pedido</th>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Items</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order.orderId}>
                  {/* Reduce la longitud visible del ID del pedido en pantallas pequeñas */}
                  <td style={styles.td}>{order.orderId.substring(0, 8)}...</td> {/* Muestra solo los primeros 8 caracteres */}
                  <td style={styles.td}>
                    {order.timestamp ? new Date(order.timestamp).toLocaleDateString() : 'N/A'} {/* Usa toLocaleDateString para una fecha más corta */}
                  </td>
                  <td style={styles.td}>{order.total} €</td>
                  <td style={styles.td}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </td>
                  <td style={styles.td}>
                    <ul>
                      {order.items && order.items.map((item, idx) => (
                        <li key={idx} style={{fontSize: '0.8em', lineHeight: '1.2em'}}> {/* Font size un poco más pequeño */}
                          {item.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px', // Sigue limitando el ancho en pantallas grandes
    margin: '50px auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    minHeight: '200px',
  },
  // *** NUEVO ESTILO para envolver la tabla ***
  tableWrapper: {
    overflowX: 'auto', // Permite el desplazamiento horizontal si el contenido es más ancho
    WebkitOverflowScrolling: 'touch', // Mejora el desplazamiento en dispositivos iOS
  },
  table: {
    width: '100%', // Esto asegura que la tabla intenta ser del 100%
    minWidth: '600px', // Establece un ancho mínimo para que el scroll horizontal tenga sentido
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    whiteSpace: 'nowrap', // Evita que el texto de la cabecera se envuelva
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    verticalAlign: 'top',
    whiteSpace: 'nowrap', // Evita que el texto de la celda se envuelva (se desplaza horizontalmente)
  },
};
