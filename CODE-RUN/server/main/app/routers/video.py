# 표준 라이브러리
import requests
from routers.user import get_current_user
from dependency import get_db
from database import models, schemas
from os import path
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy import func, case, desc
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from . import raiseException


router = APIRouter()


@router.get("/api/video/search", tags=["video"], description="비디오 검색")
def get_video(
    count: int,
    search_text: Optional[str] = '',
    user_id: Optional[int] = 0,
    db: Session = Depends(get_db),
):

    title_video = db.query(models.Video, models.User.name, models.User.profile).join(
        models.User, models.Video.user_id == models.User.id).filter(models.Video.title.ilike(f'%{search_text}%'))
    content_video = db.query(models.Video, models.User.name, models.User.profile).join(
        models.User, models.Video.user_id == models.User.id).filter(models.Video.content.ilike(f'%{search_text}%'))

    result = title_video.union(content_video)

    user_video = db.query(models.Video, models.User.name, models.User.profile).join(
        models.User, models.Video.user_id == models.User.id).filter(models.User.name.ilike(f'%{search_text}%'))

    result = result.union(user_video).order_by(
        models.Video.created_date.desc()).all()
    return_result = result[(count-1)*12:count*12]

    for i in range(len(return_result)):
        if db.query(models.Like).filter(models.Like.user_id == user_id).filter(models.Like.video_id == return_result[i].Video.id).first():
            return_result[i].Video.likestatus = True
        else:
            return_result[i].Video.likestatus = False
        return_result[i].Video.likecnt = len(db.query(models.Like).filter(
            models.Like.video_id == return_result[i].Video.id).all())

    return {"data": return_result, "page_cnt": (len(result)-1)//12 + 1}


@router.get("/api/video/recommend",  tags=["video"], description="추천 동영상 top 5")
def get_recommend_video(
    db: Session = Depends(get_db),
):
    t = db.query(models.Video, func.count(models.Like.id).label("likecnt")).outerjoin(models.Like).group_by(models.Video.id).order_by(desc("likecnt")).limit(5).subquery('t')
    v_data = db.query(t, models.User.name, models.User.profile).join(models.User).all()
    return {"data": v_data}


@router.get("/api/video/detail/{video_id}", tags=["video"], description="동영상 디테일 보기")
def get_video_detail(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise raiseException.Raise_404_Error()
    v_data.subject_user_tag
    v_data.algorithm_user_tag
    like_cnt = len(v_data.like)
    del v_data.like
    if db.query(models.Like).filter(models.Like.user_id == current_user.id).filter(models.Like.video_id == v_data.id).first():
        like_status = True
    else:
        like_status = False
    return {"data": v_data, "like_cnt": like_cnt, "like_status": like_status}


@router.get("/api/video/page/{count}", tags=["video"], description="[filter] 동영상 12개씩 리스트로 보기 (알고리즘으로 보는경우 : algorithm_tag_id와 language_tag_id 지정, 과목으로 보는경우 : subject_tag_id 지정)")
def get_video_filter_page(
    count: int,
    algorithm_tag_id: Optional[int] = 0,
    language_tag_id: Optional[int] = 0,
    subject_tag_id: Optional[int] = 0,
    user_id: Optional[int] = 0,
    db: Session = Depends(get_db),
):

    if algorithm_tag_id:
        if language_tag_id:
            v_data = (
                db.query(models.Video, models.User.name, models.User.profile)
                .join(models.AlgorithmUserTag, models.AlgorithmUserTag.video_id == models.Video.id)
                .join(models.User, models.Video.user_id == models.User.id)
                # .join(models.Like, models.Like.video_id == models.Video.id)
                .filter(models.AlgorithmUserTag.algorithm_tag_id == algorithm_tag_id)
                .filter(models.Video.language_tag_id == language_tag_id)
                .group_by(models.Video.id)
                .order_by(models.Video.id.desc())
                .all()
            )
        else:
            v_data = (
                db.query(models.Video, models.User.name, models.User.profile)
                .join(models.AlgorithmUserTag, models.AlgorithmUserTag.video_id == models.Video.id)
                .join(models.User, models.Video.user_id == models.User.id)
                # .join(models.Like, models.Like.video_id == models.Video.id)
                .filter(models.AlgorithmUserTag.algorithm_tag_id == algorithm_tag_id)
                .group_by(models.Video.id)
                .order_by(models.Video.id.desc())
                .all()
            )
    elif subject_tag_id:
        v_data = (
            db.query(models.Video, models.User.name, models.User.profile)
            .join(models.SubjectUserTag, models.SubjectUserTag.video_id == models.Video.id)
            .join(models.User, models.Video.user_id == models.User.id)
            # .join(models.Like, models.Like.video_id == models.Video.id)
            .filter(models.SubjectUserTag.subject_tag_id == subject_tag_id)
            .group_by(models.Video.id)
            .order_by(models.Video.id.desc())
            .all()
        )
    else:
        v_data = (
            db.query(models.Video, models.User.name, models.User.profile)
            .join(models.User, models.Video.user_id == models.User.id)
            # .join(models.Like, models.Like.video_id == models.Video.id)
            .group_by(models.Video.id)
            .order_by(models.Video.id.desc())
            .all()
        )

    return_data = v_data[(count-1)*12:count*12]

    for i in range(len(return_data)):
        if db.query(models.Like).filter(models.Like.user_id == user_id).filter(models.Like.video_id == return_data[i].Video.id).first():
            return_data[i].Video.likestatus = True
        else:
            return_data[i].Video.likestatus = False
        return_data[i].Video.likecnt = len(db.query(models.Like).filter(
            models.Like.video_id == return_data[i].Video.id).all())

    return {"data": return_data, "page_cnt": (len(v_data)-1)//12 + 1}


@router.post("/api/video/create", tags=["video"], description="동영상 게시물 작성")
def post_video(
    data: schemas.VideoBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = models.Video(
        user_id=current_user.id,
        title=data.title,
        content=data.content,
        language_tag_id=data.language_tag_id,
    )
    db.add(v_data)
    db.commit()
    db.refresh(v_data)
    try:
        for i in data.algorithm_tag_ids:
            sut_data = models.AlgorithmUserTag(
                video_id=v_data.id, algorithm_tag_id=i)
            db.add(sut_data)
        for i in data.subject_tag_ids:
            aut_data = models.SubjectUserTag(
                video_id=v_data.id, subject_tag_id=i)
            db.add(aut_data)
        v_data.thumbnail = f"https://www.코드런.com/image/thumbnail/{v_data.id}"
        db.commit()
        db.refresh(v_data)
        v_data.subject_user_tag
        v_data.algorithm_user_tag
        return {"data": v_data}
    except Exception:
        db.delete(v_data)
        db.commit()
    raise raiseException.Raise_422_Error()


@router.put("/api/video/update", tags=["video"], description="동영상 게시물 수정")
def update_video(
    data: schemas.VideoUpdateBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(
        models.Video.id == data.video_id).first()
    if not v_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != v_data.user_id:
        raise raiseException.Raise_401_Error()
    v_data.title = data.title
    v_data.content = data.content
    db.commit()
    db.refresh(v_data)
    return {"data": v_data}


@router.delete("/api/video/delete/{video_id}", tags=["video"], description="동영상 게시물 삭제")
def delete_video(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != v_data.user_id:
        raise raiseException.Raise_401_Error()
    requests.delete(f"https://www.코드런.com/image/thumbnail/delete/{video_id}", headers={'token': token})
    requests.delete(f"https://www.coderun.shop/video/delete/{video_id}", headers={'token': token})
    db.delete(v_data)
    db.commit()
    return {"delete": video_id}


def check_video(id, db):
    check = db.query(models.Video).filter(models.Video.id == id).first()
    if not check:
        raise raiseException.Raise_404_Error()


@router.get("/api/video/comment/{video_id}", tags=["video"], description="동영상 댓글 보기")
def get_video_comment(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    get_current_user(token, db)
    vc_data = (
        db.query(models.VideoComment)
        .filter(models.VideoComment.video_id == video_id)
        .all()
    )
    for i in range(len(vc_data)):
        vc_data[i].user
        if vc_data[i].user.password:
            del vc_data[i].user.password
        if vc_data[i].user.active:
            del vc_data[i].user.active
        if vc_data[i].user.join_date:
            del vc_data[i].user.join_date
    return {"data": vc_data}


@router.post("/api/video/comment/create", tags=["video"], description="동영상 댓글 작성")
def post_video_comment(
    data: schemas.VideoCommentBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    check_video(data.video_id, db)
    vc_data = models.VideoComment(
        user_id=current_user.id, video_id=data.video_id, content=data.content
    )
    print(vc_data)

    db.add(vc_data)
    db.commit()
    db.refresh(vc_data)
    vc_data.user
    if vc_data.user.password:
        del vc_data.user.password
    if vc_data.user.active:
        del vc_data.user.active
    if vc_data.user.join_date:
        del vc_data.user.join_date
    return {"data": vc_data}


@router.put("/api/video/comment/update", tags=["video"], description="동영상 댓글 수정")
def update_video_comment(
    data: schemas.VideoCommentUpdateBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vc_data = (
        db.query(models.VideoComment)
        .filter(models.VideoComment.id == data.video_comment_id)
        .first()
    )
    if not vc_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != vc_data.user_id:
        raise raiseException.Raise_401_Error()
    vc_data.content = data.content
    db.commit()
    db.refresh(vc_data)
    vc_data.user
    if vc_data.user.password:
        del vc_data.user.password
    if vc_data.user.active:
        del vc_data.user.active
    if vc_data.user.join_date:
        del vc_data.user.join_date
    return {"data": vc_data}


@router.delete(
    "/api/video/comment/delete/{video_comment_id}",
    tags=["video"],
    description="동영상 댓글 삭제",
)
def delete_video_comment(
    video_comment_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vc_data = (
        db.query(models.VideoComment)
        .filter(models.VideoComment.id == video_comment_id)
        .first()
    )
    if not vc_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != vc_data.user_id:
        raise raiseException.Raise_401_Error()
    db.delete(vc_data)
    db.commit()
    return {"delete": video_comment_id}


@router.post("/api/video/{video_id}", tags=["video"], description="동영상 좋아요/취소")
def video_like(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    if not current_user:
        raise raiseException.Raise_401_Error()
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise raiseException.Raise_404_Error()
    current_video_like_data = db.query(models.Like).filter(
        models.Like.user_id == current_user.id).filter(models.Like.video_id == v_data.id).first()

    if not current_video_like_data:
        vl_data = models.Like(
            user_id=current_user.id,
            video_id=v_data.id,
        )
        db.add(vl_data)
        db.commit()
        db.refresh(vl_data)
        like_status = True
    else:
        db.delete(current_video_like_data)
        db.commit()
        like_status = False

    like_cnt = len(v_data.like)
    del v_data.like
    return {"data": v_data, "like_cnt": like_cnt, "like_status": like_status}
