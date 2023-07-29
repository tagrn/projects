# 표준 라이브러리
import time, json
import urllib.request as req
from sys import path as pth
from os import path

# 서드 파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# 로컬
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from dependency import get_db
from database import models, schemas
from routers.data import create_user_data_set


router = APIRouter()


# 크롤링 코드 반환
@router.get(
    "/api/code/crawling/{data_list_id}",
    tags=["code"],
    description="실시간 크롤링 코드 반환",
)
def crawling_stock_code(data_list_id: int, db: Session = Depends(get_db)):
    if data_list_id == 7:
        raise HTTPException(status_code=400, detail="data_list 잘못된 데이터 접근입니다.")
    url = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_id == data_list_id)
        .first()
    )

    s = ""
    s += "import urllib.request as req\n"
    s += "from bs4 import BeautifulSoup\n\n\n"
    if data_list_id > 7:
        s += f"html = req.urlopen('https://www.weather.go.kr/weather/observation/currentweather.jsp').read()\n"
    else:
        s += f"html = req.urlopen('{url.data_list_url}').read()\n"
    s += "soup = BeautifulSoup(html, 'html.parser')"

    return {"code": s}


# 기간별 주식 크롤링 코드 반환
@router.get(
    "/api/code/crawling/{data_list_id}/period",
    tags=["code"],
    description="기간별 주식 크롤링 코드 반환",
)
def crawling_stock_code(data_list_id: int, db: Session = Depends(get_db)):
    if data_list_id == 7:
        raise HTTPException(status_code=400, detail="data_list 잘못된 데이터 접근입니다.")
    url = (
        db.query(models.DataList)
        .filter(models.DataList.data_list_id == data_list_id)
        .first()
    )
    temp_url = url.data_list_url
    tmp = url.data_list_url.split("?")
    url = tmp[0] + "/history?" + tmp[1]
    s = ""
    s += "import urllib.request as req\n"
    s += "from bs4 import BeautifulSoup\n\n\n"
    if data_list_id > 7:
        s += f"html = req.urlopen('{temp_url}&yy=<%해당 년도(ex.2021)%>&mm=<%해당 월(ex.3)%>').read()\n"
    else:
        s += f"html = req.urlopen('{url}').read()\n"
    s += "soup = BeautifulSoup(html, 'html.parser')"

    return {"code": s}


# 실시간 크롤링 데이터 전처리 코드 반환
@router.get(
    "/api/code/dataprocessing/stock",
    tags=["code"],
    description="실시간 주식 크롤링 데이터 전처리 코드 반환",
)
def crawling_stock_dataprocessing_code():
    s = ""
    s += "point = soup.find_all(class_='Mend(20px)')\n"
    s += "data = point[1].find('span')\n"
    s += "print(str(data).split('>')[1].split('<')[0])"

    return {"code": s}


# 기간 크롤링 데이터 전처리 코드 반환
@router.get(
    "/api/code/dataprocessing/stock/period",
    tags=["code"],
    description="기간 주식 크롤링 데이터 전처리 코드 반환",
)
def crawling_period_stock_dataprocessing_code():
    s = ""    
    s += "point = soup.find_all('td')\n"
    s += "for i in range(4, len(point), 7):\n"
    s += "    print(str(point[i]).split('>')[2].split('<')[0])"

    return {"code": s}


# 실시간 기온 크롤링 데이터 전처리 코드 반환
@router.get(
    "/api/code/dataprocessing/temperature",
    tags=["code"],
    description="실시간 기온 크롤링 데이터 전처리 코드 반환",
)
def crawling_temperature_dataprocessing_code():
    s = ""
    s += "point = str(soup)[40000:].split('<%지역이름(ex.구미)%>')[1]\n"
    s += "res = point.split('td')[14][1:].split('<')[0]\n"
    s += "print(res)"

    return {"code": s}


# 기간 기온 크롤링 데이터 전처리 코드 반환
@router.get(
    "/api/code/dataprocessing/temperature/period",
    tags=["code"],
    description="기간 기온 크롤링 데이터 전처리 코드 반환",
)
def crawling_period_temperature_dataprocessing_code():
    s = ""
    s += "# 찾을 일자는 월마다 최대 28~31이며, 미래에 대해서는 제공하지 않습니다.\n"
    s += "for i in range(<%찾을 시작일자(1~31)%>, <%찾을 끝일자(1~31)%>):\n"
    s += "    print(str(soup).split('평균기온')[i].split('℃')[0][1:])"

    return {"code": s}