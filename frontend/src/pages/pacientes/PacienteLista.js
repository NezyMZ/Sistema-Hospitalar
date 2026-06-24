import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PacienteService from '../../services/pacienteService';

function PacienteLista() {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarPacientes = async (nome) => {
    setCarregando(true);
    setErro('');
    try {
      const response = nome
        ? await PacienteService.buscarPorNome(nome)
        : await PacienteService.listarTodos();
      setPacientes(response.data);
    } catch (error) {
      setErro('Erro ao carregar pacientes. Verifique se o backend está rodando.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPacientes('');
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    carregarPacientes(busca);
  };

  const handleExcluir = async (id, nome) => {
    if (!window.confirm(`Deseja excluir o paciente "${nome}"?`)) {
      return;
    }
    try {
      await PacienteService.excluir(id);
      carregarPacientes(busca);
    } catch (error) {
      alert('Erro ao excluir paciente.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Pacientes</h2>
        <Link to="/pacientes/novo" className="btn btn-primary">
          Novo Paciente
        </Link>
      </div>

      <form className="search-form" onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary">Buscar</button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setBusca('');
            carregarPacientes('');
          }}
        >
          Limpar
        </button>
      </form>

      {erro && <p className="erro">{erro}</p>}
      {carregando ? (
        <p className="info">Carregando...</p>
      ) : (
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data Nasc.</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Convênio</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.length === 0 ? (
              <tr>
                <td colSpan="7" className="vazio">Nenhum paciente encontrado.</td>
              </tr>
            ) : (
              pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.nome}</td>
                  <td>{paciente.cpf}</td>
                  <td>{paciente.dataNascimento}</td>
                  <td>{paciente.telefone}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.convenio}</td>
                  <td className="acoes">
                    <Link to={`/pacientes/editar/${paciente.id}`} className="btn btn-sm btn-edit">
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleExcluir(paciente.id, paciente.nome)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PacienteLista;
