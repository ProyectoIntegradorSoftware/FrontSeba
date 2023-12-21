import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { GET_POSTULACIONES } from "../../utils/queries";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import "./postulaciones.css";
import { ELIMINAR_POSTULACION_MUTATION } from "../../utils/mutations";

function Postulaciones() {
  const { setUser } = useAuth();
  const userID = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const { loading, error, data } = useQuery(GET_POSTULACIONES, {
    variables: { userID: userID },
    fetchPolicy: "cache-and-network" // Esto garantiza que siempre obtengas los datos más recientes
  });

  const [eliminarPostulacion] = useMutation(ELIMINAR_POSTULACION_MUTATION, {
    update(cache, { data: { eliminarPostulacion } }) {
      cache.modify({
        fields: {
          usuario(existingUserData = {}, { readField }) {
            if (!existingUserData.postulaciones) {
              return existingUserData; // Si no hay postulaciones, simplemente devuelve los datos existentes
            }
            const newPostulaciones = existingUserData.postulaciones.filter(
              (postulacionRef) => readField("id", postulacionRef) !== eliminarPostulacion.id
            );
            return { ...existingUserData, postulaciones: newPostulaciones };
          },
        },
      });
    },
    refetchQueries: [{ query: GET_POSTULACIONES, variables: { userID } }]
  });
  

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <p>Error al cargar las postulaciones: {error.message}</p>;

  const postulaciones = data?.usuario?.postulaciones || [];

  return (
    <Container>
      <h1 className="text-center my-4">Mis Postulaciones</h1>
      {postulaciones.length > 0 ? (
        <Row>
          {postulaciones.map((postulacion) => (
            <Col xs={12} key={postulacion.id} className="mb-4">
              <Card className="postulacion-card">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title className="mb-0">{postulacion.trabajo?.titulo || 'Título no disponible'}</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Salario: {postulacion.trabajo?.salario ? `$${postulacion.trabajo.salario}` : 'No disponible'}
                    </Card.Subtitle>
                  </div>
                  <small className="text-muted">{new Date(postulacion.fecha).toLocaleDateString()}</small>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {postulacion.trabajo?.descripcion || 'No disponible'}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-right">
                  <Button variant="danger" onClick={() => eliminarPostulacion({ variables: { id: postulacion.id } })}>
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No tienes postulaciones activas.</p>
      )}
    </Container>
  );
}

export default Postulaciones;
