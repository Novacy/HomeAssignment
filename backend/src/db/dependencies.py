from src.db.config import async_session
from src.db.dals.deal_dal import DealDAL
from src.db.dals.user_dal import UserDAL


async def get_deal_dal():
    async with async_session() as session:
        async with session.begin():
            yield DealDAL(session)


async def get_user_deal():
    async with async_session() as session:
        async with session.begin():
            yield UserDAL(session)
