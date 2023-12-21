import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Logout() {
  const { handleLogout } = useAuth();

  const handleLogoutClick = async () => {
    await handleLogout();
    alert('Sesión cerrada con éxito.');
  };

  return (
    <div className="logout-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="logout-box" style={{ border: '2px solid #3498db', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <h1>Logout</h1>
        <button onClick={handleLogoutClick} className="logout-button" style={{ backgroundColor: '#3498db', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Logout;
