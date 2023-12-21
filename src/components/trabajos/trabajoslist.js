import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TRABAJOS, GET_POSTULACIONES } from '../../utils/queries';
import { POSTULAR_MUTATION } from '../../utils/mutations';
import { Card, Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function TrabajosList() {
  const { user } = useContext(AuthContext);

  const { loading: loadingTrabajos, error: errorTrabajos, data: trabajosData } = useQuery(GET_TRABAJOS);
  const { loading: loadingPostulaciones, data: postulacionesData } = useQuery(GET_POSTULACIONES, {
    variables: { userID: user?.id },
    skip: !user,
  });

  const [postularAtrabajo, { loading: loadingPostulacion, error: errorPostulacion }] = useMutation(POSTULAR_MUTATION, {
    onCompleted: () => alert('Postulaci贸n enviada!'),
    onError: () => alert('Error al enviar la postulaci贸n'),
    refetchQueries: [{ query: GET_POSTULACIONES, variables: { userID: user?.id } }],
  });

  const yaPostulado = (trabajoID) => {
    console.log("Trabajo ID:", trabajoID);
    const postulaciones = postulacionesData?.usuario?.postulaciones;
    console.log("Postulaciones:", postulaciones);
  
    if (postulaciones && Array.isArray(postulaciones)) {
      const postulacion = postulaciones.find(postulacion => {
        if (!postulacion.trabajo || !postulacion.trabajo.id) {
          console.error("Postulaci贸n sin trabajo asociado o sin ID de trabajo:", postulacion);
          return false;
        }
        console.log("Comparando", String(postulacion.trabajo.id), String(trabajoID));
        return String(postulacion.trabajo.id) === String(trabajoID);
      });
  
      console.log("Postulacion encontrada:", postulacion);
      return postulacion !== undefined;
    }
  
    return false;
  };
  
  
  
  
  
  
  const handlePostular = async (trabajoID) => {
    if (!user) {
      alert('Debes iniciar sesi贸n para postularte a un trabajo.');
      return;
    }

    await postularAtrabajo({
      variables: {
        input: {
          fecha: new Date().toISOString(),
          usuarioID: user.id,
          trabajoID,
        },
      },
    });
  };

  if (loadingTrabajos || loadingPostulaciones) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (errorTrabajos) {
    return <Alert variant="danger">Error al cargar las ofertas: {errorTrabajos.message}</Alert>;
  }

  return (
    <Container>
      <h1 className="text-center my-4">Ofertas de Trabajo</h1>
      <Row>
        {trabajosData?.trabajos.map((trabajo) => (

          <Col md={4} key={trabajo.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{trabajo.titulo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Salario: ${trabajo.salario}</Card.Subtitle>
                <Card.Text>{trabajo.descripcion}</Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => handlePostular(trabajo.id)} 
                  disabled={loadingPostulacion || yaPostulado(trabajo.id)}
                >
                  {yaPostulado(trabajo.id) ? 'Ya Postulado' : (loadingPostulacion ? 'Enviando...' : 'Postularme')}
                  {console.log("KKEEKEK2",trabajo.id,"<")}
                </Button>
                
                <p>
                <Link to={`/editar-trabajo/${trabajo.id}`}>Editar</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {errorPostulacion && <Alert variant="danger">Error al postularse a la oferta</Alert>}
    </Container>
  );
}
export default TrabajosList;