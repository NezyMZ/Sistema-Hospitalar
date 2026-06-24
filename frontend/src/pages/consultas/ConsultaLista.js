import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConsultaService from '../../services/consultaService';

function formatarDataHora(dataHora) {
  if (!dataHora) return '';
  const data = new Date(dataHora);
  return data.toLocaleString('pt-BR');
}

function ConsultaLista() {
  const [consultas, setConsultas] = useState([]);
  const [buscaData, setBuscaData] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarConsultas = async (data) => {
    setCarregando(true);
    setErro('');
    try {
      const response = data
        ? await ConsultaService.buscarPorData(data)
        : await ConsultaService.listarTodos();
      setConsultas(response.data);
    } catch (error) {
      setErro('Erro ao carregar consultas. Verifique se o backend está rodando.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarConsultas('');
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    carregarConsultas(buscaData);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja excluir esta consulta?')) {
      return;
    }
    try {
      await ConsultaService.excluir(id);
      carregarConsultas(buscaData);
    } catch (error) {
      alert('Erro ao excluir consulta.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Consultas</h2>
        <Link to="/consultas/nova" className="btn btn-primary">
          Nova Consulta
        </Link>
      </div>

      <form className="search-form" onSubmit={handleBuscar}>
        <input
          type="date"
          value={buscaData}
          onChange={(e) => setBuscaData(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary">Buscar</button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setBuscaData('');
            carregarConsultas('');
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
              <th>Paciente</th>
              <th>Médico</th>
              <th>Data/Hora</th>
              <th>Status</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {consultas.length === 0 ? (
              <tr>
                <td colSpan="6" className="vazio">Nenhuma consulta encontrada.</td>
              </tr>
            ) : (
              consultas.map((consulta) => (
                <tr key={consulta.id}>
                  <td>{consulta.paciente?.nome}</td>
                  <td>{consulta.medico?.nome}</td>
                  <td>{formatarDataHora(consulta.dataHora)}</td>
                  <td>
                    <span className={`status status-${consulta.status?.toLowerCase()}`}>
                      {consulta.status}
                    </span>
                  </td>
                  <td>{consulta.observacoes}</td>
                  <td className="acoes">
                    <Link to={`/consultas/editar/${consulta.id}`} className="btn btn-sm btn-edit">
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleExcluir(consulta.id)}
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

export default ConsultaLista;
