from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base

class FileNode(Base):
    __tablename__ = "file_nodes"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    parent_id = Column(Integer, ForeignKey("file_nodes.id"), nullable=True, index=True)
    
    name = Column(String, nullable=False)
    is_folder = Column(Boolean, default=False, nullable=False)
    extension = Column(String, nullable=True) # Ex: 'md', 'txt', 'png'
    
    # TextBlob provisório para MVP em substituição a arquivos reais
    content = Column(Text, nullable=True) 
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relacionamentos
    project = relationship("Project", back_populates="files")
    parent = relationship("FileNode", remote_side=[id], back_populates="children")
    children = relationship("FileNode", back_populates="parent", cascade="all, delete-orphan")
