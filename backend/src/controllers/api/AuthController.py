from datetime import datetime, timedelta
from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from src.responses.response import respond
from src.requests.auth.LoginRequest import LoginRequest
from src.requests.auth.RegisterRequest import RegisterRequest
from passlib.context import CryptContext
from jose import JWTError, jwt
from src.db.dals.user_dal import UserDAL
from src.db.dependencies import get_user_deal

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

bcrypt_context = CryptContext(schemes=['bcrypt'])


def verify_password(plain_password, hashed_password):
    return bcrypt_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return bcrypt_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
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
                'token': create_access_token({'email': user.email})
            }
            return await respond('Login successful', 200, data)
        else:
            return await respond('Invalid Credentials', 400)

    async def logout(self):
        return await respond('logout successful', 200)

    async def register(self, request: RegisterRequest, user_dal: UserDAL = Depends(get_user_deal)):
        hashed_password = get_password_hash(request.password)
        await user_dal.create_user(request.name, request.email, hashed_password)
        data = {
            'name': request.name,
            'email': request.email,
            'token': create_access_token({'email': request.email})
        }
        return await respond('registration successful', 201, data)

    # async def get_current_user(token: str = Depends(oauth2_scheme)):
    #     credentials_exception = HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Could not validate credentials",
    #         headers={"WWW-Authenticate": "Bearer"},
    #     )
    #     try:
    #         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    #         username: str = payload.get("sub")
    #         if username is None:
    #             raise credentials_exception
    #         token_data = TokenData(username=username)
    #     except JWTError:
    #         raise credentials_exception
    #     user = get_user(fake_users_db, username=token_data.username)
    #     if user is None:
    #         raise credentials_exception
    #     return user
