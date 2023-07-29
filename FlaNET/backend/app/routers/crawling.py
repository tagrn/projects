# 표준 라이브러리
import time
import urllib.request as req
from sys import path as pth
from os import path

# 서드 파티 라이브러리
from bs4 import BeautifulSoup
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# 로컬
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from dependency import get_db
from database import models, schemas
from routers.data import create_user_data_set, check_user


router = APIRouter()


# 주식 현재가를 국가 및 기업code별 크롤링
@router.get(
    "/api/crawling/stocks/{data_list_id}/",
    tags=["crawling"],
    description="자동 크롤링을 위한 data_list_id별 크롤링",
)
def crawling_current_stock(data_list_id: int, db: Session = Depends(get_db)):
    url = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_id == data_list_id)
        .first()
    )
    if url:
        url = url.data_list_url
        html = req.urlopen(url).read()
        soup = BeautifulSoup(html, "html.parser")
        point = soup.find_all(class_="Mend(20px)")
        data = point[1].find("span")
        list_data = str(data).split(">")[1].split("<")[0].split(".")[0].split(",")
        res_data = str(data).split(">")[1].split("<")[0].split(".")[1]
        res_data = int(res_data) / (len(res_data) ** 10)

        for i in range(len(list_data) - 1, -1, -1):
            res_data += int(list_data[len(list_data) - 1 - i]) * 1000 ** i

        now = time.localtime()
        date = (
            str(now[0])
            + "-"
            + (str(now[1]) if len(str(now[1])) == 2 else ("0" + str(now[1])))
            + "-"
            + (str(now[2]) if len(str(now[2])) == 2 else ("0" + str(now[2])))
        )

        return {
            "data_set_date": date,
            "data_list_id": data_list_id,
            "data_set_value": res_data,
        }
    else:
        raise HTTPException(status_code=400, detail="data_list 미등록 데이터입니다.")


# 주식 현재가를 국가 및 기업code별 크롤링
@router.post(
    "/api/crawling/stocks",
    tags=["crawling"],
    description="사용자를 위한 data_list_id별 크롤링, History 저장",
)
def crawling_current_stock_for_user(
    data: schemas.UserCrawling, db: Session = Depends(get_db)
):
    if check_user(data.user_id):
        raise HTTPException(status_code=400, detail="유저가 유효하지 않습니다.")
    url = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_id == data.data_list_id)
        .first()
    )
    if url:
        url = url.data_list_url
        html = req.urlopen(url).read()
        soup = BeautifulSoup(html, "html.parser")
        point = soup.find_all(class_="Mend(20px)")
        get_data = point[1].find("span")
        list_data = str(get_data).split(">")[1].split("<")[0].split(".")[0].split(",")
        res_data = str(get_data).split(">")[1].split("<")[0].split(".")[1]
        res_data = int(res_data) / (len(res_data) ** 10)

        for i in range(len(list_data) - 1, -1, -1):
            res_data += int(list_data[len(list_data) - 1 - i]) * 1000 ** i

        now = time.localtime()
        date = (
            str(now[0])
            + "-"
            + (str(now[1]) if len(str(now[1])) == 2 else ("0" + str(now[1])))
            + "-"
            + (str(now[2]) if len(str(now[2])) == 2 else ("0" + str(now[2])))
        )
        db_data = schemas.UserDataSetBase(
            data_list_id=data.data_list_id,
            user_id=data.user_id,
            user_data_set_start=date,
            user_data_set_end=date,
        )
        return {
            "user_data_set":create_user_data_set(db, db_data),
            "data_set_date": date,
            "data_list_id": data.data_list_id,
            "data_set_value": res_data,
        }
    else:
        raise HTTPException(status_code=400, detail="data_list 미등록 데이터입니다.")


