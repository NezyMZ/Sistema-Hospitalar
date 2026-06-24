import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ConsultaService from '../../services/consultaService';
import MedicoService from '../../services/medicoService';
import PacienteService from '../../services/pacienteService';

const formInicial = {
  pacienteId: '',
  medicoId: '',
  dataHora: '',
  status: 'AGENDADA',
  observacoes: '',
};

function paraInputDatetimeLocal(dataHora) {
  if (!dataHora) return '';
  return dataHora.substring(0, 16);
}

function ConsultaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState(formInicial);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resPacientes, resMedicos] = await Promise.all([
          PacienteService.listarTodos(),
          MedicoService.listarTodos(),
        ]);
        setPacientes(resPacientes.data);
        setMedicos(resMedicos.data);

        if (editando) {
          const resConsulta = await ConsultaService.buscarPorId(id);
          const consulta = resConsulta.data;
          setForm({
            pacienteId: String(consulta.paciente.id),
            medicoId: String(consulta.medico.id),
            dataHora: paraInputDatetimeLocal(consulta.dataHora),
            status: consulta.status,
            observacoes: consulta.observacoes || '',
          });
        }
      } catch (error) {
        setErro('Erro ao carregar dados da consulta.');
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [id, editando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro('');

    const payload = {
      paciente: { id: Number(form.pacienteId) },
      medico: { id: Number(form.medicoId) },
      dataHora: form.dataHora.length === 16 ? `${form.dataHora}:00` : form.dataHora,
      status: form.status,
      observacoes: form.observacoes,
    };

    try {
      if (editando) {
        await ConsultaService.atualizar(id, payload);
      } else {
        await ConsultaService.cadastrar(payload);
      }
      navigate('/consultas');
    } catch (error) {
      const mensagem = error.response?.data?.erro || 'Erro ao salvar consulta.';
      setErro(mensagem);
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return <p className="info">Carregando...</p>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>{editando ? 'Editar Consulta' : 'Nova Consulta'}</h2>
        <Link to="/consultas" className="btn btn-outline">Voltar</Link>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pacienteId">Paciente *</label>
          <select
            id="pacienteId"
            name="pacienteId"
            value={form.pacienteId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="medicoId">Médico *</label>
          <select
            id="medicoId"
            name="medicoId"
            value={form.medicoId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nome} — {medico.especialidade}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dataHora">Data e Hora *</label>
          <input
            id="dataHora"
            name="dataHora"
            type="datetime-local"
            value={form.dataHora}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select id="status" name="status" value={form.status} onChange={handleChange} required>
            <option value="AGENDADA">Agendada</option>
            <option value="REALIZADA">Realizada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="observacoes">Observações</label>
          <textarea
            id="observacoes"
            name="observacoes"
            rows="4"
            value={form.observacoes}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
          <Link to="/consultas" className="btn btn-outline">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default ConsultaForm;
