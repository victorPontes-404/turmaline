from pydantic import BaseModel, EmailStr
from datetime import datetime

#oq o user vai enviar para o backend
class UserCreate(BaseModel):
    name: str
    email: EmailStr #valida se o email é valido
    password: str

#oq o backend vai retornar para o user
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

#permite converter um objeto do SQLAlchemy direto para esse schema
    class Config:
        from_attributes = True