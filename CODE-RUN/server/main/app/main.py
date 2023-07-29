# 서드파티 라이브러리
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# 로컬 라이브러리
from database import database, models
from routers.board import router as board_router
from routers.develop import router as develop_router
from routers.user import router as user_router
from routers.video import router as video_router
from routers.videolist import router as videolist_router
from routers.tag import router as tag_router

models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(develop_router)
app.include_router(user_router)
app.include_router(video_router)
app.include_router(videolist_router)
app.include_router(tag_router)
app.include_router(board_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
