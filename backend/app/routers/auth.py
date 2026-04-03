from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.auth_service import create_user, authenticate_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, user_data)
    if not user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user

@router.post("/login")
def login(user_data: UserCreate, db: Session = Depends(get_db)):
    result = authenticate_user(db, user_data.email, user_data.password)
    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return result