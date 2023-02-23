from pydantic import BaseModel, Field
from typing import Optional, Union, List


class DealRequest(BaseModel):
    title: str
    description: Optional[str]
    priority: int = Field(gt=0, lt=6, description='Priority must be between 1 to 5')
    complete: bool