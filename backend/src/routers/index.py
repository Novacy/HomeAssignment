from src.routers.auth import auth_router
from src.routers.deal import deal_router
from fastapi import APIRouter

baseRouter = APIRouter(
    prefix="/api",
)

baseRouter.include_router(auth_router.router)
baseRouter.include_router(deal_router.router)
