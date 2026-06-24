package com.hospital.service;

import com.hospital.model.Paciente;
import com.hospital.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public List<Paciente> buscarPorNome(String nome) {
        if (!StringUtils.hasText(nome)) {
            return pacienteRepository.findAll();
        }
        return pacienteRepository.findByNomeContainingIgnoreCase(nome.trim());
    }

    public Paciente cadastrar(Paciente paciente) {
        validarPaciente(paciente, null);
        if (pacienteRepository.findByCpf(paciente.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado: " + paciente.getCpf());
        }
        return pacienteRepository.save(paciente);
    }

    public Paciente atualizar(Long id, Paciente dados) {
        Paciente existente = pacienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado com id: " + id));

        validarPaciente(dados, id);

        if (pacienteRepository.existsByCpfAndIdNot(dados.getCpf(), id)) {
            throw new IllegalArgumentException("CPF já cadastrado para outro paciente: " + dados.getCpf());
        }

        existente.setNome(dados.getNome());
        existente.setCpf(dados.getCpf());
        existente.setDataNascimento(dados.getDataNascimento());
        existente.setTelefone(dados.getTelefone());
        existente.setEmail(dados.getEmail());
        existente.setConvenio(dados.getConvenio());

        return pacienteRepository.save(existente);
    }

    public void excluir(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new IllegalArgumentException("Paciente não encontrado com id: " + id);
        }
        pacienteRepository.deleteById(id);
    }

    private void validarPaciente(Paciente paciente, Long idIgnorado) {
        if (paciente == null) {
            throw new IllegalArgumentException("Dados do paciente são obrigatórios");
        }
        if (!StringUtils.hasText(paciente.getNome())) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (!StringUtils.hasText(paciente.getCpf())) {
            throw new IllegalArgumentException("CPF é obrigatório");
        }
        if (paciente.getDataNascimento() == null) {
            throw new IllegalArgumentException("Data de nascimento é obrigatória");
        }
    }
}
