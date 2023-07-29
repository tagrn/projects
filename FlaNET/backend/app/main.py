# 서드파티 라이브러리
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# 로컬
from database import database, models
from routers.crawling import router as crawling_router
from routers.create import router as create_router
from routers.data import router as data_router
from routers.stocks import router as stocks_router
from routers.csv import router as csv_router
from routers.predict import router as predict_router
from routers.code import router as code_router
from routers.easy import router as easy_router


models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(crawling_router)
app.include_router(create_router)
app.include_router(data_router)
app.include_router(predict_router)
app.include_router(stocks_router)
app.include_router(csv_router)
app.include_router(code_router)
app.include_router(easy_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)