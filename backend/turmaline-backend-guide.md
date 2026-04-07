# Turmaline — Guia de Estrutura e Convenções do Backend

Este documento descreve a arquitetura, padrões e convenções do backend do projeto Turmaline.
Use-o como referência ao adicionar novos recursos.

---

## Stack

| Tecnologia | Uso |
|---|---|
| **FastAPI** | Framework principal da API |
| **SQLAlchemy** | ORM para interação com o banco |
| **Alembic** | Migrations do banco de dados |
| **PostgreSQL** | Banco de dados |
| **Pydantic v2** | Validação e serialização de dados |
| **python-jose** | Geração e validação de JWT |
| **passlib + bcrypt 4.0.1** | Hash de senhas |
| **pydantic-settings** | Leitura de variáveis de ambiente |
| **uvicorn** | Servidor ASGI |

---

## Estrutura de pastas

```
backend/
├── app/
│   ├── main.py              # Ponto de entrada da aplicação
│   ├── routers/             # Endpoints organizados por domínio
│   ├── models/              # Models SQLAlchemy (tabelas do banco)
│   ├── schemas/             # Schemas Pydantic (validação e resposta)
│   ├── services/            # Lógica de negócio
│   ├── core/                # Configurações, segurança, dependências
│   └── db/                  # Conexão com o banco
├── .env                     # Variáveis de ambiente (não vai pro Git)
└── requirements.txt
```

---

## Variáveis de ambiente (.env)

```env
DATABASE_URL=postgresql://turmaline_user:senha@localhost:5432/turmaline
SECRET_KEY=chave-secreta-longa
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Lidas via `app/core/config.py`:

```python
from app.core.config import settings
settings.DATABASE_URL
```

---

## Convenções de nomenclatura

| Elemento | Padrão | Exemplo |
|---|---|---|
| Arquivos | `snake_case` | `auth_service.py` |
| Classes (models/schemas) | `PascalCase` | `class User`, `class UserCreate` |
| Funções e variáveis | `snake_case` | `def create_user()` |
| Routers | prefixo com `/` + domínio | `prefix="/auth"` |
| Tabelas no banco | `snake_case` plural | `users`, `workspace_members` |
| Schemas de entrada | sufixo `Create` | `UserCreate`, `DocumentCreate` |
| Schemas de resposta | sufixo `Response` | `UserResponse`, `DocumentResponse` |

---

## Como adicionar um novo recurso

Siga sempre essa ordem: **model → schema → service → router → registrar no main.py**

### 1. Model (`app/models/nome.py`)

```python
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timezone
from app.db.database import Base

class NomeDoModel(Base):
    __tablename__ = "nome_da_tabela"

    id = Column(Integer, primary_key=True, index=True)
    # seus campos aqui
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
```

### 2. Schema (`app/schemas/nome.py`)

```python
from pydantic import BaseModel
from datetime import datetime

class NomeCreate(BaseModel):
    # campos que chegam do frontend
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
```

### 4. Router (`app/routers/nome.py`)

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.nome import NomeCreate, NomeResponse
from app.services.nome_service import create_nome, get_nome

router = APIRouter(prefix="/nome", tags=["nome"])

@router.post("/", response_model=NomeResponse)
def create(data: NomeCreate, db: Session = Depends(get_db)):
    return create_nome(db, data)

@router.get("/{id}", response_model=NomeResponse)
def get(id: int, db: Session = Depends(get_db)):
    item = get_nome(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    return item
```

### 5. Registrar no `app/main.py`

```python
from app.routers import nome

app.include_router(nome.router)
```

---

## Autenticação JWT

### Gerar token (já implementado em `app/core/security.py`)

```python
from app.core.security import create_access_token

token = create_access_token(data={"sub": user.email})
```

### Proteger uma rota

Crie a dependência em `app/core/security.py` e use com `Depends`:

```python
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.core.security import decode_access_token
from app.models.user import User
from app.db.database import get_db
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.email == payload.get("sub")).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
```

Usando em uma rota protegida:

```python
from app.core.security import get_current_user

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
```

---

## Banco de dados

### Sessão (`app/db/database.py`)

Toda rota que acessa o banco recebe a sessão via `Depends(get_db)`:

```python
db: Session = Depends(get_db)
```

A sessão abre automaticamente no início da requisição e fecha ao final, mesmo que dê erro.

### Criar tabelas

As tabelas são criadas automaticamente ao subir o servidor via:

```python
Base.metadata.create_all(bind=engine)  # app/main.py
```

> Para o futuro: migrar para Alembic quando o schema estiver mais estável.

---

## Padrões de resposta de erro

Use sempre `HTTPException` com os status codes corretos:

| Situação | Status |
|---|---|
| Recurso não encontrado | `404` |
| Dado já existe (ex: email duplicado) | `400` |
| Não autenticado | `401` |
| Sem permissão | `403` |
| Erro de validação (Pydantic trata automaticamente) | `422` |

---

## Rodando o projeto

```bash
# Ativar o ambiente virtual
source .venv/bin/activate

# Entrar na pasta do backend
cd backend

# Subir o servidor
uvicorn app.main:app --reload
```

Documentação interativa disponível em `http://localhost:8000/docs`
