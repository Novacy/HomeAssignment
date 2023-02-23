from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from src.requests.deals.DealRequest import DealRequest
from src.controllers.api.DealController import DealController
from src.db.dals.deal_dal import DealDAL
from src.db.dependencies import get_deal_dal

router = APIRouter(
    prefix='/deals',
    tags=['Deals']
)


@router.post("/")
async def create_book(request: DealRequest, deal_dal: DealDAL = Depends(get_deal_dal),
                      deal_controller: DealController = Depends(DealController)) -> JSONResponse:
    return await deal_controller.create_deals(request, deal_dal)


@router.get("/")
async def get_deals(request: DealRequest, deal_dal: DealDAL = Depends(get_deal_dal),
                    deal_controller: DealController = Depends(DealController)) -> JSONResponse:
    return await deal_controller.get_deals(request, deal_dal)
