package com.hospital.repository;

import com.hospital.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

    List<Medico> findByNomeContainingIgnoreCase(String nome);

    Optional<Medico> findByCrm(String crm);

    boolean existsByCrmAndIdNot(String crm, Long id);
}
