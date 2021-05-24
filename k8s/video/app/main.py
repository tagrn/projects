# 서드파티 라이브러리
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# 로컬 라이브러리
from database import database, models
from routers.video import router as video_router
from routers.check import router as check_router


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(video_router)
app.include_router(check_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001)
