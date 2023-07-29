# 표준 라이브러리
from os import getenv

# 서드 파티 라이브러리
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv


# DB 키 습득
load_dotenv(verbose=True)
DB_USER = getenv("DB_USER")
DB_NAME = getenv("DB_NAME")

# 숨겨진 키로 DB 연결 / 하지만 지금은 default 값을 두었습니다.
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://" + DB_USER + "@{base_url}/" + DB_NAME

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()