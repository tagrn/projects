# 표준 라이브러리
from sys import path as pth
from os import path

# 서드 파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import Date
from sqlalchemy.orm import Session
import pandas as pd

# 로컬
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db
from routers.data import check_data_set, create_data_set


router = APIRouter()


# 주식 데이터 입력
@router.post("/api/stocks/store/", tags=["post"], description="주식 데이터 직접 입력")
def store_stock_data(data: schemas.DataSet, db: Session = Depends(get_db)):
    ans = check_data_set(data.data_set_date, data.data_list_id, db)
    if ans == True:
        return create_data_set(db, data)
    elif ans == False:
        raise HTTPException(status_code=400, detail="이미 등록된 데이터입니다.")
    raise HTTPException(status_code=400, detail="데이터 목록에 없는 데이터입니다.")