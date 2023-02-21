import uvicorn
from fastapi import FastAPI, Request
from routers import main

app = FastAPI()

app.include_router(main.router)

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
