# 표준 라이브러리
import time

# 서드 파티 라이브러리
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date, Float, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

# 로컬
from .database import Base


# 유저
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(320), unique=True, index=True, nullable=False)
    name = Column(String(20), index=True, nullable=False)
    profile = Column(String(256), default="https://www.코드런.com/image/profile/0")
    password = Column(String(64), nullable=False)
    active = Column(Boolean, default=False)
    join_date = Column(DateTime(timezone=True), server_default=func.now())
    security_count = Column(Integer, default=0)

    video = relationship("Video", backref="user", passive_deletes=True)
    video_comment = relationship("VideoComment", backref="user", passive_deletes=True)
    like = relationship("Like", backref="user", passive_deletes=True)
    video_list = relationship("VideoList", backref="user", passive_deletes=True)
    board = relationship("Board", backref="user", passive_deletes=True)
    board_comment = relationship("BoardComment", backref="user", passive_deletes=True)


# 동영상 게시물
class Video(Base):
    __tablename__ = "video"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'))
    title = Column(String(100), index=True, nullable=False)
    content = Column(Text)
    language_tag_id = Column(Integer, ForeignKey("language_tag.id", ondelete='CASCADE'))
    thumbnail = Column(String(256), default="https://www.코드런.com/image/thumbnail/0")
    upload_complete = Column(Boolean, default=False)
    created_date = Column(DateTime(timezone=True), server_default=func.now())
    updated_date = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    video_comment = relationship("VideoComment", backref="video", passive_deletes=True)
    like = relationship("Like", backref="video", passive_deletes=True)
    video_list_data = relationship("VideoListData", backref="video", passive_deletes=True)
    subject_user_tag = relationship("SubjectUserTag", backref="video", passive_deletes=True)
    algorithm_user_tag = relationship("AlgorithmUserTag", backref="video", passive_deletes=True)

# 동영상 댓글
class VideoComment(Base):
    __tablename__ = "video_comment"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'))
    video_id = Column(Integer, ForeignKey("video.id", ondelete='CASCADE'))
    content = Column(Text)
    created_date = Column(DateTime(timezone=True), server_default=func.now())
    updated_date = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


# 동영상 좋아요
class Like(Base):
    __tablename__ = "like"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'))
    video_id = Column(Integer, ForeignKey("video.id", ondelete='CASCADE'))


# 동영상 재생 목록
class VideoList(Base):
    __tablename__ = "video_list"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'))
    title = Column(String(50), nullable=False)

    video_list_data = relationship("VideoListData", backref="video_list", passive_deletes=True)


# 비디오 리스트 데이터
class VideoListData(Base):
    __tablename__ = "video_list_data"
    
    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("video.id", ondelete='CASCADE'))
    video_list_id = Column(Integer, ForeignKey("video_list.id", ondelete='CASCADE'))


# Language Tag
class LanguageTag(Base):
    __tablename__ = "language_tag"

    id = Column(Integer, primary_key=True, index=True)
    language_name = Column(String(50), nullable=False)

    video = relationship("Video", backref="language_tag", passive_deletes=True)


# Subject Tag
class SubjectTag(Base):
    __tablename__ = "subject_tag"

    id = Column(Integer, primary_key=True, index=True)
    subject_name = Column(String(50), nullable=False)

    subject_user_tag = relationship("SubjectUserTag", backref="subject_tag", passive_deletes=True)


# Subjcet User Tag
class SubjectUserTag(Base):
    __tablename__ = "subject_user_tag"

    id = Column(Integer, primary_key=True, index=True)
    subject_tag_id = Column(Integer, ForeignKey("subject_tag.id", ondelete='CASCADE'))
    video_id = Column(Integer, ForeignKey("video.id", ondelete='CASCADE'))


# Algorithm Tag
class AlgorithmTag(Base):
    __tablename__ = "algorithm_tag"

    id = Column(Integer, primary_key=True, index=True)
    algorithm_name = Column(String(50), nullable=False)

    algorithm_user_tag = relationship("AlgorithmUserTag", backref="algorithm_tag", passive_deletes=True)


# Subjcet User Tag
class AlgorithmUserTag(Base):
    __tablename__ = "algorithm_user_tag"

    id = Column(Integer, primary_key=True, index=True)
    algorithm_tag_id = Column(Integer, ForeignKey("algorithm_tag.id", ondelete='CASCADE'))
    video_id = Column(Integer, ForeignKey("video.id", ondelete='CASCADE'))


# Board
class Board(Base):
    __tablename__ = "board"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'))
    title = Column(String(100), index=True, nullable=False)
    content = Column(Text, nullable=False)
    select = Column(Boolean, default=False)
    created_date = Column(DateTime(timezone=True), server_default=func.now())
    updated_date = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    board_comment = relationship("BoardComment", backref="board", passive_deletes=True)


# Board Comment
class BoardComment(Base):
    __tablename__ = "board_comment"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'))
    board_id = Column(Integer, ForeignKey("board.id", ondelete='CASCADE'))
    content = Column(Text, nullable=False)
    select = Column(Boolean, default=False)
    created_date = Column(DateTime(timezone=True), server_default=func.now())
    updated_date = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
