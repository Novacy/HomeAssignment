from pydantic import BaseModel, Field
from typing import Optional, Union, List


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
