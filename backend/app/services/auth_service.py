from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password, verify_password, create_access_token

def create_user(db: Session, user_data: UserCreate):
    #verifica se o email ja existe
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        return None
    
    #cria o novo usuario
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hash_password(user_data.password)
    )
    #salva o novo usuario no banco de dados
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_access_token(data={"sub": new_user.email})
    return {"access_token": token, "token_type": "bearer", "user": new_user}

#autentica o usuario
def authenticate_user(db: Session, email: str, password: str):
    #busca o usuario no banco de dados
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None 
    if not verify_password(password, user.hashed_password):
        return None
    
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user": user}