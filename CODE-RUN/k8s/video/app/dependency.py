# 로컬 라이브러리
from database import database


# db연결
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()