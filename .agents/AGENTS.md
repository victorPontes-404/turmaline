# Turmaline — Guia para Agentes de IA

Este documento define o contexto, regras e padrões que agentes de IA devem seguir ao trabalhar no projeto Turmaline.
Leia este arquivo antes de qualquer modificação no código.

---

## O que é o Turmaline

Plataforma de documentação e gestão de projetos para times de desenvolvimento.
Fusão entre Obsidian (documentação markdown, graph map) e Jira/Notion (tarefas, sprints, kanban).

**Monorepo** com duas aplicações separadas:
- `backend/` — API REST em FastAPI (Python)
- `frontend/` — SPA em React + Vite

---

## Stack — Nunca substitua sem autorização

### Backend
- Python 3.10+
- FastAPI
- PostgreSQL 15 + SQLAlchemy v2
- Pydantic v2
- python-jose (JWT)
- passlib + **bcrypt==4.0.1** ← versão obrigatória, não atualize
- uvicorn

### Frontend
- React 18 + Vite
- React Router v6
- Tailwind CSS 3
- Context API (estado global)
- Axios
- @uiw/react-md-editor
- @hello-pangea/dnd
- Lucide Icons

---

## Estrutura de pastas — Nunca crie arquivos fora do padrão

```
backend/app/
├── main.py          — Apenas: instância do app, CORS, include_router, create_all
├── routers/         — Um arquivo por domínio (auth.py, documents.py, tasks.py...)
├── models/          — Um arquivo por entidade (user.py, document.py...)
├── schemas/         — Um arquivo por entidade (user.py, document.py...)
├── services/        — Um arquivo por domínio (auth_service.py, document_service.py...)
├── core/
│   ├── config.py    — Apenas leitura do .env via pydantic-settings
│   └── security.py  — Apenas: hash_password, verify_password, create_access_token, decode_access_token, get_current_user
└── db/
    └── database.py  — Apenas: engine, SessionLocal, Base, get_db

frontend/src/
├── components/      — Componentes reutilizáveis (um por arquivo)
├── pages/           — Uma página por arquivo
├── context/         — Apenas Auth e Theme
├── services/        — Um arquivo por domínio da API
└── assets/          — Apenas imagens e logos estáticos
```

---

## Regras obrigatórias

### Geral
- Nunca altere `requirements.txt` manualmente — use `pip freeze > requirements.txt` após instalar
- Nunca commite ou exponha valores do `.env`
- Nunca use valores de cor hardcoded no frontend — use sempre os tokens do `tailwind.config.js`
- Nunca crie lógica de negócio dentro de routers — isso vai em `services/`
- Nunca acesse o banco diretamente em routers — sempre via service + `Depends(get_db)`

### Backend
- Todo novo recurso segue obrigatoriamente a ordem: **model → schema → service → router → registrar no main.py**
- Schemas de entrada: sufixo `Create` (ex: `UserCreate`)
- Schemas de resposta: sufixo `Response` (ex: `UserResponse`)
- A senha (`hashed_password`) **nunca** aparece em nenhum schema `Response`
- Sempre use `from_attributes = True` na `class Config` dos schemas de resposta
- Erros HTTP: use sempre `HTTPException` com o status code correto

### Frontend
- Um componente por arquivo, `PascalCase`
- Use desestruturação nas props
- Chamadas à API ficam em `src/services/`, nunca dentro de componentes diretamente
- Cores via tokens Tailwind: `text-primary-cyan`, `bg-background-dark`, etc.

---

## Convenções de nomenclatura

| Elemento | Padrão | Exemplo |
|---|---|---|
| Arquivos Python | `snake_case` | `auth_service.py` |
| Classes Python | `PascalCase` | `class User` |
| Funções/variáveis Python | `snake_case` | `def create_user()` |
| Tabelas no banco | `snake_case` plural | `workspace_members` |
| Componentes React | `PascalCase` | `DocumentEditor.jsx` |
| Arquivos React | `PascalCase` | `Dashboard.jsx` |
| Services frontend | `camelCase` + sufixo | `documentService.js` |
| Tokens Tailwind | `kebab-case` | `primary-cyan` |

---

## Como adicionar um novo recurso

