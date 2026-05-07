from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

class UserAuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None


class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True 
class UserWithProjects(UserResponse):
    projects: List[ProjectResponse] = []

    class Config:
        from_attributes = True
