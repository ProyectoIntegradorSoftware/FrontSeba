import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Make sure to create this context provider

function Navigation() {
  const { user, handleLogout } = useAuth(); // Dummy authentication context

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>ECOMERCE SSB</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/trabajos">
              <Nav.Link>Tienda de Zapatillas Personalizada</Nav.Link>
            </LinkContainer>
            {user ? (
              <>
                <LinkContainer to="/postulaciones">
                  <Nav.Link>Mi Carrito</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/perfil">
                  <Nav.Link>Mi perfil</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/crear-trabajo">
                  <Nav.Link>Crear Producto</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/carrito">
                  <Nav.Link>Carrito</Nav.Link>
                </LinkContainer>
              
                <LinkContainer to="/register">
                  <Nav.Link>Registrarse</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Iniciar sesión</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/crear-trabajo">
                  <Nav.Link>Crear producto</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
