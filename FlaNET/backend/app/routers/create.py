# 표준 라이브러리
from sys import path as pth
from os import path

# 서드 파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import pandas as pd

# 로컬
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db
from routers.data import check_data_set, create_data_set


router = APIRouter()


# 주식 데이터 입력
def create_stock_data_list(data: schemas.DataListBase, db: Session = Depends(get_db)):
    ans = check_data_list(data.data_list_name, data.stock_code, db)
    if ans:
        return create_data_list(db=db, data=data)
    elif ans == False:
        raise HTTPException(status_code=400, detail="이미 등록된 데이터입니다.")
    raise HTTPException(status_code=400, detail="잘못된 입력입니다.")


# 목록 주식 데이터 유효성 검사
def check_data_list(name, code, db):
    if (
        db.query(models.DataList)
        .filter(models.DataList.data_list_name == name)
        .filter(models.DataList.stock_code == code)
        .first()
    ):
        return False
    if name and code:
        return True


# 목록 사용자 정의 데이터 유효성 검사
def check_user_set(name, db):
    if db.query(models.DataList).filter(models.DataList.data_list_name == name).first():
        return False
    if name:
        return True


# 초기 데이터 목록 생성
@router.post("/api/create/init/datalist", tags=["create"], description="초기 데이터 목록 생성")
def create_initdata(db: Session = Depends(get_db)):
    data_list = [
        (
            "stock",
            "삼성전자",
            "https://finance.yahoo.com/quote/005930.KS?p=005930.KS&.tsrc=fin-srch",
            "005930",
        ),
        (
            "stock",
            "카카오",
            "https://finance.yahoo.com/quote/035720.KS?p=035720.KS&.tsrc=fin-srch",
            "035720",
        ),
        (
            "stock",
            "네이버",
            "https://finance.yahoo.com/quote/035420.KS?p=035420.KS&.tsrc=fin-srch",
            "035420",
        ),
        (
            "stock",
            "애플",
            "https://finance.yahoo.com/quote/AAPL?p=AAPL&.tsrc=fin-srch",
            "AAPL",
        ),
        (
            "stock",
            "테슬라",
            "https://finance.yahoo.com/quote/TSLA?p=TSLA&.tsrc=fin-srch",
            "TSLA",
        ),
        (
            "stock",
            "엔비디아",
            "https://finance.yahoo.com/quote/NVDA?p=NVDA&.tsrc=fin-srch",
            "NVDA",
        ),
        (
            "user",
            "사용자정의",
        ),
        (
            "temperature",
            "서울",
            "https://www.weather.go.kr/weather/climate/past_cal.jsp?stn=108&obs=1",
            "108",
        ),
        (
            "temperature",
            "구미",
            "https://www.weather.go.kr/weather/climate/past_cal.jsp?stn=279&obs=1",
            "279",
        ),
        (
            "temperature",
            "광주",
            "https://www.weather.go.kr/weather/climate/past_cal.jsp?stn=156&obs=1",
            "156",
        ),
        (
            "temperature",
            "대전",
            "https://www.weather.go.kr/weather/climate/past_cal.jsp?stn=133&obs=1",
            "133",
        ),
    ]

    cnt = 0
    for d in range(11):
        if d == 6:
            if check_user_set("사용자정의", db):
                u_data = models.DataList(
                    data_list_type="user",
                    data_list_name="사용자정의",
                )
                db.add(u_data)
                db.commit()
                db.refresh(u_data)
            else:
                cnt += 1
            continue
        data = schemas.DataListBase(
            data_list_type=data_list[d][0],
            data_list_name=data_list[d][1],
            data_list_url=data_list[d][2],
            stock_code=data_list[d][3],
        )
        if check_data_list(data_list[d][1], data_list[d][3], db):
            create_data_list(data, db)
        else:
            cnt += 1
    if cnt == 11:
        raise HTTPException(status_code=400, detail="이미 초기 데이터 목록이 등록되었습니다.")
    return HTTPException(status_code=200, detail="등록완료")


# 목록 데이터 생성
def create_data_list(data: schemas.DataListBase, db: Session):
    db_stocks = models.DataList(
        data_list_type=data.data_list_type,
        data_list_name=data.data_list_name,
        data_list_url=data.data_list_url,
        stock_code=data.stock_code,
    )
    db.add(db_stocks)
    db.commit()
    db.refresh(db_stocks)

    return db_stocks


# csv 초기 데이터 셋 입력
@router.post("/api/create/init/dataset", tags=["create"], description="csv 초기 데이터 셋 입력")
def create_init_data_set(db: Session = Depends(get_db)):
    for i in range(1, len(db.query(models.DataList).all()) + 1):
        if i < 7:
            try:
                data = pd.read_csv(
                    f"assets/data_list_{i}.csv", usecols=["Date", "Close"]
                )
            except:
                raise HTTPException(status_code=400, detail=f"{i}번째 초기 데이터가 없습니다.")
        elif i == 7:
            continue
        else:
            # 기온
            try:
                data = pd.read_csv(
                    f"assets/data_list_{i}.csv", usecols=["일시", "평균기온(°C)"], encoding='cp949'
                )
            except:
                raise HTTPException(status_code=400, detail=f"{i}번째 초기 데이터가 없습니다.")

        data_list = data.values
        cnt = 0

        for j in range(len(data_list)):
            try:
                float(data_list[j][1])
                if str(data_list[j][1]) == "nan":
                    continue
            except:
                continue
            if (
                db.query(models.DataSet)
                .filter(models.DataSet.data_list_id == i)
                .filter(models.DataSet.data_set_date == data_list[j][0])
                .first()
            ):
                continue
            db_stocks = models.DataSet(
                data_list_id=i,
                data_set_date=data_list[j][0],
                data_set_value=float(data_list[j][1]),
            )
            db.add(db_stocks)
            db.commit()
            cnt += 1

    return f"{cnt}개 데이터 입력"