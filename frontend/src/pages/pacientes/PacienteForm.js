import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PacienteService from '../../services/pacienteService';

const formInicial = {
  nome: '',
  cpf: '',
  dataNascimento: '',
  telefone: '',
  email: '',
  convenio: '',
};

function PacienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState(formInicial);
  const [carregando, setCarregando] = useState(editando);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!editando) return;

    const carregarPaciente = async () => {
      try {
        const response = await PacienteService.buscarPorId(id);
        setForm(response.data);
      } catch (error) {
        setErro('Paciente não encontrado.');
      } finally {
        setCarregando(false);
      }
    };

    carregarPaciente();
  }, [id, editando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro('');

    try {
      if (editando) {
        await PacienteService.atualizar(id, form);
      } else {
        await PacienteService.cadastrar(form);
      }
      navigate('/pacientes');
    } catch (error) {
      const mensagem = error.response?.data?.erro || 'Erro ao salvar paciente.';
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
        <h2>{editando ? 'Editar Paciente' : 'Novo Paciente'}</h2>
        <Link to="/pacientes" className="btn btn-outline">Voltar</Link>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome *</label>
          <input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF *</label>
          <input id="cpf" name="cpf" value={form.cpf} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento *</label>
          <input
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="convenio">Convênio</label>
          <input id="convenio" name="convenio" value={form.convenio} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
          <Link to="/pacientes" className="btn btn-outline">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default PacienteForm;
