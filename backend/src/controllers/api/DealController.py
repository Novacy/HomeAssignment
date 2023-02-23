from fastapi import Depends
from src.db.dals.deal_dal import DealDAL
from src.requests.deals.DealRequest import DealRequest
from src.db.dependencies import get_deal_dal


class DealController:
    def __init__(self):
        pass

    async def create_deals(self, request: DealRequest, deal_dal: DealDAL = Depends(get_deal_dal)):
        return {'hello': request}

    async def get_deals(self):
        return {'hello': 'world'}
