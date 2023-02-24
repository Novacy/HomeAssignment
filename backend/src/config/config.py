import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

class Settings:
    DB_DIALECT=os.getenv('DB_DIALECT')
    DB_HOST=os.getenv('DB_HOST')
    DB_PORT=os.getenv('DB_PORT')
    DB_NAME=os.getenv('DB_NAME')
    DB_USERNAME=os.getenv('DB_USERNAME')
    DB_PASSWORD=os.getenv('DB_PASSWORD')
    SECRET_KEY=os.getenv('SECRET_KEY')
    ALGORITHM=os.getenv('ALGORITHM')
    ACCESS_TOKEN_EXPIRE_MINUTES=os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES') 

settings = Settings()
