# 표준 라이브러리
from sys import path as pth
from os import path

# 서드 파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

# 로컬
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db
from routers.data import check_user


router = APIRouter()


class XmlNameInput(BaseModel):
    user_data_predict_id: int
    user_data_predict_name: str


# 데이터 목록 확인
@router.get(
    "/api/data/userdatapredict/all",
    tags=["userdatapredict"],
    description="모든 사용자 예측 데이터 확인",
)
def show_all_user_data_predict(db: Session = Depends(get_db)):
    return {"user_data_predict": db.query(models.UserDataPredict).all()}


# 선택된 유저의 사용자 예측 데이터 확인
@router.get(
    "/api/data/userdatapredict/select/{user_id}",
    tags=["userdatapredict"],
    description="선택된 유저의 사용자 예측 데이터 확인",
)
def show_select_user_data_predict(user_id: str, db: Session = Depends(get_db)):
    if check_user(user_id):
        raise HTTPException(status_code=400, detail="유저가 유효하지 않습니다.")
    return {
        "user_data_predict": db.query(models.UserDataPredict)
        .filter(models.UserDataPredict.user_id == user_id)
        .all()
    }


# 해당 데이터의 현재 상태 xml 저장
@router.put(
    "/api/data/userdatapredict/xml/update",
    tags=["userdatapredict"],
    description="해당 데이터의 현재 상태 xml 저장",
)
def update_user_data_predict_xml(
    data: schemas.UserDataPredictXML,
    db: Session = Depends(get_db),
):
    db_data = (
        db.query(models.UserDataPredict)
        .filter(models.UserDataPredict.user_data_predict_id == data.user_data_predict_id)
        .first()
    )
    db_data.user_data_predict_xml = data.user_data_predict_xml
    db.commit()
    db.refresh(db_data)

    return {"user_data_predict": db_data}


# XML name 변경
@router.put(
    "/api/data/userdatapredict/name/update",
    tags=["userdatapredict"],
    description="xml name 변경",
)
def update_user_data_predict_name(xml_name_unput: XmlNameInput, db: Session = Depends(get_db)):

    db_data = (
        db.query(models.UserDataPredict)
        .filter(models.UserDataPredict.user_data_predict_id == xml_name_unput.user_data_predict_id)
        .one()
    )

    db_data.user_data_predict_name = xml_name_unput.user_data_predict_name

    db.commit()

    db.refresh(db_data)

    return
