# 표준 라이브러리
from os import path, remove, system
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile, HTTPException, Header
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session
import ffmpeg

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from . import raiseException
from database import models
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()
parent_route = path.dirname(path.abspath(path.dirname(__file__)))


@router.get("/video/{video}", tags=["video"], description="비디오 불러오기")
def get_video(video: str):
    try:
        video = open(f"{parent_route}/videos/{video}", mode="rb")
    except:
        raise raiseException.Raise_404_Error()
    return StreamingResponse(video, media_type="vnd.apple.mpegurl")


@router.post(
    "/video/create/{video_id}/{file_extension}", tags=["video"], description="비디오 업로드"
)
def create_video(
    video_id: int,
    file_extension: str,
    background_tasks: BackgroundTasks,
    file: bytes = File(...),
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise raiseException.Raise_404_Error()
    if v_data.user_id != current_user.id:
        raise raiseException.Raise_401_Error()
    with open(f"{parent_route}/videos/{video_id}_VIDEO.{file_extension}", "wb") as f:
        f.write(file)

    background_tasks.add_task(encoding_video, video_id=video_id, file_extension=file_extension)

    return {"data": "success"}


def encoding_video(video_id, file_extension):
    (
        ffmpeg
        .input(f'videos/{video_id}_VIDEO.{file_extension}')
        .output(f'videos/{video_id}_VIDEO.m3u8', **{'b:v': '1M', 'g': 60, 'hls_time': 10, 'hls_list_size': 0})
        .run()
    )
    remove(f"{parent_route}/videos/{video_id}_VIDEO.{file_extension}")


@router.put(
    "/video/update/{video_id}/{file_extension}", tags=["video"], description="비디오 수정"
)
def update_video(
    video_id: int,
    file_extension: str,
    background_tasks: BackgroundTasks,
    file: bytes = File(...),
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    delete_video(video_id, token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise raiseException.Raise_404_Error()
    if v_data.user_id != current_user.id:
        raise raiseException.Raise_401_Error()
    with open(f"{parent_route}/videos/{video_id}_VIDEO.{file_extension}", "wb") as f:
        f.write(file)

    background_tasks.add_task(encoding_video, video_id=video_id, file_extension=file_extension)

    return {"update": video_id}


@router.delete("/video/delete/{video_id}", tags=["video"], description="비디오 삭제")
def delete_video(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if v_data.user_id != current_user.id:
        raise raiseException.Raise_401_Error()
    try:
        remove(f"{parent_route}/videos/{video_id}_VIDEO.m3u8")
    except Exception:
        raise raiseException.Raise_404_Error()
    try:
        i = 0
        while True:
            remove(f"{parent_route}/videos/{video_id}_VIDEO{i}.ts")
            i += 1
    except Exception:
        return {"delete": video_id}
