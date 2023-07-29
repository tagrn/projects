# 표준 라이브러리
import csv, codecs, io
from io import StringIO

# 서드파티 라이브러리
from fastapi import FastAPI, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
import uvicorn, h5py


app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# userdata csv 파일 저장
@app.post("/csv/upload/userdataset", tags=["csv"], description="userdata csv 파일 저장")
async def csv_upload_userdata(
    file: bytes = File(...),
    user_data_set_id: int = Form(...),
):
    try:
        data = file.decode("utf-8").splitlines()
    except:
        data = file.decode("cp949").splitlines()
    with open(f"assets/userdata/user_data_set_{user_data_set_id}.csv", "w") as f:
        for line in data:
            f.write(line)
            f.write("\n")
    return f"{user_data_set_id}번째 유저 데이터 저장 완료"


# predictdata csv 파일 저장
@app.post(
    "/csv/upload/userpredictdata", tags=["csv"], description="predictdata csv 파일 저장"
)
async def csv_upload_predictdata(
    file: bytes = File(...),
    user_data_predict_id: int = Form(...),
):
    try:
        data = file.decode("utf-8").splitlines()
    except:
        data = file.decode("cp949").splitlines()
    with open(
        f"assets/predictdata/user_data_predict_{user_data_predict_id}.csv", "w"
    ) as f:
        for line in data:
            f.write(line)
            f.write("\n")
    return f"{user_data_predict_id}번째 분석 데이터 저장 완료"


# userdataset bytes 파일 전송
@app.get(
    "/csv/download/userdataset/bytes/{user_data_set_id}",
    tags=["csv"],
    description="userdataset bytes 파일 전송",
)
async def csv_download_userdata_bytes(user_data_set_id: int):
    try:
        s = open(f"assets/userdata/user_data_set_{user_data_set_id}.csv").read()
    except:
        raise HTTPException(status_code=400, detail="데이터가 존재하지 않습니다.")
    return {"file": s.encode("utf-8")}


# userdatapredict bytes 파일 전송
@app.get(
    "/csv/download/userdatapredict/bytes/{user_data_predict_id}",
    tags=["csv"],
    description="userdatapredict bytes 파일 전송",
)
async def csv_download_userdatapredict_bytes(user_data_predict_id: int):
    try:
        s = open(
            f"assets/predictdata/user_data_predict_{user_data_predict_id}.csv"
        ).read()
    except:
        raise HTTPException(status_code=400, detail="데이터가 존재하지 않습니다.")
    return {"file": s.encode("utf-8")}


# userdataset json 파일 전송
@app.get(
    "/csv/download/userdataset/json/{user_data_set_id}",
    tags=["csv"],
    description="userdatapredict json 파일 전송",
)
async def csv_download_userdataset_json(user_data_set_id: int):
    try:
        s = open(f"assets/userdata/user_data_set_{user_data_set_id}.csv").read()
    except:
        raise HTTPException(status_code=400, detail="데이터가 존재하지 않습니다.")

    lines = s.splitlines()
    arr = []
    cols = lines[0].split(",")

    for i in range(1, len(lines)):
        line_cols = lines[i].split(",")
        dic = {}
        for col in range(len(line_cols)):
            dic[cols[col]] = line_cols[col]
        arr.append(dic)

    return arr


# userdatapredict json 파일 전송
@app.get(
    "/csv/download/userdatapredict/json/{user_data_predict_id}",
    tags=["csv"],
    description="userdatapredict json 파일 전송",
)
async def csv_download_userdatapredict_json(user_data_predict_id: int):
    try:
        s = open(
            f"assets/predictdata/user_data_predict_{user_data_predict_id}.csv"
        ).read()
    except:
        raise HTTPException(status_code=400, detail="데이터가 존재하지 않습니다.")

    lines = s.splitlines()
    arr = []
    cols = lines[0].split(",")

    for i in range(1, len(lines)):
        line_cols = lines[i].split(",")
        dic = {}
        for col in range(len(line_cols)):
            dic[cols[col]] = line_cols[col]
        arr.append(dic)

    return arr


# userdataset csv 파일 다운로드
@app.get(
    "/csv/download/userdataset/file/{user_data_set_id}",
    tags=["csv"],
    description="userdataset csv 파일 다운로드",
)
async def csv_download_userdataset_file(user_data_set_id: int):
    try:
        s = open(f"assets/userdata/user_data_set_{user_data_set_id}.csv").read()
    except:
        raise HTTPException(status_code=400, detail="데이터가 존재하지 않습니다.")
    return FileResponse(
        f"assets/userdata/user_data_set_{user_data_set_id}.csv",
        media_type="application/octet-stream",
        filename="user data.csv",
    )


# userdatapredict csv 파일 다운로드
@app.get(
    "/csv/download/userdatapredict/{user_data_predict_id}",
    tags=["csv"],
    description="userdatapredict csv 파일 다운로드",
)
async def csv_download_userdatapredict_file(user_data_predict_id: int):
    try:
        s = open(
            f"assets/predictdata/user_data_predict_{user_data_predict_id}.csv"
        ).read()
    except:
        raise HTTPException(status_code=400, detail="데이터가 존재하지 않습니다.")
    return FileResponse(
        f"assets/predictdata/user_data_predict_{user_data_predict_id}.csv",
        media_type="application/octet-stream",
        filename="data analysis.csv",
    )


# userdata csv 파일 저장
@app.post(
    "/csv/upload/trainingmodel", tags=["model"], description="trainingmodel 파일 저장"
)
async def csv_upload_trainingmodel(
    file: bytes = File(...),
    training_model_id: int = Form(...),
):
    with open(f"assets/model/training_model_{training_model_id}.h5", "wb") as f:
        f.write(file)

    return f"{training_model_id}번째 트레이닝 모델 저장 완료"


# trainingmodel 파일 다운로드
@app.get(
    "/csv/download/trainingmodel/{training_model_id}",
    tags=["model"],
    description="trainingmodel 파일 다운로드 파일 다운로드",
)
async def csv_download_trainingmodel_file(training_model_id: int):
    try:
        h5py.File(f"assets/model/training_model_{training_model_id}.h5")
    except:
        raise HTTPException(status_code=400, detail="데이터가 존재하지 않습니다.")
    return FileResponse(
        f"assets/model/training_model_{training_model_id}.h5",
        media_type="application/octet-stream",
        filename="model.h5",
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8003)