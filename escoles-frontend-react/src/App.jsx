import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Student from './views/Student';
import CreateStudent from './views/CreateStudent';
import './styles/Style.css';
// Importa más vistas si las vas creando

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<Student />} />
      <Route path="/createStudent" element={<CreateStudent />} />
      {/* Añade aquí más rutas según crees vistas */}
    </Routes>
  );
}
