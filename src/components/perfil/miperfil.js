import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ACTUALIZAR_USUARIO_MUTATION } from '../../utils/mutations';
import { AuthContext } from '../../context/AuthContext';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import './miperfil.css';  // Asegúrate de crear este archivo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function MiPerfil() {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
  });
  const [actualizarUsuario, { loading, error }] = useMutation(ACTUALIZAR_USUARIO_MUTATION);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        correo: user.correo || '',
        contrasena: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // ...
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarUsuario({
        variables: {
          id: user.id,
          input: formData
        }
      });
      alert('Perfil actualizado con éxito');
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error al actualizar el perfil', error);
    }
  };
  

  return (
    <Container className="d-flex align-items-center justify-content-center perfil-container">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="perfil-card">
            <Card.Body>
              <h1 className="text-center mb-4 perfil-title">Mi Perfil</h1>
              <div className="datos-actuales mb-4">
                <h3>Datos Actuales:</h3>
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Apellido:</strong> {user.apellido}</p>
                <p><strong>Correo:</strong> {user.correo}</p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" block disabled={loading} className="perfil-button">
                  {loading ? (
                    <FontAwesomeIcon icon={faCircleNotch} spin size="lg" />
                  ) : (
                    'Actualizar'
                  )}
                </Button>
                {error && <Alert variant="danger" className="mt-3">Error al actualizar el perfil</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MiPerfil;
