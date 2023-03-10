import uvicorn
from fastapi import FastAPI, Request

app = FastAPI()


@app.get('/')
async def index():
    return {'message': 'Hello World'}

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
