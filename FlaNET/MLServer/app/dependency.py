# 표준 라이브러리
from functools import lru_cache

# 로컬
from common import consts
from database import database


# db연결
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 환경변수 캐싱
@lru_cache()
def get_settings():
    return consts.Settings()