import sys
sys.path.append("..")

from fastapi import APIRouter

router = APIRouter()

router = APIRouter(
    prefix="",
    tags=["Authentication"]
)

@router.post("/login")
async def login():
    return "HI"