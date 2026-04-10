from pydantic import BaseModel, EmailStr
from datetime import datetime

# O que o user envia para criar conta
class UserCreate(BaseModel):
    name: str
    email: EmailStr  # valida se o email é válido
    password: str

# O que o user envia para fazer login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# O que o backend retorna para o user
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

# O que o backend retorna após login ou cadastro (com token)
class UserAuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Permite converter um objeto do SQLAlchemy direto para esse schema
    class Config:
        from_attributes = True