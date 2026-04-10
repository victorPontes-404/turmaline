from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    status = Column(String, default="todo", nullable=False) # todo, doing, done
    
    assignee_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    file_node_id = Column(Integer, ForeignKey("file_nodes.id"), nullable=True, index=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relacionamentos
    project = relationship("Project", back_populates="tasks")
    assignee = relationship("User")
    linked_file = relationship("FileNode")
