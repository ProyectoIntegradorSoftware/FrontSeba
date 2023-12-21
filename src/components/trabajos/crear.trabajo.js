import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREAR_TRABAJO } from '../../utils/mutations';
import { GET_TRABAJOS } from '../../utils/queries';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function CrearTrabajo() {
  const [crearTrabajo] = useMutation(CREAR_TRABAJO, {
    refetchQueries: [{ query: GET_TRABAJOS }],
    onCompleted: () => alert('Trabajo creado con éxito!'),
    onError: (error) => alert(`Error al crear trabajo: ${error.message}`)
  });

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    salario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearTrabajo({
        variables: { input: { ...formData, salario: parseFloat(formData.salario) } }
      });
      setFormData({ titulo: '', descripcion: '', salario: '' });
    } catch (error) {
      console.error('Error al crear trabajo:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Crear Nuevo Trabajo</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="titulo" className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="salario" className="mb-3">
                  <Form.Label>Salario</Form.Label>
                  <Form.Control
                    type="number"
                    name="salario"
                    value={formData.salario}
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
                  Crear Trabajo
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CrearTrabajo;
