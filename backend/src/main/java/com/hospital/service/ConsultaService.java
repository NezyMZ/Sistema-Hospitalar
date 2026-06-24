package com.hospital.service;

import com.hospital.model.Consulta;
import com.hospital.model.Medico;
import com.hospital.model.Paciente;
import com.hospital.repository.ConsultaRepository;
import com.hospital.repository.MedicoRepository;
import com.hospital.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ConsultaService {

    private static final Set<String> STATUS_VALIDOS = Set.of(
            "AGENDADA", "REALIZADA", "CANCELADA"
    );

    private final ConsultaRepository consultaRepository;
    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;

    public ConsultaService(ConsultaRepository consultaRepository,
                           PacienteRepository pacienteRepository,
                           MedicoRepository medicoRepository) {
        this.consultaRepository = consultaRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
    }

    public List<Consulta> listarTodos() {
        return consultaRepository.findAll();
    }

    public Optional<Consulta> buscarPorId(Long id) {
        return consultaRepository.findById(id);
    }

    public List<Consulta> buscarPorData(LocalDate data) {
        if (data == null) {
            return consultaRepository.findAll();
        }
        LocalDateTime inicio = data.atStartOfDay();
        LocalDateTime fim = data.atTime(LocalTime.MAX);
        return consultaRepository.findByData(inicio, fim);
    }

    public Consulta cadastrar(Consulta consulta) {
        validarConsulta(consulta);
        consulta.setPaciente(resolverPaciente(consulta.getPaciente()));
        consulta.setMedico(resolverMedico(consulta.getMedico()));
        return consultaRepository.save(consulta);
    }

    public Consulta atualizar(Long id, Consulta dados) {
        Consulta existente = consultaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Consulta não encontrada com id: " + id));

        validarConsulta(dados);

        existente.setPaciente(resolverPaciente(dados.getPaciente()));
        existente.setMedico(resolverMedico(dados.getMedico()));
        existente.setDataHora(dados.getDataHora());
        existente.setStatus(dados.getStatus());
        existente.setObservacoes(dados.getObservacoes());

        return consultaRepository.save(existente);
    }

    public void excluir(Long id) {
        if (!consultaRepository.existsById(id)) {
            throw new IllegalArgumentException("Consulta não encontrada com id: " + id);
        }
        consultaRepository.deleteById(id);
    }

    private Paciente resolverPaciente(Paciente pacienteRef) {
        if (pacienteRef == null || pacienteRef.getId() == null) {
            throw new IllegalArgumentException("Paciente é obrigatório");
        }
        return pacienteRepository.findById(pacienteRef.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Paciente não encontrado com id: " + pacienteRef.getId()));
    }

    private Medico resolverMedico(Medico medicoRef) {
        if (medicoRef == null || medicoRef.getId() == null) {
            throw new IllegalArgumentException("Médico é obrigatório");
        }
        return medicoRepository.findById(medicoRef.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Médico não encontrado com id: " + medicoRef.getId()));
    }

    private void validarConsulta(Consulta consulta) {
        if (consulta == null) {
            throw new IllegalArgumentException("Dados da consulta são obrigatórios");
        }
        if (consulta.getDataHora() == null) {
            throw new IllegalArgumentException("Data e hora são obrigatórias");
        }
        if (!StringUtils.hasText(consulta.getStatus())) {
            throw new IllegalArgumentException("Status é obrigatório");
        }
        if (!STATUS_VALIDOS.contains(consulta.getStatus().toUpperCase())) {
            throw new IllegalArgumentException(
                    "Status inválido. Use: AGENDADA, REALIZADA ou CANCELADA");
        }
        consulta.setStatus(consulta.getStatus().toUpperCase());
    }
}
