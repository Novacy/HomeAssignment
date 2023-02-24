from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from src.db.config import Base


class Activity(Base):
    __tablename__ = 'activities'

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=True)
    is_inbound = Column(Boolean, nullable=False)
    title = Column(String(100), nullable=True)
    deal_id = Column(Integer, ForeignKey('deals.id'))

    deal = relationship("Deal", back_populates="activities")