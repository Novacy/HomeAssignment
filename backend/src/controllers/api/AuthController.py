from fastapi import Depends
from src.responses.response import respond
from src.requests.auth.LoginRequest import LoginRequest
from src.requests.auth.RegisterRequest import RegisterRequest
# from passlib.context import CryptContext
from src.db.dals.user_dal import UserDAL
from src.db.dependencies import get_user_deal

# bcrypt_context = CryptContext(schemes=['bcrypt'], depreciated='auto')

class AuthController:
    def __init__(self):
        pass

    async def login(self, request: LoginRequest, user_dal: UserDAL = Depends(get_user_deal)):
        # return await user_dal.create_user('abc', request.email, request.password)
        return await respond('stress', 201)

    async def logout(self):
        return await respond('logout successful', 200)

    async def register(self, request: RegisterRequest, user_dal: UserDAL = Depends(get_user_deal)):
        await user_dal.create_user(request.name, request.email, request.password)
