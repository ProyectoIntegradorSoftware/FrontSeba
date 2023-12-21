import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREAR_PRODUCTO } from '../../utils/mutations'; // Importa la nueva mutación para crear productos
import { LIST_PRODUCT } from '../../utils/queries'; // Importa la consulta para obtener la lista de productos
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function CrearProducto() {
  const [crearProducto] = useMutation(CREAR_PRODUCTO, {
    refetchQueries: [{ query: LIST_PRODUCT }],
    onCompleted: () => alert('Producto creado con éxito!'),
    onError: (error) => alert(`Error al crear producto: ${error.message}`)
  });

  const [formData, setFormData] = useState({
    nombre: '',
    sku: '',
    precio: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearProducto({
        variables: { input: { ...formData } }
      });
      setFormData({ nombre: '', sku: '', precio: '', descripcion: '' });
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };
  

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Crear Nuevo Producto</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombre" className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="sku" className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="precio" className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="descripcion" className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Crear Producto
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CrearProducto;
