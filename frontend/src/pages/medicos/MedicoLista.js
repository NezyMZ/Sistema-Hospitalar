import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MedicoService from '../../services/medicoService';

function MedicoLista() {
  const [medicos, setMedicos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarMedicos = async (nome) => {
    setCarregando(true);
    setErro('');
    try {
      const response = nome
        ? await MedicoService.buscarPorNome(nome)
        : await MedicoService.listarTodos();
      setMedicos(response.data);
    } catch (error) {
      setErro('Erro ao carregar médicos. Verifique se o backend está rodando.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarMedicos('');
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    carregarMedicos(busca);
  };

  const handleExcluir = async (id, nome) => {
    if (!window.confirm(`Deseja excluir o médico "${nome}"?`)) {
      return;
    }
    try {
      await MedicoService.excluir(id);
      carregarMedicos(busca);
    } catch (error) {
      alert('Erro ao excluir médico.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Médicos</h2>
        <Link to="/medicos/novo" className="btn btn-primary">
          Novo Médico
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
            carregarMedicos('');
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
              <th>CRM</th>
              <th>Especialidade</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicos.length === 0 ? (
              <tr>
                <td colSpan="6" className="vazio">Nenhum médico encontrado.</td>
              </tr>
            ) : (
              medicos.map((medico) => (
                <tr key={medico.id}>
                  <td>{medico.nome}</td>
                  <td>{medico.crm}</td>
                  <td>{medico.especialidade}</td>
                  <td>{medico.telefone}</td>
                  <td>{medico.email}</td>
                  <td className="acoes">
                    <Link to={`/medicos/editar/${medico.id}`} className="btn btn-sm btn-edit">
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleExcluir(medico.id, medico.nome)}
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

export default MedicoLista;
