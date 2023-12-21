import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@apollo/client';
import { LIST_PRODUCT } from '../../utils/queries';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import kakashiImage from '../../images/Zapatilla_Kakashi.jpeg';
import narutoImage from '../../images/Zapatilla_Naruto.jpeg';
import gaaraImage from '../../images/Zapatilla_Gaara.jpeg';

function Bienvenida() {
  const { user, setUser, handleLogout } = useAuth();
  const [cart, setCart] = useState({ totalProducts: 0, totalPrice: 0, products: [] });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const { loading, error, data } = useQuery(LIST_PRODUCT);

  if (loading) return <p>Cargando productos...</p>;
  if (error) {
    console.error('Error al cargar los productos:', error);
    return <p>Error al cargar los productos. Consulta la consola para más detalles.</p>;
  }

  const productos = data?.listProducts || [];

  // Objeto que asocia SKU con imágenes
  const skuToImage = {
    '223456789xyz': kakashiImage,
    '233456789xyz': narutoImage,
    '243456789xyz': gaaraImage,
  };

  const addToCart = (producto) => {
    setCart((prevCart) => ({
      totalProducts: prevCart.totalProducts + 1,
      totalPrice: prevCart.totalPrice + Number(producto.precio),
      products: [...prevCart.products, producto],
    }));
  };

  const handleCompra = () => {
    // Aquí puedes agregar lógica para procesar la compra
    // Por ejemplo, enviar la orden al servidor, actualizar el inventario, etc.
    alert('Compra realizada con éxito');
    // Puedes reiniciar el carrito después de realizar la compra
    setCart({ totalProducts: 0, totalPrice: 0, products: [] });
  };

  return (
    <Container>
      <h1 className="text-center mt-4">Bienvenido, {user ? user.nombre : 'Invitado'}</h1>
      {user && (
        <Button variant="danger" onClick={handleLogout} className="mx-auto d-block mt-2">
          Cerrar Sesión
        </Button>
      )}

      <h2 className="text-center mt-4">Productos Disponibles</h2>
      <Row>
        {productos.map((producto) => (
          <Col key={producto.sku} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={skuToImage[producto.sku]} alt={producto.nombre} />
              <Card.Body>
                <Card.Title className="text-center">{producto.nombre}</Card.Title>
                <Card.Text className="text-center">
                  <strong>SKU:</strong> {producto.sku}
                </Card.Text>
                <Card.Text className="text-center">
                  <strong>Precio:</strong> {producto.precio}
                </Card.Text>
                <Card.Text className="text-center">
                  <strong>Descripción:</strong> {producto.descripcion}
                </Card.Text>
                <Button variant="primary" className="mx-auto d-block" onClick={() => addToCart(producto)}>
                  Añadir al Carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {productos.length === 0 && <p className="text-center">No hay productos disponibles.</p>}

      {/* Caja del carrito */}
      <div className="text-center mt-4 border p-3">
        <h3>Carrito</h3>
        <p>Número de productos: {cart.totalProducts}</p>
        <p>Total Precio: ${cart.totalPrice.toFixed(2)}</p>
        <ul className="list-unstyled">
          {cart.products.map((producto) => (
            <li key={producto.sku}>
              <strong>{producto.nombre}</strong> - {producto.descripcion}
            </li>
          ))}
        </ul>
        <Button variant="success" onClick={handleCompra}>
          Comprar
        </Button>
      </div>
    </Container>
  );
}

export default Bienvenida;
