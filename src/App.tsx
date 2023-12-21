import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import TrabajosList from "./components/trabajos/trabajoslist";
import Bienvenida from "./components/inicio/inicio";
import CrearTrabajo from "./components/trabajos/crear.trabajo";
import Navigation from "./navigation/navigation";
import Postulaciones from "./components/postulaciones/postulaciones";
import EditarTrabajo from "./components/trabajos/actualizar.trabajo";
import MiPerfil from "./components/perfil/miperfil";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
      <Route path="/editar-trabajo/:id" element={<EditarTrabajo />} />
      <Route path="/crear-trabajo" element={<CrearTrabajo />} />
      <Route path="/postulaciones" element={<Postulaciones />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trabajos" element={<TrabajosList />} />
        <Route path="/" element={<Bienvenida />} />
      </Routes>
    </Router>
  );
};
export default App;
