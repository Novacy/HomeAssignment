from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from src.requests.deals.DealRequest import DealRequest
from src.controllers.api.DealController import DealController
from src.db.dals.deal_dal import DealDAL
from src.db.dependencies import get_deal_dal
from src.middleware.auth import auth

router = APIRouter(
    prefix='/deals',
    tags=['Deals']
)


@router.get("/")
async def get_deals(deal_dal: DealDAL = Depends(get_deal_dal),
                    deal_controller: DealController = Depends(DealController),
                    dependencies = Depends(auth())
                    ) -> JSONResponse:
    return await deal_controller.get_deals(deal_dal)
