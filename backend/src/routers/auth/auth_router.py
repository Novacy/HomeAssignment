from fastapi import APIRouter, Depends, Response
from src.requests.auth.LoginRequest import LoginRequest
from src.requests.auth.RegisterRequest import RegisterRequest
from src.controllers.api.AuthController import AuthController
from src.db.dals.user_dal import UserDAL
from src.db.dependencies import get_user_deal

router = APIRouter(
    prefix='/auth',
    tags=['Auth']
)


@router.post("/login")
async def login(request: LoginRequest,
                user_dal: UserDAL = Depends(get_user_deal),
                auth_controller: AuthController = Depends(AuthController)):
    # return await user_dal.create_user('request.name', request.email, request.password)
    return await auth_controller.login(request, user_dal)


@router.get("/logout")
async def logout(auth_controller: AuthController = Depends(AuthController)):
    return await auth_controller.logout()
