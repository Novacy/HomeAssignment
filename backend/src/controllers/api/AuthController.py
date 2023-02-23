from fastapi import Depends
from src.requests.auth.LoginRequest import LoginRequest
# from passlib.context import CryptContext
from src.db.dals.user_dal import UserDAL
from src.db.dependencies import get_user_deal

# bcrypt_context = CryptContext(schemes=['bcrypt'], depreciated='auto')

class AuthController:
    def __init__(self):
        pass

    async def login(self, request: LoginRequest, user_dal: UserDAL = Depends(get_user_deal)):
        return await user_dal.create_user('abc', request.email, request.password)
        # return {'hello': 'request', 'request': request}

    async def logout(self):
        return {'hello': 'world'}
