# 표준 라이브러리
from datetime import datetime
from os import path, getenv
from sys import path as pth

# 서드 파티 라이브러리
from dotenv import load_dotenv
from fastapi import HTTPException
from jose import JWTError, jwt

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models


load_dotenv(verbose=True)
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")


def get_current_user(token: str, db):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        expired_time: int = payload.get("exp")
        current_time = datetime.timestamp(datetime.now())
        if expired_time < current_time:
            raise credentials_exception
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    current_user = db.query(models.User).filter(models.User.email == email).first()
    if current_user is None:
        raise credentials_exception
    return current_user