import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MedicoService from '../../services/medicoService';

const formInicial = {
  nome: '',
  crm: '',
  especialidade: '',
  telefone: '',
  email: '',
};

function MedicoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState(formInicial);
  const [carregando, setCarregando] = useState(editando);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!editando) return;

    const carregarMedico = async () => {
      try {
        const response = await MedicoService.buscarPorId(id);
        setForm(response.data);
      } catch (error) {
        setErro('Médico não encontrado.');
      } finally {
        setCarregando(false);
      }
    };

    carregarMedico();
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
        await MedicoService.atualizar(id, form);
      } else {
        await MedicoService.cadastrar(form);
      }
      navigate('/medicos');
    } catch (error) {
      const mensagem = error.response?.data?.erro || 'Erro ao salvar médico.';
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
        <h2>{editando ? 'Editar Médico' : 'Novo Médico'}</h2>
        <Link to="/medicos" className="btn btn-outline">Voltar</Link>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome *</label>
          <input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="crm">CRM *</label>
          <input id="crm" name="crm" value={form.crm} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="especialidade">Especialidade *</label>
          <input
            id="especialidade"
            name="especialidade"
            value={form.especialidade}
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
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
          <Link to="/medicos" className="btn btn-outline">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default MedicoForm;
