# 표준 라이브러리
from datetime import datetime, timedelta
from hashlib import sha256
from os import path, getenv
from sys import path as pth
from typing import Optional
from random import choice

# 서드 파티 라이브러리
from dotenv import load_dotenv
from fastapi import APIRouter, BackgroundTasks, Depends, Header, HTTPException
from fastapi.responses import RedirectResponse
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy import func
from sqlalchemy.orm import Session
import yagmail

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from . import raiseException
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


@router.post("/api/signup", tags=["user"], description="회원가입")
async def signup(
    data: schemas.UserBase,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    validate_email(data.email)
    validate_password(data.password)
    check_duplicate_email(data.email, db)
    u_data = models.User(
        email=data.email, password=get_password_hash(data.password), name=data.name
    )
    db.add(u_data)
    db.commit()
    db.refresh(u_data)
    background_tasks.add_task(confirm_email, to_email=data.email, user_id=u_data.id)
    u_data.profile = f"https://www.코드런.com/image/profile/{u_data.id}"
    db.commit()
    return {"data": "success"}


@router.post("/api/login", tags=["user"], description="로그인")
def login(data: schemas.LoginBase, db: Session = Depends(get_db)):
    current_user = db.query(models.User).filter(models.User.email == data.email).first()
    validate_email(data.email)
    validate_password(data.password)
    if verify_password(data.password, current_user.password):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        jwt_token = create_access_token(
            data={"sub": current_user.email}, expires_delta=access_token_expires
        )
        del current_user.password
        del current_user.security_count
        if current_user.active:
            return {"user": current_user, "token": jwt_token}
        return {"user": current_user}
    raise raiseException.Raise_401_Error()


@router.post("/api/newpassword", tags=["user"], description="비밀번호 찾기 -> 새 비밀번호 주기")
def get_new_password(
    data: schemas.FindUserPassword,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    u_data = db.query(models.User).filter(models.User.email == data.email).first()
    if not u_data:
        raise HTTPException(status_code=404, detail="No user")
    random_arr = [chr(i) for i in range(64, 91)]
    random_arr += [chr(i) for i in range(97, 123)]
    random_arr += [str(i) for i in range(10)]
    random_arr += [chr(i) for i in range(35, 39)]
    random_arr += ["!"]
    s = ""
    for _ in range(12):
        s += choice(random_arr)
    background_tasks.add_task(
        send_new_password, to_email=data.email, temp_pw=s, user_id=u_data.id
    )
    return {"send": "success"}


def send_new_password(to_email: str, temp_pw: str, user_id: int):
    pw = jwt.decode(PW, SECRET_KEY, algorithms=[ALGORITHM])["pw"]
    res = sha256(temp_pw.encode()).hexdigest()
    yag = yagmail.SMTP(SENDER, pw)
    to = to_email
    subject = "CODE:RUN 임시 비밀번호"
    body = ""
    html = f"""
    <h1>안녕하세요 CODE:RUN입니다.</h1>
    <h3>회원님의 임시 비밀번호는 {temp_pw} 입니다. </h3>
    <h3>밑의 버튼을 누르면 회원님의 비밀번호가 임시 비밀번호로 변경됩니다.</h3>
    <a href="https://www.코드런.com/api/newpassword/redirect/{to_email}/{user_id}/{res}"> 비밀번호 변경 </a>
    """
    img = ""
    yag.send(to=to, subject=subject, contents=[body, html, img])
    return {"send": "success"}


@router.get("/api/emailcheck/{email}", tags=["user"], description="이메일 가입 중복 체크")
def check_duplicate_email(email: str, db: Session = Depends(get_db)):
    e_mail = db.query(models.User).filter(models.User.email == email).first()
    if e_mail:
        raise raiseException.Raise_400_Error()
    return {"data": email}


@router.get(
    "/api/emailconfirm/message/{email}", tags=["user"], description="인증 메일 다시 보내기"
)
def resend_confirm_email(
    email: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)
):
    u_data = db.query(models.User).filter(models.User.email == email).first()
    if u_data.security_count >= 10:
        return {"data": "fail"}
    u_data.security_count += 1
    if not u_data:
        raise raiseException.Raise_404_Error()
    if u_data.active:
        raise raiseException.Raise_400_Error()
    background_tasks.add_task(confirm_email, to_email=email, user_id=u_data.id)
    db.commit()
    return {"data": "success"}


def confirm_email(to_email: str, user_id: int):
    pw = jwt.decode(PW, SECRET_KEY, algorithms=[ALGORITHM])["pw"]
    yag = yagmail.SMTP(SENDER, pw)
    to = to_email
    subject = "CODE:RUN 이메일 인증"
    body = ""
    html = f"""
    <h1>안녕하세요 CODE:RUN입니다.</h1>
    <h3>회원가입을 진행하려면 밑의 버튼을 눌러주세요</h3>
    <a href="https://www.코드런.com/api/emailconfirm/redirect/{to_email}/{user_id}"> 이메일 인증 </a>
    """
    img = ""
    yag.send(to=to, subject=subject, contents=[body, html, img])
    return {"send": "success"}


def validate_email(email: str):
    if "@" not in email or "." not in email:
        raise raiseException.Raise_422_Error()
    try:
        email.split("@")[1].split(".")[0][0]
    except Exception:
        raise raiseException.Raise_422_Error()
    try:
        email.split("@")[1].split(".")[1][0]
    except Exception:
        raise raiseException.Raise_422_Error()


def validate_password(password: str):
    if len(password) != 64:
        raise raiseException.Raise_422_Error()


@router.get(
    "/api/emailconfirm/redirect/{email}/{user_id}",
    tags=["user"],
    description="확인 후 페이지 리다이렉트",
)
def redirect_site(email: str, user_id: int, db: Session = Depends(get_db)):
    u_data = db.query(models.User).filter(models.User.email == email).first()
    if u_data:
        if u_data.id == user_id:
            u_data.active = True
            db.commit()
            return RedirectResponse("https://www.코드런.com/account/success")
    raise raiseException.Raise_400_Error()


@router.get(
    "/api/newpassword/redirect/{email}/{user_id}/{tmp_pw}",
    tags=["user"],
    description="변경 후 페이지 리다이렉트",
)
def redirect_site_pw(
    email: str, user_id: int, tmp_pw: str, db: Session = Depends(get_db)
):
    u_data = db.query(models.User).filter(models.User.email == email).first()
    if u_data:
        if u_data.id == user_id:
            pw = get_password_hash(tmp_pw)
            u_data.password = pw
            db.commit()
            return RedirectResponse("https://www.코드런.com/account")
    raise raiseException.Raise_400_Error()


@router.get("/api/user/data/{user_id}", tags=["user"], description="유저 상세 정보 조회")
def get_user_data(
    user_id: int, token: Optional[str] = Header(None), db: Session = Depends(get_db)
):
    get_current_user(token, db)
    u_data = db.query(models.User).filter(models.User.id == user_id).first()
    u_data.video
    u_data.video_list 
    if u_data:
        del u_data.password
        del u_data.security_count
        del u_data.active
        return {"data": u_data}
    raise raiseException.Raise_404_Error()


@router.put("/api/user/data/update", tags=["user"], description="유저 정보 수정")
def update_user_data(
    data: schemas.UserUpdateBase, token: Optional[str] = Header(None), db: Session = Depends(get_db)
):
    current_user = get_current_user(token, db)
    u_data = db.query(models.User).filter(models.User.id == current_user.id).first()
    if u_data:
        if data.password:
            pw = get_password_hash(data.password)
            u_data.password = pw
        if data.name:
            u_data.name = data.name
        db.commit()
        db.refresh(u_data)
        del u_data.password
        del u_data.security_count
        return {"user": u_data}
    raise raiseException.Raise_404_Error()


@router.get("/api/user/profile/log/{user_id}", tags=["user"], description="유저 프로필 정보 조회")
def get_user_profile_info(
    user_id: int, 
    db: Session = Depends(get_db),
):
    video_cnt = len(db.query(models.Video).join(models.User, models.User.id == models.Video.user_id).filter(models.Video.user_id == user_id).all())
    videolist_cnt = len(db.query(models.VideoList).join(models.User, models.User.id == models.VideoList.user_id).filter(models.VideoList.user_id == user_id).all())
    select_cnt = len(db.query(models.BoardComment).join(models.User, models.User.id == models.BoardComment.user_id).filter(models.BoardComment.select == True).filter(models.BoardComment.user_id == user_id).all())
    return {"video_cnt": video_cnt, "videolist_cnt": videolist_cnt, "select_cnt": select_cnt}