### 1. Model (`app/models/nome.py`)

```python
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timezone
from app.db.database import Base

class NomeDoModel(Base):
    __tablename__ = "nome_da_tabela"

    id = Column(Integer, primary_key=True, index=True)
    # adicione os campos aqui
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
```

### 2. Schema (`app/schemas/nome.py`)

```python
from pydantic import BaseModel
from datetime import datetime

class NomeCreate(BaseModel):
    campo: str

class NomeResponse(BaseModel):
    id: int
    campo: str
    created_at: datetime

    class Config:
        from_attributes = True
```

### 3. Service (`app/services/nome_service.py`)

```python
from sqlalchemy.orm import Session
from app.models.nome import NomeDoModel
from app.schemas.nome import NomeCreate

def create_nome(db: Session, data: NomeCreate):
    novo = NomeDoModel(**data.model_dump())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

def get_nome(db: Session, id: int):
    return db.query(NomeDoModel).filter(NomeDoModel.id == id).first()

def list_nomes(db: Session):
    return db.query(NomeDoModel).all()

def delete_nome(db: Session, id: int):
    item = get_nome(db, id)
    if item:
        db.delete(item)
        db.commit()
    return item
```

### 4. Router (`app/routers/nome.py`)

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.nome import NomeCreate, NomeResponse
from app.services.nome_service import create_nome, get_nome, list_nomes, delete_nome

router = APIRouter(prefix="/nome", tags=["nome"])

@router.post("/", response_model=NomeResponse)
async def create(data: NomeCreate, db: Session = Depends(get_db)):
    return create_nome(db, data)

@router.get("/", response_model=list[NomeResponse])
async def list_all(db: Session = Depends(get_db)):
    return list_nomes(db)

@router.get("/{id}", response_model=NomeResponse)
async def get(id: int, db: Session = Depends(get_db)):
    item = get_nome(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    return item

@router.delete("/{id}")
async def delete(id: int, db: Session = Depends(get_db)):
    item = delete_nome(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True}
```

### 5. Registrar no `app/main.py`

```python
from app.routers import nome
app.include_router(nome.router)
```

---

## Protegendo rotas com JWT

Para rotas que exigem autenticação, use `Depends(get_current_user)`:

```python
from app.core.security import get_current_user
from app.models.user import User

@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
```

`get_current_user` já está implementado em `app/core/security.py`.
Ele valida o token JWT, busca o usuário no banco e retorna o objeto `User`.
Se o token for inválido ou expirado, retorna automaticamente `401`.

---

## Padrões de erro HTTP

| Situação | Status |
|---|---|
| Recurso não encontrado | `404` |
| Dado já existe (ex: email duplicado) | `400` |
| Não autenticado (sem token ou token inválido) | `401` |
| Sem permissão para aquele recurso | `403` |
| Erro de validação (Pydantic trata automaticamente) | `422` |

---

## Variáveis de ambiente

Lidas via `app/core/config.py` usando `pydantic-settings`.
Nunca acesse `os.environ` diretamente — sempre importe `settings`:

```python
from app.core.config import settings

settings.DATABASE_URL
settings.SECRET_KEY
settings.ALGORITHM
settings.ACCESS_TOKEN_EXPIRE_MINUTES
```

Estrutura do `.env`:

```env
DATABASE_URL=postgresql://turmaline_user:senha@localhost:5432/turmaline
SECRET_KEY=chave-hex-32-bytes
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## Estado atual da API

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Cadastro de usuário | Não |
| `POST` | `/auth/login` | Login, retorna JWT | Não |

---

## O que vem a seguir (próximas implementações)

Implemente nessa ordem de prioridade:

1. `GET /auth/me` — retorna o usuário autenticado (rota protegida)
2. CRUD de `workspaces` — criação e listagem de workspaces por usuário
3. CRUD de `projects` — projetos dentro de um workspace
4. CRUD de `documents` — documentos markdown dentro de um projeto
5. CRUD de `tasks` — tarefas com status (todo, in_progress, done)
6. CRUD de `sprints` — agrupamento de tarefas com datas

Cada item acima segue o mesmo fluxo: model → schema → service → router → main.py.
