import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_TRABAJO } from '../../utils/queries';
import { ACTUALIZAR_TRABAJO } from '../../utils/mutations';

const EditarTrabajo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    id: '',
    titulo: '',
    descripcion: '',
    salario: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const { data, loading, error } = useQuery(GET_TRABAJO, {
    variables: { id },
    onCompleted: (data) => {
      setFormState({
        id: data.obtenerTrabajo.id,
        titulo: data.obtenerTrabajo.titulo,
        descripcion: data.obtenerTrabajo.descripcion,
        salario: data.obtenerTrabajo.salario,
      });
    }
  });

  const [actualizarTrabajo, { loading: updating, error: updateError }] = useMutation(ACTUALIZAR_TRABAJO, {
    onCompleted: () => {
      alert('Trabajo actualizado con éxito');
      navigate('/trabajos'); // Reemplaza '/ruta-deseada' con la ruta a la que quieres redirigir al usuario después de la actualización
    },
    onError: (updateError) => {
      setErrorMessage(updateError.message);
    },
    refetchQueries: [{ query: GET_TRABAJO, variables: { id } }],

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarTrabajo({
        variables: {
          id,
          input: {
            titulo: formState.titulo,
            descripcion: formState.descripcion,
            salario: parseFloat(formState.salario),
          },
        },
      });
    } catch (error) {
      console.error('Error al actualizar trabajo', error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el trabajo: {error.message}</p>;

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Editar Trabajo</Card.Title>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar título"
                name="titulo"
                value={formState.titulo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar descripción"
                name="descripcion"
                value={formState.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="salario">
              <Form.Label>Salario</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresar salario"
                name="salario"
                value={formState.salario}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={updating}>
            {updating ? 'Actualizando...' : 'Actualizar Trabajo'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditarTrabajo;
