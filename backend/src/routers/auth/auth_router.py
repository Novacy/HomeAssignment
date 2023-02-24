from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from src.requests.auth.LoginRequest import LoginRequest
from src.requests.auth.RegisterRequest import RegisterRequest
from src.controllers.api.AuthController import AuthController
from src.db.dals.user_dal import UserDAL
from src.db.dependencies import get_user_deal
from src.middleware.auth import auth

router = APIRouter(
    prefix='/auth',
    tags=['Auth']
)


@router.post("/login")
async def login(request: LoginRequest,
                user_dal: UserDAL = Depends(get_user_deal),
                auth_controller: AuthController = Depends(AuthController)) -> JSONResponse:
    return await auth_controller.login(request, user_dal)


@router.get("/logout")
async def logout(auth_controller: AuthController = Depends(AuthController),dependencies = Depends(auth())) -> JSONResponse:
    return await auth_controller.logout()


@router.post("/register")
async def register(request: RegisterRequest, user_dal: UserDAL = Depends(get_user_deal),
                   auth_controller: AuthController = Depends(AuthController)) -> JSONResponse:
    return await auth_controller.register(request, user_dal)
