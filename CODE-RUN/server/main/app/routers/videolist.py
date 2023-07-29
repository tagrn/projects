# 표준 라이브러리
from os import path
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from . import raiseException
from database import models, schemas
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()


@router.get("/api/videolist", tags=["video list"], description="비디오리스트 확인")
def get_video_list(
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    videolist = (
        db.query(models.VideoList)
        .filter(models.VideoList.user_id == current_user.id)
        .all()
    )
    return {"data": videolist}


@router.post("/api/videolist/create", tags=["video list"], description="비디오리스트 생성")
def create_video_list(
    data: schemas.VideoListBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vl_data = models.VideoList(user_id=current_user.id, title=data.title)
    db.add(vl_data)
    db.commit()
    db.refresh(vl_data)
    return {"data": vl_data}


@router.put("/api/videolist/update", tags=["video list"], description="비디오리스트 타이틀 수정")
def update_video_list(
    data: schemas.VideoListUpdateBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vl_data = (
        db.query(models.VideoList).filter(models.VideoList.id == data.video_list_id).first()
    )
    if not vl_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != vl_data.user_id:
        raise raiseException.Raise_401_Error()
    vl_data.title = data.title
    db.commit()
    db.refresh(vl_data)
    return {"data": vl_data}


@router.delete(
    "/api/videolist/delete/{video_list_id}",
    tags=["video list"],
    description="비디오리스트 삭제",
)
def delete_video_list(
    video_list_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vl_data = (
        db.query(models.VideoList).filter(models.VideoList.id == video_list_id).first()
    )
    if not vl_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != vl_data.user_id:
        raise raiseException.Raise_401_Error()
    db.delete(vl_data)
    db.commit()
    return {"delete": video_list_id}


def check_videolist(user_id, id, db):
    check = (
        db.query(models.VideoList)
        .filter(models.VideoList.user_id == user_id)
        .filter(models.VideoList.id == id)
        .first()
    )
    if not check:
        raise raiseException.Raise_404_Error()


@router.get(
    "/api/videolist/detail/{video_list_id}",
    tags=["video list"],
    description="비디오리스트의 비디오 확인",
)
def get_video_list_data(
    video_list_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    check_videolist(current_user.id, video_list_id, db)
    videolistdata = (
        db.query(models.VideoListData.video_id, models.VideoListData.id, models.Video)
        .filter(models.VideoListData.video_list_id == video_list_id)
        .filter(models.VideoListData.video_id == models.Video.id)
        .all()
    )
    return {"data": videolistdata}


@router.post(
    "/api/videolist/detail/create", tags=["video list"], description="비디오리스트에 비디오 추가"
)
def create_video_list_data(
    data: schemas.VideoListDataBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    check_videolist(current_user.id, data.video_list_id, db)
    if not db.query(models.Video).filter(models.Video.id == data.video_id).first():
        raise raiseException.Raise_404_Error()
    vld_data = models.VideoListData(video_list_id=data.video_list_id, video_id=data.video_id)
    db.add(vld_data)
    db.commit()
    db.refresh(vld_data)
    return {"data": vld_data}


@router.delete(
    "/api/videolist/detail/delete/{video_list_data_id}",
    tags=["video list"],
    description="비디오리스트의 비디오 삭제",
)
def delete_video_list_data(
    video_list_data_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vld_data = (
        db.query(models.VideoListData)
        .filter(models.VideoListData.id == video_list_data_id)
        .first()
    )
    if not vld_data:
        raise raiseException.Raise_404_Error()
    check_videolist(current_user.id, vld_data.video_list_id, db)
    db.delete(vld_data)
    db.commit()
    return {"delete": video_list_data_id}