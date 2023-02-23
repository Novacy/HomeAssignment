from fastapi import APIRouter, Depends, Response
from src.requests.deals.DealRequest import DealRequest
from src.controllers.api.DealController import DealController

router = APIRouter(
    prefix='/deals',
    tags=['Deals']
)


@router.post("/")
async def create_book(request: DealRequest,
                      deal_controller: DealController = Depends(DealController)):
    return await deal_controller.create_deals(request)


@router.get("/")
async def get_deals(request: DealRequest,
                    deal_controller: DealController = Depends(DealController)):
    return await deal_controller.create_deals(request)
