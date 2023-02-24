from sqlalchemy import Column, Integer, String
from src.db.config import Base


class Account(Base):
    __tablename__ = 'accounts'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=True)