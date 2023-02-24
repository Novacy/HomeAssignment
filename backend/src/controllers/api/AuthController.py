from datetime import datetime, timedelta
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.encoders import jsonable_encoder
from typing import Optional
from src.responses.response import respond
from src.requests.auth.LoginRequest import LoginRequest
from src.requests.auth.RegisterRequest import RegisterRequest
from src.config.config import settings
from passlib.context import CryptContext
from jose import JWTError, jwt
from src.db.dals.user_dal import UserDAL
from src.db.dependencies import get_user_deal

bcrypt_context = CryptContext(schemes=['bcrypt'])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return bcrypt_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return bcrypt_context.hash(password)


def create_access_token(email: str, id: int, expires_delta: Optional[timedelta]=None):
    to_encode = {
        "sub": email,
        "id": id,
    }
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
            
class AuthController:
    def __init__(self):
        pass

    async def login(self, request: LoginRequest, user_dal: UserDAL = Depends(get_user_deal)):
        user = await user_dal.get_user_by_email(request.email)
        if not user:
            return await respond('Invalid Credentials', 400)
        if verify_password(request.password, user.password):
            data = {
                'name': user.name,
                'email': user.email,
                'token': create_access_token(user.email, user.id)
            }
            return await respond('Login successful', 200, data)
        else:
            return await respond('Invalid Credentials', 400)

    async def logout(self):
        return await respond('logout successful', 200)

    async def register(self, request: RegisterRequest, user_dal: UserDAL = Depends(get_user_deal)):
        hashed_password = get_password_hash(request.password)
        user = await user_dal.create_user(request.name, request.email, hashed_password)
        data = {
            'name': request.name,
            'email': request.email,
            'token': create_access_token(request.email, user.id)
        }
        return await respond('registration successful', 201, data)