# 주식 가격을 일정 기간 데이터로 저장 및 반환
@router.post(
    "/api/crawling/stocks/period",
    tags=["crawling"],
    description="사용자에게 주식 가격을 일정 기간 데이터로 반환, History 저장",
)
def crawling_stock_period_data(
    data: schemas.UserDataSetInputBase, db: Session = Depends(get_db)
):
    if check_user(data.user_id):
        raise HTTPException(status_code=400, detail="유저가 유효하지 않습니다.")
    if 6 < data.data_list_id:
        raise HTTPException(status_code=400, detail="주식 데이터가 아닙니다.")
    url = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_id == data.data_list_id)
        .first()
    )
    if url:
        db_data = schemas.UserDataSetBase(
            data_list_id=data.data_list_id,
            user_id=data.user_id,
            user_data_set_start=data.user_data_set_start,
            user_data_set_end=data.user_data_set_end,
        )

        s_date = transform_date(data.user_data_set_start)
        e_date = transform_date(data.user_data_set_end)

        if s_date == -1 or e_date == -1:
            raise HTTPException(status_code=400, detail="유효한 날짜 데이터가 아닙니다.")

        if s_date > e_date:
            raise HTTPException(status_code=400, detail="시작 날짜가 종료 날짜보다 큽니다.")

        value_data = (
            db.query(models.DataSet)
            .filter(models.DataSet.data_list_id == data.data_list_id)
            .filter(models.DataSet.data_set_date >= data.user_data_set_start)
            .filter(models.DataSet.data_set_date <= data.user_data_set_end)
            .first()
        )

        if value_data:
            tmp = create_user_data_set(db, db_data)
        else:
            raise HTTPException(status_code=400, detail="해당 기간의 데이터가 존재하지 않습니다.")

        value_data = (
            db.query(models.DataSet)
            .filter(models.DataSet.data_list_id == data.data_list_id)
            .filter(models.DataSet.data_set_date >= data.user_data_set_start)
            .filter(models.DataSet.data_set_date <= data.user_data_set_end)
            .all()
        )

        return {
            "user_data_set": tmp,
            "data_set": value_data,
        }
    else:
        raise HTTPException(status_code=400, detail="data_list 미등록 데이터입니다.")


# 날짜 데이터 변환
def transform_date(date):
    try:
        res = int(date[:4]) * 365
        res += int(date[5:7]) * 30
        res += int(date[8:10])
        return res
    except:
        return -1


# 기온을 저장하기 위한 자동 크롤링 API
@router.get(
    "/api/crawling/temperatures/{data_list_id}/",
    tags=["crawling"],
    description="기온 자동 크롤링을 위한 data_list_id별 크롤링",
)
def crawling_current_temperature(data_list_id: int, db: Session = Depends(get_db)):
    url = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_id == data_list_id)
        .first()
    )
    if url:
        url = url.data_list_url
        yy = time.localtime().tm_year
        mm = time.localtime().tm_mon
        dd = time.localtime().tm_mday
        if len(str(mm)) == 1 and len(str(dd)) == 1:
            date = str(yy) + "-" + str(mm) + "-" + str(dd)
        elif len(str(mm)) == 1:
            date = str(yy) + "-0" + str(mm) + "-" + str(dd)
        elif len(str(dd)) == 1:
            date = str(yy) + "-" + str(mm) + "-0" + str(dd)
        else:
            date = str(yy) + "-0" + str(mm) + "-0" + str(dd)
        html = req.urlopen(f"{url}&yy={yy}&mm={mm}").read()
        soup = BeautifulSoup(html, "html.parser")

        data = []
        for i in range(1, dd):
            data.append(str(soup).split("평균기온")[i].split('℃')[0][1:])
        res_data = data[-1]

        return {
            "data_set_date": date,
            "data_list_id": data_list_id,
            "data_set_value": res_data,
        }
    else:
        raise HTTPException(status_code=400, detail="data_list 미등록 데이터입니다.")


