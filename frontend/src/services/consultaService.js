import api from '../api/api';

const ConsultaService = {
  listarTodos() {
    return api.get('/consultas');
  },

  buscarPorId(id) {
    return api.get(`/consultas/${id}`);
  },

  buscarPorData(data) {
    return api.get('/consultas/buscar', { params: { data } });
  },

  cadastrar(consulta) {
    return api.post('/consultas', consulta);
  },

  atualizar(id, consulta) {
    return api.put(`/consultas/${id}`, consulta);
  },

  excluir(id) {
    return api.delete(`/consultas/${id}`);
  },
};

export default ConsultaService;
