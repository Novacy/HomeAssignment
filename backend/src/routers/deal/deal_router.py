from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from src.requests.deals.DealRequest import DealRequest
from src.controllers.api.DealController import DealController
from src.db.dals.deal_dal import DealDAL
from src.db.dependencies import get_deal_dal

router = APIRouter(
    prefix='/deals',
    tags=['Deals']
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/")
async def create_book(request: DealRequest, deal_dal: DealDAL = Depends(get_deal_dal),
                    token: str = Depends(oauth2_scheme),
                      deal_controller: DealController = Depends(DealController)) -> JSONResponse:
    # return await deal_controller.create_deals(request, deal_dal)
    return {'token': token}

@router.get("/")
async def get_deals(request: DealRequest, deal_dal: DealDAL = Depends(get_deal_dal),
                    deal_controller: DealController = Depends(DealController)) -> JSONResponse:
    return await deal_controller.get_deals(request, deal_dal)
