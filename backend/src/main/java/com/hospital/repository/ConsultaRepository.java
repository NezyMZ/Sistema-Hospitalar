package com.hospital.repository;

import com.hospital.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    @Query("SELECT c FROM Consulta c WHERE c.dataHora >= :inicio AND c.dataHora < :fim")
    List<Consulta> findByData(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
}
