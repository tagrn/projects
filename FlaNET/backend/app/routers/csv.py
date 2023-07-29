# 표준 라이브러리
import urllib.request as req
from sys import path as pth
from os import path
from ast import literal_eval
import time

# 서드 파티 라이브러리
from bs4 import BeautifulSoup
from fastapi import APIRouter, Depends, HTTPException, File, Form
from sqlalchemy.orm import Session
import requests

# 로컬
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from dependency import get_db
from database import models, schemas
from routers.data import check_user


router = APIRouter()


# csv 파일 업로드
@router.post("/api/csv/upload/userdataset", tags=["csv"], description="사용자정의 csv 파일 업로드")
def show_all_data_list(
    file: bytes = File(...), user_id: str = Form(...), db: Session = Depends(get_db)
):
    if check_user(user_id):
        raise HTTPException(status_code=400, detail="유저가 유효하지 않습니다.")
    data_list_id = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_name == "사용자정의")
        .all()[0]
        .data_list_id
    )
    if user_id:
        db_data = models.UserDataSet(
            data_list_id=data_list_id, user_id=user_id, user_data_set_date=time.localtime()
        )
        db.add(db_data)
        db.commit()
        db.refresh(db_data)

    user_data_set_id = db.query(models.UserDataSet).all()[-1].user_data_set_id
    data = {"user_data_set_id": user_data_set_id}
    upload = {'file':file}
    try:
        requests.post("{base_url}/csv/upload/userdataset", files = upload, data=data)
    except:
        raise HTTPException(status_code=400, detail="저장 실패")
    return {"user_data_set":db_data}