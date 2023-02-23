from typing import List, Optional

from sqlalchemy import update
from sqlalchemy.future import select
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from src.db.models.user import User


class UserDAL:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def create_user(self, name: str, email: str, password: int):
        bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        new_user = User(name=name, email=email, password=bcrypt_context.hash(password))
        self.db_session.add(new_user)
        await self.db_session.flush()
    

    async def get_all_books(self) -> List[User]:
        q = await self.db_session.execute(select(User).order_by(User.id))
        return q.scalars().all()

    async def update_book(self, user_id: int, name: Optional[str], email: Optional[str], password: Optional[int]):
        q = update(User).where(User.id == user_id)
        if name:
            q = q.values(name=name)
        if email:
            q = q.values(email=email)
        if password:
            q = q.values(password=password)
        q.execution_options(synchronize_session="fetch")
        await self.db_session.execute(q)