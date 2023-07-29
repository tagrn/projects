# 표준 라이브러리
from routers.user import get_current_user
from dependency import get_db
from database import models, schemas
from . import raiseException
from os import path
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))


router = APIRouter()


@router.get("/api/board/search", tags=["board"], description="게시판 글 조회")
def get_board(
    count: int,
    search_text: Optional[str] = '',
    db: Session = Depends(get_db),
):
    title_board = db.query(models.Board, models.User.name, models.User.profile).join(
        models.User, models.Board.user_id == models.User.id).filter(models.Board.title.ilike(f'%{search_text}%'))
    content_board = db.query(models.Board, models.User.name, models.User.profile).join(
        models.User, models.Board.user_id == models.User.id).filter(models.Board.content.ilike(f'%{search_text}%'))
    result = title_board.union(content_board)
    user_board = db.query(models.Board, models.User.name, models.User.profile).join(
        models.User, models.Board.user_id == models.User.id).filter(models.User.name.ilike(f'%{search_text}%'))
    result = result.union(user_board).order_by(
        models.Board.created_date.desc()).all()
    return_result = result[(count-1)*10:count*10]
    return {"data": return_result, "page_cnt": (len(result)-1)//10 + 1}


@router.post("/api/board", tags=["board"], description="게시판 글 작성")
def post_board(
    data: schemas.BoardBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    board_data = models.Board(
        user_id=current_user.id,
        title=data.title,
        content=data.content,
    )
    db.add(board_data)
    db.commit()
    db.refresh(board_data)
    return {"data": board_data}


@router.get("/api/board/detail/{board_id}", tags=["board"], description="게시판 글 조회(DETAIL)")
def get_board_detail(
    board_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    get_current_user(token, db)
    board_data = db.query(models.Board, models.User.name, models.User.profile).join(
        models.User, models.User.id == models.Board.user_id).filter(models.Board.id == board_id).first()
    if not board_data:
        raise raiseException.Raise_404_Error()
    return {"data": board_data}


@router.put("/api/board/update", tags=["board"], description="게시판 글 수정(UPDATE)")
def update_board(
    data: schemas.BoardUpdateBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    board_data = db.query(models.Board).filter(
        models.Board.id == data.board_id).first()
    if not board_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != board_data.user_id:
        raise raiseException.Raise_401_Error()
    board_data.title = data.title
    board_data.content = data.content
    db.commit()
    db.refresh(board_data)
    return {"data": board_data}


@router.delete("/api/board/delete/{board_id}", tags=["board"], description="게시판 글 삭제(DELETE))")
def delete_board(
    board_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    board_data = db.query(models.Board).filter(
        models.Board.id == board_id).first()
    if not board_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != board_data.user_id:
        raise raiseException.Raise_401_Error()
    db.delete(board_data)
    db.commit()
    return {"delete": board_id}


@router.post("/api/board/comment", tags=["board"], description="게시판 답변 글 작성(CREATE)")
def post_board_comment(
    data: schemas.BoardCommentBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    board_comment_data = models.BoardComment(
        user_id=current_user.id,
        board_id=data.board_id,
        content=data.content,
    )
    db.add(board_comment_data)
    db.commit()
    db.refresh(board_comment_data)
    return {"data": board_comment_data}


@router.get("/api/board/comment/{board_id}", tags=["board"], description="게시판 답변 글 조회(READ)")
def get_board_comment(
    board_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    get_current_user(token, db)
    bc_data = (
        db.query(models.BoardComment, models.User.name, models.User.profile)
        .join(models.User, models.BoardComment.user_id == models.User.id)
        .filter(models.BoardComment.board_id == board_id)
        .all()
    )
    return {"data": bc_data}


@router.put("/api/board/comment/update", tags=["board"], description="게시판 답변 글 수정(UPDATE)")
def update_board_comment(
    data: schemas.BoardCommentUpdateBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    board_comment_data = db.query(models.BoardComment).filter(
        models.BoardComment.id == data.board_comment_id).first()
    if not board_comment_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != board_comment_data.user_id:
        raise raiseException.Raise_401_Error()
    board_comment_data.content = data.content
    db.commit()
    db.refresh(board_comment_data)
    return {"data": board_comment_data}


@router.delete("/api/board/comment/delete/{board_comment_id}", tags=["board"], description="게시판 답변 글 삭제(DELETE))")
def delete_board_comment(
    board_comment_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    board_comment_data = db.query(models.BoardComment).filter(
        models.BoardComment.id == board_comment_id).first()
    board_data = db.query(models.Board).filter(
        models.Board.id == board_comment_data.board_id).first()
    if not board_comment_data:
        raise raiseException.Raise_404_Error()
    if current_user.id != board_comment_data.user_id:
        raise raiseException.Raise_401_Error()
    if board_data.select == True:
        board_data.select = False
    db.delete(board_comment_data)
    db.commit()
    return {"delete": board_comment_id}


@router.put("/api/board/comment/select", tags=["board"], description="게시판 답변 채택")
def select_comment(
    data: schemas.BoardSelectBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    current_board_comment = db.query(models.BoardComment).filter(
        models.BoardComment.id == data.board_comment_id).first()
    current_board = db.query(models.Board).filter(
        models.Board.id == current_board_comment.board_id).first()
    if current_board.user_id != current_user.id or current_board.select:
        raise raiseException.Raise_401_Error()

    current_board.select = True
    current_board_comment.select = True
    db.commit()
    db.refresh(current_board)
    db.refresh(current_board_comment)
    return{"data": current_board_comment}
