from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum
from app.db.database import Base

class MemberRole(str, enum.Enum):
    DONO = "Dono"
    GESTOR = "Gestor"
    EDITOR = "Editor"
    LEITOR = "Leitor"

class ProjectMember(Base):
    __tablename__ = "project_members"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    role = Column(SQLEnum(MemberRole), default=MemberRole.LEITOR, nullable=False)
    added_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relacionamentos
    user = relationship("User")
    project = relationship("Project", back_populates="members")
