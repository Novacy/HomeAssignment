from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.db.dals.user_dal import UserDAL
from src.config.config import settings
from src.db.dependencies import get_user_deal
from jose import jwt

class auth(HTTPBearer):
    def __init__(self, auto_Error: bool = True):
        super(auth, self).__init__(auto_error=auto_Error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(auth, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code = 403, details = "Invalid or Expired Token!")
            return credentials.credentials
        else:
            raise HTTPException(status_code = 403, details = "Invalid or Expired Token!")
    
    def verify_jwt(self, jwt_token: str, user_dal: UserDAL = Depends(get_user_deal)):
        isTokenValid: bool = False
        payload = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        email: str = payload.get("sub")
        user_id: int = payload.get("id")
        if email is not None or user_id is not None:
            isTokenValid = True
        return isTokenValid