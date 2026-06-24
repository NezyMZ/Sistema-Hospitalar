import api from '../api/api';

const MedicoService = {
  listarTodos() {
    return api.get('/medicos');
  },

  buscarPorId(id) {
    return api.get(`/medicos/${id}`);
  },

  buscarPorNome(nome) {
    return api.get('/medicos/buscar', { params: { nome } });
  },

  cadastrar(medico) {
    return api.post('/medicos', medico);
  },

  atualizar(id, medico) {
    return api.put(`/medicos/${id}`, medico);
  },

  excluir(id) {
    return api.delete(`/medicos/${id}`);
  },
};

export default MedicoService;
