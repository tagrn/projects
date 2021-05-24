# 표준 라이브러리
from os import path, remove, system
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile, HTTPException, Header
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()
parent_route = path.dirname(path.abspath(path.dirname(__file__)))


# 확인 프로세스 만들기
@router.get("/", tags=["check"], description="비디오 API 준비확인")
def ready_for_video():
    return {"data":"success"}


# 프로그레스 만들기
@router.get("/video/progress/{video_id}", tags=["check"], description="업로드 확인")
def encoding_progress(video_id):
    video_data = open(f"videos/{video_id}_VIDEO.m3u8", mode="r").read().split('\n')
    if video_data[-1] == "#EXT-X-ENDLIST" or video_data[-2] == "#EXT-X-ENDLIST":
        return {"data":100}
    if (len(video_data) - 4)//2 <= 10:
        return {"data": (len(video_data) - 4)//2 * 4}
    elif (len(video_data) - 4)//2 <= 20:
        return {"data": 40 + ((len(video_data) - 4)//2-10) * 3}
    elif (len(video_data) - 4)//2 <= 30:
        return {"data": 70 + ((len(video_data) - 4)//2-20) * 2}
    elif (len(video_data) - 4)//2 <= 38:
        return {"data": 90 + ((len(video_data) - 4)//2-30) * 1}
    else:
        return {"data": 99}