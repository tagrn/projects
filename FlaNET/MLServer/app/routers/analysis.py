# 표준 라이브러리
from sys import path as pth
from os import path, remove
from io import StringIO
import csv
import codecs


# 서드 파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import pandas as pd
import requests


# 로컬
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import crud
from dependency import get_db
import model.prophet as pr
import model.tf as tf
import routers.codes as codes

router = APIRouter()


class TfInput(BaseModel):
    user_data_set_id: int


class TfPreprocess(BaseModel):
    input_raw_data: dict
    set_rate: float


class TfTraining(BaseModel):
    input_processed_data: dict
    user_id: str


class TfCustomTraining(BaseModel):
    input_processed_data: dict
    input_layer: list
    user_id: str


class TfEvaluate(BaseModel):
    input_processed_data: dict
    training_model_id: int


class TfPredict(BaseModel):
    user_data_set_id: int
    input_processed_data: dict
    training_model_id: int
    user_id: str
    period: int


class ProphetInput(BaseModel):
    user_data_set_id: int
    periods: int
    cps: float


@router.post("/ml/prophet/stock/", tags=["prophet"], description=" 데이터 입력")
def analysis_prophet(
    prophet_input: ProphetInput,
    db: Session = Depends(get_db),
):
    user_data_set_id = prophet_input.user_data_set_id
    periods = prophet_input.periods
    cps = prophet_input.cps

    analysis_value = "Close"
    data = crud.get_user_data_set(user_data_set_id=user_data_set_id, db=db)

    # csv
    if data.user_data_set_start == None:  # 7
        original_df, analysis_value = csv_data_call(data)
        df = pd.read_csv(StringIO(original_df.to_csv()), index_col="Date")
        df = df.drop(["Unnamed: 0"], axis=1)
    # 기간별
    else:
        original_df, analysis_value = db_data_call(data, db=db)
        df = pd.read_csv(StringIO(original_df.to_csv()), index_col="Date")  # 기본 인덱스는 날짜기준.
        df.sort_values(by=["Date"], axis=0, inplace=True)  # date 기준 내림차순 정렬
        df = df.drop(["Unnamed: 0"], axis=1)

    # 호출
    result = pr.prophet_stock(df, analysis_value, periods, cps, original_df)

    # 1.모델 임시 생성 (1번 prphet_test로 임의 생성)
    # 2.사용자-데이터 분석에 결과 저장
    predict_data = crud.insert_user_data_predict(
        user_data_set_id=data.user_data_set_id,
        training_model_id=1,
        user_id=data.user_id,
        db=db,
    )

    # 3. 분석 결과 저장
    data = {"user_data_predict_id": predict_data.user_data_predict_id}
    upload = {"file": result.encode("utf-8")}
    try:
        requests.post(
            "{base_url}/csv/upload/userpredictdata",
            files=upload,
            data=data,
        )
    except:
        raise HTTPException(status_code=400, detail="호출 X")

    s = codes.prophet_code(analysis_value, periods, cps)

    return {"code": s, "user_data_predict_id": predict_data.user_data_predict_id}


@router.post("/ml/tensorflow/input", tags=["tensorflow"], description="Data Input")
def data_input(tf_input: TfInput, db: Session = Depends(get_db)):
    data = crud.get_user_data_set(user_data_set_id=tf_input.user_data_set_id, db=db)
    analysis_value = "Close"

    # csv
    if data.user_data_set_start == None:
        original_df, analysis_value = csv_data_call(data)
        df = pd.read_csv(StringIO(original_df.to_csv()))
        df = df.drop(["Unnamed: 0"], axis=1)
    # 기간별
    else:
        original_df, analysis_value = db_data_call(data, db=db)
        df = pd.read_csv(StringIO(original_df.to_csv()))
        df.sort_values(by=["Date"], axis=0, inplace=True)
        df = df.drop(["Unnamed: 0"], axis=1)

    raw_data = []
    for i in range(len(df)):
        raw_data.append({"Date": df["Date"][i], "analysis_value": df[analysis_value][i]})

    return {"raw_data": raw_data, "code": codes.tf_data_input_code(analysis_value)}


