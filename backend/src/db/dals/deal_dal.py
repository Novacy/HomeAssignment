from typing import List, Optional

from sqlalchemy import update
from sqlalchemy.future import select
from sqlalchemy.orm import subqueryload
from sqlalchemy.orm import Session

from src.db.models.deal import Deal


class DealDAL:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def get_all_deals(self) -> List[Deal]:
        q = await self.db_session.execute(select(Deal).order_by(Deal.id))
        return q.scalars().all()
        
    async def get_all_deals_with_activities(self) -> List[Deal]:
        q = await self.db_session.execute(select(Deal).options(subqueryload(Deal.activities)).order_by(Deal.id))
        return q.scalars().all()

