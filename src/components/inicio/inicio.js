import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function Bienvenida() {
  const { user, setUser, token, handleLogout } = useAuth();

  useEffect(() => {
    // Cargar la información del usuario desde localStorage cuando el componente se monta
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]); // setUser se pasa como dependencia para asegurar que useEffect se ejecute solo una vez

  console.log(user); //imprimo el usuario. acá aseguramos que imprima los datos del usuario logueado
  
  return (
    <div>
      <h1>Bienvenido, {user ? user.nombre : 'Invitado'}</h1>
      {user && (
        <button onClick={handleLogout}>
          Cerrar Sesión
        </button>
      )}
    </div>
  );
}

export default Bienvenida;
