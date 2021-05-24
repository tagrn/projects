# 표준 라이브러리
from os import getenv

# 서드 파티 라이브러리
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# DB 키 습득
load_dotenv(verbose=True)
DB_USER = getenv("DB_USER")
DB_NAME = getenv("DB_NAME")
DB_URL = getenv("DB_URL")

# 숨겨진 키로 DB 연결
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://" + DB_USER + DB_URL + DB_NAME

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()