@router.post("/ml/tensorflow/preprocess", tags=["tensorflow"], description="Data Preprocess")
def data_preprocess(tf_preprocess: TfPreprocess):
    processed_data = tf.data_preprocess(tf_preprocess.input_raw_data, tf_preprocess.set_rate)
    processed_data["code"] = codes.tf_data_preprocess_code(tf_preprocess.set_rate)
    return processed_data


@router.post("/ml/tensorflow/cnn/training", tags=["tensorflow"], description="CNN Model Training")
def cnn_model_training(tf_training: TfTraining, db: Session = Depends(get_db)):
    trained_data = tf.cnn_model_training(tf_training.input_processed_data, tf_training.user_id, db)
    trained_data["code"] = codes.tf_cnn_model_training_code()
    return trained_data


@router.post("/ml/tensorflow/lstm/training", tags=["tensorflow"], description="LSTM Model Training")
def lstm_model_training(tf_training: TfTraining, db: Session = Depends(get_db)):
    trained_data = tf.lstm_model_training(tf_training.input_processed_data, tf_training.user_id, db)
    trained_data["code"] = codes.tf_lstm_model_training_code()
    return trained_data


@router.post(
    "/ml/tensorflow/custom/training",
    tags=["tensorflow"],
    description="Custom Model Training",
)
def custom_model_training(tf_custom_training: TfCustomTraining, db: Session = Depends(get_db)):
    trained_data = tf.custom_model_training(
        tf_custom_training.input_processed_data,
        tf_custom_training.input_layer,
        tf_custom_training.user_id,
        db,
    )
    trained_data["code"] = codes.tf_custom_model_training_code(tf_custom_training.input_layer)
    return trained_data


@router.post("/ml/tensorflow/evaluate", tags=["tensorflow"], description="Model Evaluate")
def model_evaluate(tf_evaluate: TfEvaluate):
    evaluated_data = tf.model_evaluate(
        tf_evaluate.input_processed_data, tf_evaluate.training_model_id
    )
    evaluated_data["code"] = codes.tf_model_evaluate_code()
    return evaluated_data


@router.post("/ml/tensorflow/predict", tags=["tensorflow"], description="Model Predict")
def model_predict(tf_predict: TfPredict, db: Session = Depends(get_db)):
    predicted_data = tf.predict_future(
        tf_predict.user_data_set_id,
        tf_predict.input_processed_data,
        tf_predict.training_model_id,
        tf_predict.user_id,
        tf_predict.period,
        db,
    )
    predicted_data["code"] = codes.tf_model_predict_code(tf_predict.period)
    return predicted_data


# 파일 받아오기
def csv_data_call(data):
    try:
        files = requests.get(
            f"{base_url}/csv/download/userdataset/bytes/{data.user_data_set_id}",
        ).json()

    except:
        raise HTTPException(status_code=400, detail="호출 X")
    data = StringIO(files["file"])
    df = pd.read_csv(data, delimiter=",")

    s = set(["Date", "Close"])
    analysis_value = "Close"

    if s.issubset(set(df.columns)):
        df = df[["Date", "Close"]]
    else:
        analysis_value = "Temp"
        df = df[["Date", "Temp"]]

    return df, analysis_value


# 기간과 코드 정보 가져오기
def db_data_call(data, db: Session):
    stock_list = crud.get_data_list_by_id_date(
        db=db,
        start_date=data.user_data_set_start,
        end_date=data.user_data_set_end,
        code=data.data_list_id,
    )

    analysis_value = "Close"

    if stock_list[0].data_list_id < 7:
        df = pd.DataFrame(columns=["Date", "Close"])  # date -> ds 변경
        for sk in stock_list:
            df = df.append(
                {"Date": sk.data_set_date, "Close": str(sk.data_set_value)},
                ignore_index=True,
            )
            analysis_value = "Close"
    else:
        df = pd.DataFrame(columns=["Date", "Temp"])  # date -> ds 변경
        for sk in stock_list:
            df = df.append(
                {"Date": sk.data_set_date, "Temp": str(sk.data_set_value)},
                ignore_index=True,
            )
            analysis_value = "Temp"

    return df, analysis_value