# Turmaline — Guia Completo do Projeto

Este é o guia central de desenvolvimento para o time **Turmaline**. Aqui você encontrará tudo o que precisa para configurar, desenvolver e manter a consistência do projeto.

---

## Índice
1. [Visão Geral](#-visão-geral)
2. [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
3. [Configuração do Ambiente (Setup)](#-configuração-do-ambiente-setup)
4. [Estrutura do Projeto](#-estrutura-do-projeto)
5. [Convenções e Padrões](#-convenções-e-padrões)
6. [Fluxo de Trabalho (Workflow)](#-fluxo-de-trabalho-workflow)
7. [Equipe](#-equipe)

---

## Visão Geral
Turmaline é uma plataforma de produtividade e gestão de conhecimento (estilo Obsidian) com foco em colaboração. Permite a criação de projetos, edição de Markdown em tempo real, gestão de tarefas via Kanban e organização de arquivos em árvore.

---

## 🏗 Arquitetura e Tecnologias

O projeto é dividido em **Monorepo** com duas aplicações principais:

### Backend (API)
- **Framework:** FastAPI (Python 3.10+)
- **Banco de Dados:** PostgreSQL (SQLAlchemy v2 ORM)
- **Autenticação:** JWT (JSON Web Tokens) com `passlib` (bcrypt)
- **Validação:** Pydantic v2
- **Ambiente:** `venv` + `pip`

### Frontend (SPA)
- **Framework:** React 18 + Vite
- **Estilização:** Tailwind CSS 3
- **Navegação:** React Router 6
- **Estado/UI:** Context API + Lucide Icons + @hello-pangea/dnd (Kanban)
- **Editor:** @uiw/react-md-editor

---

## ⚙️ Configuração do Ambiente (Setup)

### Pré-requisitos
- Python 3.10 ou superior
- Node.js 18 ou superior
- PostgreSQL rodando localmente

### 1. Clonar e Instalar Backend
```bash
# Navegar até a pasta backend
cd backend

# Criar ambiente virtual
python -m venv .venv

# Ativar venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env  # (Se existir, senão crie um .env com DATABASE_URL)
```

### 2. Rodar o Backend
```bash
uvicorn app.main:app --reload
# → API: http://localhost:8000
# → Documentação Swagger: http://localhost:8000/docs
```

### 3. Instalar e Rodar Frontend
```bash
# Navegar até a pasta frontend
cd ../frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
# → App: http://localhost:3000
```

---

## 📂 Estrutura do Projeto

```bash
turmaline/
├── backend/                # API FastAPI
│   ├── app/
│   │   ├── core/           # Segurança, Configs, Segurança
│   │   ├── db/             # Conectores e Sessão (database.py)
│   │   ├── models/         # Tabelas SQLAlchemy
│   │   ├── schemas/        # Modelos Pydantic (Entrada/Saída)
│   │   ├── services/       # Lógica de Negócio (CRUDs)
│   │   ├── routers/        # Endpoints (Routes)
│   │   └── main.py         # App Entry Point
│   └── .env                # Credenciais (IGNORADO PELO GIT)
├── frontend/               # React App
│   ├── src/
│   │   ├── components/     # Cards, Modais, Inputs reutilizáveis
│   │   ├── pages/          # Landing, Dashboard, Login, ProjectView
│   │   ├── context/        # Estado Global (Auth, Theme)
│   │   ├── assets/         # Imagens e Logos
│   │   └── App.jsx         # Rotas e Layout Base
│   └── tailwind.config.js  # Temas e Cores Customizadas
└── README.md               # Este arquivo
```

---

## 📏 Convenções e Padrões

### 1. Versionamento (Git)
- **Branches:**
  - `main`: Código estável em produção.
  - `develop`: Integração de features.
  - `feature/nome-da-funcionalidade`: Novas tarefas.
- **Commits (Conventional Commits):**
  - `feat: ...` (Nova funcionalidade)
  - `fix: ...` (Arrumar bug)
  - `docs: ...` (Documentação)
  - `style: ...` (CSS/Formatação)

### 2. Backend (Python)
- **Nomenclatura:** `snake_case` para arquivos e funções, `PascalCase` para classes/models.
- **Fluxo de Dados:** Use sempre a ordem `Model -> Schema -> Service -> Router`.
- **Async:** Use `async def` para routers que não fazem chamadas bloqueantes massivas.

### 3. Frontend (React)
- **Componentes:** Um componente por arquivo, `PascalCase`.
- **Props:** Use desestruturação nas props.
- **Tailwind:** Utilize as cores pré-definidas no `tailwind.config.js` (`primary-cyan`, `background-dark`).

---

## 🚀 Fluxo de Trabalho (Workflow)

Para adicionar um novo recurso (ex: "Comentários"):

1. **Backend:**
   - Crie o model SQLAlchemy em `app/models/comment.py`.
   - Crie os schemas Pydantic em `app/schemas/comment.py`.
   - Implemente a lógica em `app/services/comment_service.py`.
   - Crie a rota em `app/routers/comment.py` e registre no `main.py`.
2. **Database:**
   - Execute a migration (ou deixe o código criar se estiver em dev).
3. **Frontend:**
   - Adicione o endpoint no arquivo de API ou use `fetch/axios`.
   - Crie o componente UI em `src/components/`.
   - Integre na página correspondente.

---

## 👥 Equipe
Projeto desenvolvido por:
- 👨‍💻 **Andrei**
- 👨‍💻 **Bruno Henrique**
- 👨‍💻 **Diogo Paes**
- 👨‍💻 **João Victor Pontes**

---

> [!TIP]
> Em caso de dúvidas, consulte a documentação automática da API no endpoint `/docs`.
