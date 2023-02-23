from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    email: str
    password: str