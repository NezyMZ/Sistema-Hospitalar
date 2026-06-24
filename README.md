# 🏥 Sistema Hospitalar

Sistema web fullstack para gerenciamento hospitalar, com cadastro, listagem, busca, edição e exclusão de **Pacientes**, **Médicos** e **Consultas**.

---

## 🛠️ Tecnologias

### Backend
- **Java 17** com **Spring Boot**
- **Spring Data JPA** — persistência em camadas
- **H2 Database** — banco de dados embarcado em memória
- **Spring Web** — API REST
- **CORS** configurado para integração com o frontend

### Frontend
- **React** com **React Router DOM** — navegação entre telas
- **Axios** — consumo da API REST
- **useState / useEffect** — gerenciamento de estado e ciclo de vida
- **HTML5 / CSS3** — estilização das telas

---

## 📁 Estrutura do Projeto

```
Sistema-Hospitalar/
├── backend/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/hospital/
│           │       ├── model/          # Entidades JPA
│           │       ├── repository/     # Spring Data JPA Repositories
│           │       ├── service/        # Regras de negócio
│           │       └── controller/     # Controllers REST
│           └── resources/
│               └── application.properties
└── frontend/
    ├── public/
    └── src/
        ├── components/     # Componentes reutilizáveis
        ├── pages/          # Telas do sistema
        ├── services/       # Configuração do Axios
        └── App.js          # Rotas principais
```

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Java 17+](https://www.oracle.com/java/technologies/downloads/)
- [Maven 3.8+](https://maven.apache.org/download.cgi)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (incluso com o Node.js)

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/NezyMZ/Sistema-Hospitalar.git
cd Sistema-Hospitalar
```

### 2. Inicie o Backend

```bash
cd backend
mvn spring-boot:run
```

O servidor será iniciado em: `http://localhost:8080`

> **Console H2** disponível em: `http://localhost:8080/h2-console`
> - JDBC URL: `jdbc:h2:mem:hospitaldb`
> - Usuário: `sa`
> - Senha: *(vazio)*

### 3. Inicie o Frontend

Em um novo terminal:

```bash
cd frontend
npm install
npm start
```

O frontend será iniciado em: `http://localhost:3000`

---

## 🔗 Endpoints da API

### Pacientes
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/pacientes` | Listar todos |
| GET | `/api/pacientes/{id}` | Buscar por ID |
| GET | `/api/pacientes/buscar?nome=` | Buscar por nome |
| POST | `/api/pacientes` | Cadastrar |
| PUT | `/api/pacientes/{id}` | Editar |
| DELETE | `/api/pacientes/{id}` | Excluir |

### Médicos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/medicos` | Listar todos |
| GET | `/api/medicos/{id}` | Buscar por ID |
| GET | `/api/medicos/buscar?nome=` | Buscar por nome |
| POST | `/api/medicos` | Cadastrar |
| PUT | `/api/medicos/{id}` | Editar |
| DELETE | `/api/medicos/{id}` | Excluir |

### Consultas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/consultas` | Listar todas |
| GET | `/api/consultas/{id}` | Buscar por ID |
| POST | `/api/consultas` | Agendar |
| PUT | `/api/consultas/{id}` | Editar |
| DELETE | `/api/consultas/{id}` | Excluir |

---

## 🖥️ Telas do Sistema

| Rota | Descrição |
|------|-----------|
| `/pacientes` | Listagem de pacientes |
| `/pacientes/novo` | Cadastro de paciente |
| `/pacientes/editar/:id` | Edição de paciente |
| `/medicos` | Listagem de médicos |
| `/medicos/novo` | Cadastro de médico |
| `/medicos/editar/:id` | Edição de médico |
| `/consultas` | Listagem de consultas |
| `/consultas/nova` | Agendamento de consulta |
| `/consultas/editar/:id` | Edição de consulta |

---

## 🗄️ Entidades

### Paciente
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador único |
| nome | String | Nome completo |
| cpf | String | CPF do paciente |
| dataNascimento | LocalDate | Data de nascimento |
| telefone | String | Telefone de contato |
| email | String | E-mail |
| convenio | String | Convênio médico |

### Médico
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador único |
| nome | String | Nome completo |
| crm | String | Registro CRM |
| especialidade | String | Especialidade médica |
| telefone | String | Telefone de contato |
| email | String | E-mail |

### Consulta
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador único |
| paciente | Paciente | Paciente vinculado |
| medico | Médico | Médico responsável |
| dataHora | LocalDateTime | Data e hora da consulta |
| status | String | Status (Agendada / Realizada / Cancelada) |
| observacoes | String | Observações clínicas |
