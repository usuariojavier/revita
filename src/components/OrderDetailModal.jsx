// src/components/OrderDetailModal.jsx

import React from 'react';

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null; // No renderizar si no hay un pedido

  const formattedDate = order.timestamp ? new Date(order.timestamp).toLocaleString() : 'N/A';

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2 style={modalStyles.title}>Detalles del Pedido #{order.orderId}</h2>
        <button onClick={onClose} style={modalStyles.closeButton}>X</button>

        <div style={modalStyles.section}>
          <h3 style={modalStyles.sectionTitle}>Información del Pedido</h3>
          <p><strong>Fecha:</strong> {formattedDate}</p>
          <p><strong>Usuario:</strong> {order.userEmail}</p>
          <p><strong>Total:</strong> {order.total} €</p>
          <p><strong>Estado:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
        </div>

        <div style={modalStyles.section}>
          <h3 style={modalStyles.sectionTitle}>Items del Pedido</h3>
          <ul style={modalStyles.itemList}>
            {order.items && order.items.map((item, idx) => (
              <li key={idx} style={modalStyles.item}>
                {item.name} (x{item.quantity}) - {item.price}€
              </li>
            ))}
          </ul>
        </div>

        <div style={modalStyles.section}>
          <h3 style={modalStyles.sectionTitle}>Información de Envío</h3>
          <p><strong>Nombre:</strong> {order.shippingInfo?.name}</p>
          <p><strong>Dirección:</strong> {order.shippingInfo?.address}</p>
          <p><strong>Ciudad:</strong> {order.shippingInfo?.city}</p>
          <p><strong>Código Postal:</strong> {order.shippingInfo?.postalCode}</p>
          <p><strong>País:</strong> {order.shippingInfo?.country}</p>
        </div>

        {/* Aquí puedes añadir más detalles si los guardas en el pedido, como info de pago, notas, etc. */}
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000, // Alto zIndex para que esté por encima de todo
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
    color: '#333',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  section: {
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  sectionTitle: {
    fontSize: '1.2em',
    color: '#555',
    marginBottom: '10px',
  },
  itemList: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    marginBottom: '5px',
    fontSize: '0.95em',
    color: '#666',
  },
};
