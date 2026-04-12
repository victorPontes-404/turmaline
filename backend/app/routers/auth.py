from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db

from app.schemas.user import UserCreate, UserLogin, UserResponse, UserAuthResponse, UserWithProjects
from app.services.auth_service import create_user, authenticate_user
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])
@router.post("/register", response_model=UserAuthResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    result = create_user(db, user_data)
    if not result:
        raise HTTPException(status_code=400, detail="Email already registered")
    return result


@router.post("/login", response_model=UserAuthResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    result = authenticate_user(db, user_data.email, user_data.password)
    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return result


@router.get("/me", response_model=UserWithProjects)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Retorna os dados do usuário logado e seus projetos associados.
    Essa é a rota principal que o Dashboard chama ao carregar.
    """
    return current_user