# 사용자를 위한 현재 기온 크롤링
@router.post(
    "/api/crawling/temperatures",
    tags=["crawling"],
    description="사용자를 위한 data_list_id별 크롤링, History 저장",
)
def crawling_current_temperature_for_user(
    data: schemas.UserCrawling, db: Session = Depends(get_db)
):
    if check_user(data.user_id):
        raise HTTPException(status_code=400, detail="유저가 유효하지 않습니다.")
    url = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_id == data.data_list_id)
        .first()
    )
    if url:
        html = req.urlopen(f"https://www.weather.go.kr/weather/observation/currentweather.jsp").read()
        soup = BeautifulSoup(html, "html.parser")
        point = str(soup)[40000:].split("광주")[1]
        point2 = point.split("구미")[1]
        point3 = point2.split("대전")[1]
        point4 = point3.split("서울")[1]
        res10 = point.split('td')[14][1:].split('<')[0]
        res9 = point2.split('td')[14][1:].split('<')[0]
        res11 = point3.split('td')[14][1:].split('<')[0]
        res8 = point4.split('td')[14][1:].split('<')[0]
        if data.data_list_id == 8:
            res_data = res8
        elif data.data_list_id == 9:
            res_data = res9
        elif data.data_list_id == 10:
            res_data = res10
        else:
            res_data = res11
        now = time.localtime()
        date = (
            str(now[0])
            + "-"
            + (str(now[1]) if len(str(now[1])) == 2 else ("0" + str(now[1])))
            + "-"
            + (str(now[2]) if len(str(now[2])) == 2 else ("0" + str(now[2])))
        )
        db_data = schemas.UserDataSetBase(
            data_list_id=data.data_list_id,
            user_id=data.user_id,
            user_data_set_start=date,
            user_data_set_end=date,
        )
        return {
            "user_data_set":create_user_data_set(db, db_data),
            "data_set_date": date,
            "data_list_id": data.data_list_id,
            "data_set_value": res_data,
        }
    else:
        raise HTTPException(status_code=400, detail="data_list 미등록 데이터입니다.")


# 기온을 일정 기간 데이터로 저장 및 반환
@router.post(
    "/api/crawling/temperatures/period",
    tags=["crawling"],
    description="사용자에게 기온을 일정 기간 데이터로 반환, History 저장",
)
def crawling_temperatures_period_data(
    data: schemas.UserDataSetInputBase, db: Session = Depends(get_db)
):
    if check_user(data.user_id):
        raise HTTPException(status_code=400, detail="유저가 유효하지 않습니다.")
    if 8 > data.data_list_id:
        raise HTTPException(status_code=400, detail="기온 데이터가 아닙니다.")
    url = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_id == data.data_list_id)
        .first()
    )
    if url:
        db_data = schemas.UserDataSetBase(
            data_list_id=data.data_list_id,
            user_id=data.user_id,
            user_data_set_start=data.user_data_set_start,
            user_data_set_end=data.user_data_set_end,
        )

        s_date = transform_date(data.user_data_set_start)
        e_date = transform_date(data.user_data_set_end)

        if s_date == -1 or e_date == -1:
            raise HTTPException(status_code=400, detail="유효한 날짜 데이터가 아닙니다.")

        if s_date > e_date:
            raise HTTPException(status_code=400, detail="시작 날짜가 종료 날짜보다 큽니다.")

        value_data = (
            db.query(models.DataSet)
            .filter(models.DataSet.data_list_id == data.data_list_id)
            .filter(models.DataSet.data_set_date >= data.user_data_set_start)
            .filter(models.DataSet.data_set_date <= data.user_data_set_end)
            .first()
        )

        if value_data:
            tmp = create_user_data_set(db, db_data)
        else:
            raise HTTPException(status_code=400, detail="해당 기간의 데이터가 존재하지 않습니다.")

        value_data = (
            db.query(models.DataSet)
            .filter(models.DataSet.data_list_id == data.data_list_id)
            .filter(models.DataSet.data_set_date >= data.user_data_set_start)
            .filter(models.DataSet.data_set_date <= data.user_data_set_end)
            .all()
        )

        return {
            "user_data_set": tmp,
            "data_set": value_data,
        }
    else:
        raise HTTPException(status_code=400, detail="data_list 미등록 데이터입니다.")