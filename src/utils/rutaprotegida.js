import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importa tu contexto de autenticación

const RutaPrivada = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext); // Asumiendo que `user` es `null` cuando no esté autenticado

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
export default RutaPrivada;
