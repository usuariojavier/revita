// src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebaseConfig';
import { ref, push, set, onValue, remove } from 'firebase/database';
import OrderDetailModal from '../components/OrderDetailModal'; // <--- ¡NUEVA IMPORTACIÓN!

export default function AdminDashboard() {

   console.log("AdminDashboard: Componente renderizado."); // Mantenemos el log para depuración

  const { currentUser } = useAuth();

  // Estados para el formulario de añadir producto
  const [newProduct, setNewProduct] = useState({
    nombre: '', name: '', category: '', genero: '', categoria: '',
    subcategoria: '', price: '', image: '', size: '', brand: '',
    stock: '', description: ''
  });
  const [message, setMessage] = useState(''); // Para mostrar mensajes al usuario
  const [loading, setLoading] = useState(false); // Para el estado de carga del formulario


  // ***** NUEVO ESTADO: Producto actualmente en edición *****
  const [editingProduct, setEditingProduct] = useState(null); // Almacena el producto si estamos editando



  // ***** NUEVOS ESTADOS PARA LA LISTA DE PRODUCTOS *****
  const [products, setProducts] = useState([]); // Para almacenar la lista de productos
  const [productsListLoading, setProductsListLoading] = useState(true); // Para el estado de carga de la lista

  // ***** NUEVOS ESTADOS PARA LA LISTA DE PEDIDOS *****
  const [orders, setOrders] = useState([]); // Para almacenar la lista de pedidos
  const [ordersLoading, setOrdersLoading] = useState(true); // Para el estado de carga de los pedidos

  // ***** NUEVOS ESTADOS PARA EL MODAL DE DETALLES DEL PEDIDO *****
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ***** FUNCIÓN CENTRAL DE ENVÍO: Ahora maneja Añadir y Editar *****
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!newProduct.nombre || !newProduct.price || !newProduct.category || !newProduct.image || !newProduct.stock) {
      setMessage('Por favor, rellena los campos obligatorios: Nombre, Precio, Categoría, Imagen y Stock.');
      setLoading(false);
      return;
    }

    try {
      const productToSave = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10),
      };

      if (editingProduct) {
        // MODO EDICIÓN: Actualizar un producto existente
        console.log(`AdminDashboard: Actualizando producto con ID: ${editingProduct.id}`);
        const productRef = ref(database, `productos/${editingProduct.id}`);
        await set(productRef, productToSave); // 'set' reemplaza los datos en esa referencia
        setMessage('¡Producto actualizado con éxito!');
        setEditingProduct(null); // Sale del modo edición
      } else {
        // MODO AÑADIR: Añadir un nuevo producto
        console.log("AdminDashboard: Añadiendo nuevo producto.");
        const productsRef = ref(database, 'productos');
        const newProductRef = push(productsRef); // Genera una nueva clave única
        await set(newProductRef, productToSave);
        setMessage('¡Producto añadido con éxito!');
      }

      // Resetear el formulario después de añadir/editar
      setNewProduct({
        nombre: '', name: '', category: '', genero: '', categoria: '',
        subcategoria: '', price: '', image: '', size: '', brand: '',
        stock: '', description: ''
      });

    } catch (error) {
      console.error("Error al guardar producto:", error);
      setMessage(`Error al guardar producto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


    // ***** useEffect para cargar y mantener actualizada la lista de productos *****
  useEffect(() => {
    setProductsListLoading(true);
    const productsRef = ref(database, 'productos');

    const unsubscribeProducts = onValue(productsRef, (snapshot) => {
      console.log("AdminDashboard: onValue callback - datos recibidos para lista de productos.");
      const data = snapshot.val();
      const productsArray = [];
      if (data) {
        for (let key in data) {
          const productData = data[key];
          const { id, ...restOfProductData } = productData;
          productsArray.push({ id: key, ...restOfProductData });
        }
      }
      setProducts(productsArray);
      setProductsListLoading(false);
    }, (error) => {
      console.error("AdminDashboard: Error al cargar la lista de productos:", error);
      setProductsListLoading(false);
      setMessage("Error al cargar productos para la lista. Revisa la consola.");
    });

    return () => unsubscribeProducts();
  }, []);


  // ***** useEffect para cargar y mantener actualizada la lista de PEDIDOS *****
  useEffect(() => {
    setOrdersLoading(true);
    const ordersRef = ref(database, 'orders');

    const unsubscribeOrders = onValue(ordersRef, (snapshot) => {
      console.log("AdminDashboard: onValue callback - datos recibidos para lista de pedidos.");
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
      setOrders(ordersArray);
      setOrdersLoading(false);
    }, (error) => {
      console.error("AdminDashboard: Error al cargar la lista de pedidos:", error);
      setOrdersLoading(false);
      setMessage("Error al cargar pedidos. Revisa la consola.");
    });

    return () => unsubscribeOrders();
  }, []);


  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        console.log(`AdminDashboard: Intentando eliminar producto con ID: ${productId}`);
        const productRef = ref(database, `productos/${productId}`);
        await remove(productRef);
        setMessage('Producto eliminado con éxito.');
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        setMessage(`Error al eliminar producto: ${error.message}`);
      }
    }
  };


  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProduct({
      nombre: product.nombre || '', name: product.name || '', category: product.category || '',
      genero: product.genero || '', categoria: product.categoria || '', subcategoria: product.subcategoria || '',
      price: product.price ? product.price.toString() : '', image: product.image || '',
      size: product.size || '', brand: product.brand || '',
      stock: product.stock ? product.stock.toString() : '', description: product.description || ''
    });
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({
      nombre: '', name: '', category: '', genero: '', categoria: '',
      subcategoria: '', price: '', image: '', size: '', brand: '',
      stock: '', description: ''
    });
    setMessage('');
  };

  const handleChangeOrderStatus = async (orderId, newStatus) => {
    try {
      console.log(`AdminDashboard: Cambiando estado del pedido ${orderId} a ${newStatus}`);
      const orderRef = ref(database, `orders/${orderId}/status`);
      await set(orderRef, newStatus);
      setMessage(`Estado del pedido ${orderId} actualizado a "${newStatus}" con éxito.`);
    } catch (error) {
      console.error("Error al cambiar el estado del pedido:", error);
      setMessage(`Error al cambiar el estado del pedido: ${error.message}`);
    }
  };

  // ***** NUEVAS FUNCIONES PARA EL MODAL DE DETALLES DEL PEDIDO *****
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowOrderDetailModal(false);
    setSelectedOrder(null);
  };


  const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];


  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1>PANEL DE ADMINISTRACIÓN</h1>
      {currentUser && (
        <p>Bienvenida, {currentUser.displayName || currentUser.email}</p>
      )}
      <p>Aquí podrás gestionar los productos y pedidos de la tienda.</p>

      {/* Sección para añadir/editar producto */}
      <h2>{editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre del Producto (Español):
          <input type="text" name="nombre" value={newProduct.nombre} onChange={handleChange} style={styles.input} required disabled={loading} />
        </label>
        <label style={styles.label}>
          Nombre (en ingles, para i18n, ej. 'tshirtWoman'):
          <input type="text" name="name" value={newProduct.name} onChange={handleChange} style={styles.input} disabled={loading} />
        </label>
        <label style={styles.label}>
          Género (ej. 'mujer', 'hombre', 'niño', 'niña'):
          <input type="text" name="genero" value={newProduct.genero} onChange={handleChange} style={styles.input} disabled={loading} />
        </label>
        <label style={styles.label}>
          Categoría Principal (ej. 'ropa', 'calzado', 'complementos'):
          <input type="text" name="categoria" value={newProduct.categoria} onChange={handleChange} style={styles.input} disabled={loading} />
        </label>
        <label style={styles.label}>
          Subcategoría (ej. 'camisetas', 'zapatillas', 'chaquetas'):
          <input type="text" name="subcategoria" value={newProduct.subcategoria} onChange={handleChange} style={styles.input} disabled={loading} />
        </label>
        <label style={styles.label}>
          Categoría Corta (ej. 'mujer', 'hombre', 'niño', 'niña'):
          <input type="text" name="category" value={newProduct.category} onChange={handleChange} style={styles.input} required disabled={loading} />
        </label>
        <label style={styles.label}>
          Precio (€):
          <input type="number" step="0.01" name="price" value={newProduct.price} onChange={handleChange} style={styles.input} required disabled={loading} />
        </label>
        <label style={styles.label}>
          Nombre de Archivo de Imagen (ej. 'mi-imagen.jpg'):
          <input type="text" name="image" value={newProduct.image} onChange={handleChange} style={styles.input} required disabled={loading} />
          <small style={styles.smallText}>La imagen de momento debe estar en 'public/images/' del proyecto.</small>
        </label>
        <label style={styles.label}>
          Talla (ej. 'S', 'M', 'L'):
          <input type="text" name="size" value={newProduct.size} onChange={handleChange} style={styles.input} disabled={loading} />
        </label>
        <label style={styles.label}>
          Marca (ej. 'Nike', 'Adidas'):
          <input type="text" name="brand" value={newProduct.brand} onChange={handleChange} style={styles.input} disabled={loading} />
        </label>
        <label style={styles.label}>
          Stock:
          <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} style={styles.input} required disabled={loading} />
        </label>
        <label style={styles.label}>
          Descripción:
          <textarea name="description" value={newProduct.description} onChange={handleChange} style={styles.textarea} disabled={loading} rows="3"></textarea>
        </label>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Guardando...' : editingProduct ? 'Guardar Cambios' : 'Añadir Producto'}
          </button>
          {editingProduct && (
            <button type="button" onClick={handleCancelEdit} style={{ ...styles.button, backgroundColor: '#6c757d' }} disabled={loading}>
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      {message && (
        <p style={{ ...styles.message, color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}

      {/* Sección de listado de productos */}
      <h2 style={{ marginTop: '40px' }}>Lista de Productos Existentes</h2>
      {productsListLoading ? (
        <p>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p>No hay productos en la base de datos.</p>
      ) : (
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>ID</th>
              <th style={tableStyles.th}>Imagen</th>
              <th style={tableStyles.th}>Nombre</th>
              <th style={tableStyles.th}>Precio</th>
              <th style={tableStyles.th}>Stock</th>
              <th style={tableStyles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={tableStyles.td}>{product.id}</td>
                <td style={tableStyles.td}>
                  {product.image && (
                    <img
                      src={`/images/${product.image}`}
                      alt={product.nombre || product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.jpg"; }}
                    />
                  )}
                </td>
                <td style={tableStyles.td}>{product.nombre || product.name}</td>
                <td style={tableStyles.td}>{product.price} €</td>
                <td style={tableStyles.td}>{product.stock}</td>
                <td style={tableStyles.td}>
                  <button
                    onClick={() => handleEditClick(product)}
                    style={{...tableStyles.actionButton, backgroundColor: '#007bff'}}
                    disabled={loading}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    style={{...tableStyles.actionButton, backgroundColor: '#dc3545'}}
                    disabled={loading}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ***** SECCIÓN DE LISTADO DE PEDIDOS ***** */}
      <h2 style={{ marginTop: '40px' }}>Lista de Pedidos</h2>
      {ordersLoading ? (
        <p>Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>ID Pedido</th>
              <th style={tableStyles.th}>Fecha</th>
              <th style={tableStyles.th}>Usuario</th>
              <th style={tableStyles.th}>Items</th>
              <th style={tableStyles.th}>Total</th>
              <th style={tableStyles.th}>Estado</th>
              <th style={tableStyles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td style={tableStyles.td}>{order.orderId}</td>
                <td style={tableStyles.td}>
                  {order.timestamp ? new Date(order.timestamp).toLocaleString() : 'N/A'}
                </td>
                <td style={tableStyles.td}>{order.userEmail}</td>
                <td style={tableStyles.td}>
                  <ul>
                    {order.items && order.items.map((item, idx) => (
                      <li key={idx} style={{fontSize: '0.85em'}}>
                        {item.name} (x{item.quantity}) - {item.price}€
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={tableStyles.td}>{order.total} €</td>
                <td style={tableStyles.td}>
                  {/* Selector de estado */}
                  <select
                    value={order.status}
                    onChange={(e) => handleChangeOrderStatus(order.orderId, e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      backgroundColor: '#f8f8f8',
                      cursor: 'pointer',
                    }}
                  >
                    {orderStatuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={tableStyles.td}>
                  {/* Botón para ver más detalles del pedido */}
                  <button
                    onClick={() => handleViewDetails(order)} // <--- ¡AQUÍ SE LLAMA A LA NUEVA FUNCIÓN!
                    style={{...tableStyles.actionButton, backgroundColor: '#28a745'}}
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ***** MODAL DE DETALLES DEL PEDIDO ***** */}
      {showOrderDetailModal && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
}

// ... (Estilos formAndOtherStyles y tableStyles, y la fusión final de styles) ...
const formAndOtherStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '25px',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'vertical',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#12e2ef',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.2s',
  },
  message: {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#e6ffe6', // Verde claro por defecto
    border: '1px solid #ccebcc',
    textAlign: 'center',
  },
  smallText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px',
  }
};

const tableStyles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    verticalAlign: 'middle',
  },
  actionButton: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    marginRight: '5px',
    fontSize: '12px',
  }
};

const styles = { ...formAndOtherStyles, ...tableStyles };



