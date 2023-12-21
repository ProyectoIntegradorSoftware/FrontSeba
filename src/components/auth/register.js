import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './register.css';  // Asegúrate de crear este archivo

function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { handleRegister } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({ nombre, apellido, correo, contrasena });
      navigate('/login');
    } catch (err) {
      console.error("Error en registro:", err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center register-container">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="register-card">
            <Card.Body>
              <h1 className="text-center mb-4 register-title">Registro</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Correo:</Form.Label>
                  <Form.Control
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" block className="register-button">
                  Registrarse
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
