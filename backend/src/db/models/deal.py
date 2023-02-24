from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from src.db.config import Base


class Deal(Base):
    __tablename__ = 'deals'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    last_meeting = Column(Date, nullable=True)
    next_meeting = Column(Date, nullable=True)
    owner = Column(String(255), nullable=True)
    stage = Column(String(100), nullable=False)
    amount = Column(Integer, nullable=True)
    account_id = Column(Integer, nullable=True)

    activities = relationship("Activity", back_populates="deal")
