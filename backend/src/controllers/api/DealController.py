from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from src.db.dals.deal_dal import DealDAL
from src.requests.deals.DealRequest import DealRequest
from src.responses.response import respond
from src.db.dependencies import get_deal_dal


class DealController:
    def __init__(self):
        pass


    async def get_deals(self, deal_dal: DealDAL = Depends(get_deal_dal)):
        deals = await deal_dal.get_all_deals_with_activities()
        return await respond('deals fetched successful', 200, jsonable_encoder(deals))
