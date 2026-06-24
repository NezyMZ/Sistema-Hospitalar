import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ConsultaForm from './pages/consultas/ConsultaForm';
import ConsultaLista from './pages/consultas/ConsultaLista';
import MedicoForm from './pages/medicos/MedicoForm';
import MedicoLista from './pages/medicos/MedicoLista';
import PacienteForm from './pages/pacientes/PacienteForm';
import PacienteLista from './pages/pacientes/PacienteLista';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="conteudo">
          <Routes>
            <Route path="/" element={<Navigate to="/pacientes" replace />} />
            <Route path="/pacientes" element={<PacienteLista />} />
            <Route path="/pacientes/novo" element={<PacienteForm />} />
            <Route path="/pacientes/editar/:id" element={<PacienteForm />} />
            <Route path="/medicos" element={<MedicoLista />} />
            <Route path="/medicos/novo" element={<MedicoForm />} />
            <Route path="/medicos/editar/:id" element={<MedicoForm />} />
            <Route path="/consultas" element={<ConsultaLista />} />
            <Route path="/consultas/nova" element={<ConsultaForm />} />
            <Route path="/consultas/editar/:id" element={<ConsultaForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
