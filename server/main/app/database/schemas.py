# 서드 파티 라이브러리
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Date, DateTime


# 데이터 목록 베이스
class UserBase(BaseModel):
    email: str
    password: str
    name: str


class LoginBase(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class VideoBase(BaseModel):
    title: str
    content: Optional[str] = None
    language_tag_id: Optional[int] = None
    algorithm_tag_ids: Optional[list] = []
    subject_tag_ids: Optional[list] = []


class VideoUpdateBase(BaseModel):
    video_id: int
    title: str
    content: Optional[str] = None


class VideoCommentBase(BaseModel):
    video_id: int
    content: str


class VideoCommentUpdateBase(BaseModel):
    video_comment_id: int
    content: str


class BoardBase(BaseModel):
    title: str
    content: Optional[str] = None


class BoardCommentBase(BaseModel):
    board_id: int
    content: Optional[str] = None


class BoardSelectBase(BaseModel):
    board_comment_id: int


class BoardUpdateBase(BaseModel):
    board_id: int
    title: str
    content: Optional[str] = None


class BoardCommentUpdateBase(BaseModel):
    board_comment_id: int
    content: Optional[str] = None


class UserUpdateBase(BaseModel):
    password: Optional[str] = None
    name: Optional[str] = None


class FindUserPassword(BaseModel):
    email: Optional[str]


class VideoListBase(BaseModel):
    title: str


class VideoListUpdateBase(BaseModel):
    title: str
    video_list_id: int


class VideoListDataBase(BaseModel):
    video_list_id: int
    video_id: int