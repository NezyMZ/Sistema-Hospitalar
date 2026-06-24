import api from '../api/api';

const PacienteService = {
  listarTodos() {
    return api.get('/pacientes');
  },

  buscarPorId(id) {
    return api.get(`/pacientes/${id}`);
  },

  buscarPorNome(nome) {
    return api.get('/pacientes/buscar', { params: { nome } });
  },

  cadastrar(paciente) {
    return api.post('/pacientes', paciente);
  },

  atualizar(id, paciente) {
    return api.put(`/pacientes/${id}`, paciente);
  },

  excluir(id) {
    return api.delete(`/pacientes/${id}`);
  },
};

export default PacienteService;
