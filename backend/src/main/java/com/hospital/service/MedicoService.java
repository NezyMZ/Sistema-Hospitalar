package com.hospital.service;

import com.hospital.model.Medico;
import com.hospital.repository.MedicoRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    public Optional<Medico> buscarPorId(Long id) {
        return medicoRepository.findById(id);
    }

    public List<Medico> buscarPorNome(String nome) {
        if (!StringUtils.hasText(nome)) {
            return medicoRepository.findAll();
        }
        return medicoRepository.findByNomeContainingIgnoreCase(nome.trim());
    }

    public Medico cadastrar(Medico medico) {
        validarMedico(medico);
        if (medicoRepository.findByCrm(medico.getCrm()).isPresent()) {
            throw new IllegalArgumentException("CRM já cadastrado: " + medico.getCrm());
        }
        return medicoRepository.save(medico);
    }

    public Medico atualizar(Long id, Medico dados) {
        Medico existente = medicoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Médico não encontrado com id: " + id));

        validarMedico(dados);

        if (medicoRepository.existsByCrmAndIdNot(dados.getCrm(), id)) {
            throw new IllegalArgumentException("CRM já cadastrado para outro médico: " + dados.getCrm());
        }

        existente.setNome(dados.getNome());
        existente.setCrm(dados.getCrm());
        existente.setEspecialidade(dados.getEspecialidade());
        existente.setTelefone(dados.getTelefone());
        existente.setEmail(dados.getEmail());

        return medicoRepository.save(existente);
    }

    public void excluir(Long id) {
        if (!medicoRepository.existsById(id)) {
            throw new IllegalArgumentException("Médico não encontrado com id: " + id);
        }
        medicoRepository.deleteById(id);
    }

    private void validarMedico(Medico medico) {
        if (medico == null) {
            throw new IllegalArgumentException("Dados do médico são obrigatórios");
        }
        if (!StringUtils.hasText(medico.getNome())) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (!StringUtils.hasText(medico.getCrm())) {
            throw new IllegalArgumentException("CRM é obrigatório");
        }
        if (!StringUtils.hasText(medico.getEspecialidade())) {
            throw new IllegalArgumentException("Especialidade é obrigatória");
        }
    }
}
