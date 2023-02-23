from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

async def respond(message:str = 'Success', code: int = 200, data: object = {})->JSONResponse:
    return JSONResponse(content={'message': message, 'data': data}, status_code=code)