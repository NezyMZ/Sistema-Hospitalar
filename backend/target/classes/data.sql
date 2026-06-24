-- Pacientes
INSERT INTO pacientes (id, nome, cpf, data_nascimento, telefone, email, convenio) VALUES
(1, 'Ana Silva', '111.222.333-44', '1990-05-15', '(21) 98765-4321', 'ana.silva@email.com', 'Unimed'),
(2, 'Carlos Oliveira', '555.666.777-88', '1985-08-22', '(21) 91234-5678', 'carlos.oliveira@email.com', 'Bradesco Saúde'),
(3, 'Mariana Costa', '999.888.777-66', '1998-12-03', '(21) 99876-5432', 'mariana.costa@email.com', 'Particular');

-- Médicos
INSERT INTO medicos (id, nome, crm, especialidade, telefone, email) VALUES
(1, 'Dr. João Pereira', 'CRM-12345/RJ', 'Cardiologia', '(21) 3456-7890', 'joao.pereira@hospital.com'),
(2, 'Dra. Fernanda Lima', 'CRM-54321/RJ', 'Pediatria', '(21) 3456-7891', 'fernanda.lima@hospital.com'),
(3, 'Dr. Ricardo Souza', 'CRM-67890/RJ', 'Ortopedia', '(21) 3456-7892', 'ricardo.souza@hospital.com');

-- Consultas
INSERT INTO consultas (id, paciente_id, medico_id, data_hora, status, observacoes) VALUES
(1, 1, 1, '2026-06-25 09:00:00', 'AGENDADA', 'Primeira consulta cardiológica'),
(2, 2, 3, '2026-06-26 14:30:00', 'AGENDADA', 'Avaliação de joelho'),
(3, 3, 2, '2026-06-27 10:00:00', 'REALIZADA', 'Consulta pediátrica de rotina');
