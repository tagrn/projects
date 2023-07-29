# 표준 라이브러리
from datetime import datetime, timedelta
from os import path, getenv
from sys import path as pth
from typing import Optional

# 서드 파티 라이브러리
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db


router = APIRouter()

load_dotenv(verbose=True)
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")
SENDER = getenv("SENDER")
PW = getenv("PW")

ACCESS_TOKEN_EXPIRE_MINUTES = 120 * 12

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/api/develop/signup/{pw}", tags=["develop"], description="회원가입")
async def signup(
    pw: str,
    data: schemas.UserBase,
    db: Session = Depends(get_db),
):
    if pw != "yso":
        raise HTTPException(status_code=401, detail="Incorrect pw")
    u_data = models.User(
        email=data.email,
        password=get_password_hash(data.password),
        name=data.name,
        active=True,
    )
    db.add(u_data)
    db.commit()
    db.refresh(u_data)
    del u_data.password
    return {"data": u_data}


@router.post("/api/develop/login/{pw}", tags=["develop"], description="로그인")
def login(pw: str, data: schemas.LoginBase, db: Session = Depends(get_db)):
    if pw != "yso":
        raise HTTPException(status_code=401, detail="Incorrect pw")
    current_user = db.query(models.User).filter(models.User.email == data.email).first()
    if not current_user.active:
        raise HTTPException(status_code=401, detail="Verify your e-mail first")
    if verify_password(data.password, current_user.password):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        jwt_token = create_access_token(
            data={"sub": current_user.email}, expires_delta=access_token_expires
        )
        del current_user.password
        return {"user": current_user, "token": jwt_token}
    raise HTTPException(status_code=401, detail="Incorrect user")


@router.get("/api/develop/check/{table}/{pw}", tags=["develop"], description="테이블 확인")
def get_video_detail(
    table: str,
    pw: str,
    db: Session = Depends(get_db),
):
    if pw != "yso":
        raise HTTPException(status_code=401, detail="Incorrect pw")
    if table == "user":
        return {"data": db.query(models.User).all()}
    if table == "video":
        return {"data": db.query(models.Video).all()}
    if table == "video_comment":
        return {"data": db.query(models.VideoComment).all()}
    if table == "like":
        return {"data": db.query(models.Like).all()}
    if table == "video_list":
        return {"data": db.query(models.VideoList).all()}
    if table == "video_list_data":
        return {"data": db.query(models.VideoListData).all()}
    if table == "language_tag":
        return {"data": db.query(models.LanguageTag).all()}
    if table == "subject_tag":
        return {"data": db.query(models.SubjectTag).all()}
    if table == "subject_user_tag":
        return {"data": db.query(models.SubjectUserTag).all()}
    if table == "algorithm_tag":
        return {"data": db.query(models.AlgorithmTag).all()}
    if table == "algorithm_user_tag":
        return {"data": db.query(models.AlgorithmUserTag).all()}
    if table == "board":
        return {"data": db.query(models.Board).all()}
    if table == "board_comment":
        return {"data": db.query(models.BoardComment).all()}

    raise HTTPException(status_code=400, detail="해당 테이블이 없습니다.")


@router.get("/api/develop/create/tag/language/{pw}", tags=["develop"], description="언어 태그 초기데이터 생성")
def create_language_init_tags(pw: str, db: Session = Depends(get_db)):
    languages = ["C/C++", "Java", "JavaScript", "Python", "기타"]
    languages.sort()
    cnt = 0
    for i in range(len(languages)):
        if db.query(models.LanguageTag).filter(models.LanguageTag.language_name == languages[i]).first():
            cnt += 1
        else:
            lt_data = models.LanguageTag(language_name = languages[i])
            db.add(lt_data)
            db.commit()
    if cnt == len(languages):
        return {"data": "Already initialization"}
    return {"data": f"Add {len(languages) - cnt} languages in Language Tag Table"}


@router.get("/api/develop/create/tag/algorithm/{pw}", tags=["develop"], description="알고리즘 태그 초기데이터 생성")
def create_algorithm_init_tags(pw: str, db: Session = Depends(get_db)):
    algorithms = ["그리디", "구현", "완전탐색", "수학", "그래프", "다이나믹프로그래밍", "이분탐색", "분할정복"]
    algorithms.sort()
    cnt = 0
    for i in range(len(algorithms)):
        if db.query(models.AlgorithmTag).filter(models.AlgorithmTag.algorithm_name == algorithms[i]).first():
            cnt += 1
        else:
            at_data = models.AlgorithmTag(algorithm_name = algorithms[i])
            db.add(at_data)
            db.commit()
    if cnt == len(algorithms):
        return {"data": "Already initialization"}
    return {"data": f"Add {len(algorithms) - cnt} algorithms in Algorithm Tag Table"}


@router.get("/api/develop/create/tag/subject/{pw}", tags=["develop"], description="CS 태그 초기데이터 생성")
def create_cs_init_tags(pw: str, db: Session = Depends(get_db)):
    cses = ["네트워크", "데이터베이스", "알고리즘", "운영체제", "자료구조", "컴퓨터구조", "기타"]
    cnt = 0
    for i in range(len(cses)):
        if db.query(models.SubjectTag).filter(models.SubjectTag.subject_name == cses[i]).first():
            cnt += 1
        else:
            ct_data = models.SubjectTag(subject_name = cses[i])
            db.add(ct_data)
            db.commit()
    if cnt == len(cses):
        return {"data": "Already initialization"}
    return {"data": f"Add {len(cses) - cnt} CS in Subject Tag Table"}