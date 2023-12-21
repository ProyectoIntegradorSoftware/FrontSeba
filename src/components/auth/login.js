import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Container, Row, Col, Form, Button, Spinner, Card } from 'react-bootstrap';
import './login.css';  // Asegúrate de crear este archivo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { handleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleLogin({ correo, contrasena });
      setTimeout(() => {
        navigate('/trabajos');
      }, 2000);
    } catch (err) {
      console.error("Error en inicio de sesión:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center login-container">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="login-card">
            <Card.Body>
              <h1 className="text-center mb-4 login-title">Iniciar Sesión</h1>
              <Form onSubmit={handleSubmit}>
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
                <Button variant="primary" type="submit" block disabled={loading} className="login-button">
                  {loading ? (
                      <FontAwesomeIcon icon={faCircleNotch} spin size="lg" />

                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
