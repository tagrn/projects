# 표준 라이브러리
from sys import path as pth
from os import path
import json

# 서드 파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import requests

# 로컬
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models
from dependency import get_db


router = APIRouter()

# 선택된 데이터 id의 유저 데이터 셋
@router.get(
    "/api/easy/userdataset/{user_data_set_id}",
    tags=["easy"],
    description="선택된 데이터 id의 유저 데이터 셋에 해당하는 데이터 가져오기",
)
def show_easy_user_data_set(user_data_set_id: int, db: Session = Depends(get_db)):
    data = (
        db.query(models.UserDataSet)
        .filter(models.UserDataSet.user_data_set_id == user_data_set_id)
        .all()
    )
    if data:
        data = data[0]
        if data.user_data_set_start and data.user_data_set_end:
            return {
                "data_set": db.query(models.DataSet)
                .filter(models.DataSet.data_list_id == data.data_list_id)
                .filter(models.DataSet.data_set_date >= data.user_data_set_start)
                .filter(models.DataSet.data_set_date <= data.user_data_set_end)
                .all()
            }
        else:
            csv_data = requests.get(
                f"{base_url}/csv/download/userdataset/json/{user_data_set_id}"
            ).text
            dcsv_data = json.loads(csv_data)
            dic = dict()
            dic["data_set"] = []

            for i in range(len(dcsv_data)):
                tmp = dict()
                tmp["data_list_id"] = 7
                if dcsv_data[i].get("Close"):
                    tmp["data_set_value"] = float(dcsv_data[i]["Close"])
                    tmp["data_set_date"] = dcsv_data[i]["Date"]
                    dic["data_set"].append(tmp)
                elif dcsv_data[i].get("평균기온(°C)"):
                    tmp["data_set_value"] = float(dcsv_data[i]["평균기온(°C)"])
                    tmp["data_set_date"] = dcsv_data[i]["일시"]
                    dic["data_set"].append(tmp)
                else:
                    raise HTTPException(
                        status_code=400, detail="파싱 불가능한 csv파일입니다. csv 파일서버에서 직접 불러오세요."
                    )

            return dic

    else:
        raise HTTPException(status_code=400, detail="유저 데이터 목록에 없는 데이터입니다.")


# 선택된 데이터 id의 유저 데이터 셋
@router.get(
    "/api/easy/userdataset/file/{user_data_set_id}",
    tags=["easy"],
    description="선택된 데이터 id의 유저 데이터 셋에 해당하는 파일 가져오기",
)
def download_easy_user_data_set(user_data_set_id: int, db: Session = Depends(get_db)):
    data = (
        db.query(models.UserDataSet)
        .filter(models.UserDataSet.user_data_set_id == user_data_set_id)
        .all()
    )
    if data:
        data = data[0]
        if data.user_data_set_start and data.user_data_set_end:
            tmp = (
                db.query(models.DataSet)
                .filter(models.DataSet.data_list_id == data.data_list_id)
                .filter(models.DataSet.data_set_date >= data.user_data_set_start)
                .filter(models.DataSet.data_set_date <= data.user_data_set_end)
                .all()
            )
            s_data = "data_list_id,data_set_date,data_list_value\n"
            for i in tmp:
                s_data += str(i.data_list_id) + ","
                s_data += str(i.data_set_value) + ","
                s_data += str(i.data_set_date) + "\n"
            return Response(
                s_data,
                media_type="application/octet-stream",
                headers={"Content-Disposition": 'inline; filename="user data.csv"'},
            )
        else:
            csv_data = requests.get(
                f"{base_url}/csv/download/userdataset/file/{user_data_set_id}"
            ).text
            return Response(
                csv_data,
                media_type="application/octet-stream",
                headers={"Content-Disposition": 'inline; filename="user data.csv"'},
            )

    else:
        raise HTTPException(status_code=400, detail="유저 데이터 목록에 없는 데이터입니다.")