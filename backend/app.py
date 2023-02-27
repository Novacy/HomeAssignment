import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from src.db.config import engine, Base
from src.routers import index

app = FastAPI()
app.include_router(index.baseRouter)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def index():
    return {'message': 'Hello World'}


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.on_event('startup')
async def startup():
    await init_db()


if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")