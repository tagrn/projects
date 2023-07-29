# 서드 파티 라이브러리
from sqlalchemy.orm import Session
from sqlalchemy import and_
from sqlalchemy.sql.functions import now

# 로컬
from . import models
import datetime


# 스톡 목록 확인
def get_all_stocks(db: Session):
    return db.query(models.DataSet).all()


# 주식 코드와 일치한 목록 확인
def get_stocks_by_code11(db: Session, code: str):
    return db.query(models.DataSet).filter(models.DataSet.data_list_id == code).all()


# 주식 코드와 일치한 목록 확인
def get_data_list_by_id(db: Session, code: str):
    data_list = db.query(models.DataList).filter(models.DataList.stock_code == code).one()
    return (
        db.query(models.DataSet).filter(models.DataSet.data_list_id == data_list.data_list_id).all()
    )


# 기간별 주식 코드와 일치한 목록 확인
def get_data_list_by_id_date(db: Session, start_date: str, end_date: str, code: int):
    return (
        db.query(models.DataSet)
        .filter(models.DataSet.data_list_id == code)
        .filter(
            and_(
                models.DataSet.data_set_date >= start_date, models.DataSet.data_set_date <= end_date
            )
        )
        .all()
    )


# userdateset 저장 후 user_date_set_id 리턴, //7번이면 csv
def insert_user_data_set(
    data_list_id, user_id, user_data_set_start, user_data_set_end, db: Session
):
    if user_data_set_start == None:
        db_user_data = models.UserDataSet(
            data_list_id=data_list_id, user_id=user_id, user_data_set_date=datetime.datetime.now()
        )
    else:
        db_user_data = models.UserDataSet(
            data_list_id=data_list_id,
            user_id=user_id,
            user_data_set_start=user_data_set_start,
            user_data_set_end=user_data_set_end,
            user_data_set_date=datetime.datetime.now(),
        )

    db.add(db_user_data)
    db.commit()
    db.refresh(db_user_data)

    return db_user_data.user_data_set_id


# user_data_set 테이블 조회
def get_user_data_set(user_data_set_id, db: Session):
    data = (
        db.query(models.UserDataSet)
        .filter(models.UserDataSet.user_data_set_id == user_data_set_id)
        .one()
    )
    return data


# predict 데이터 삽입
def insert_user_data_predict(user_data_set_id, training_model_id, user_id, db: Session):
    db_user_data = models.UserDataPredict(
        user_data_set_id=user_data_set_id,
        training_model_id=training_model_id,
        user_id=user_id,
        user_data_predict_date=datetime.datetime.now(),
    )

    db.add(db_user_data)
    db.commit()
    db.refresh(db_user_data)

    return db_user_data


# model 데이터 삽입
def insert_training_model(user_id, db: Session):
    db_training_model = models.TrainingModel(
        user_id=user_id, training_model_date=datetime.datetime.now()
    )

    db.add(db_training_model)
    db.commit()
    db.refresh(db_training_model)

    return db_training_model