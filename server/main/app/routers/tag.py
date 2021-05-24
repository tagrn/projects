# 표준 라이브러리
from os import path
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()


@router.get("/api/tag/language", tags=["tag"], description="언어 태그 리스트 확인")
def get_language_tag(db: Session = Depends(get_db)):
    return {"data": db.query(models.LanguageTag).all()}


@router.get("/api/tag/algorithm", tags=["tag"], description="알고리즘 태그 리스트 확인")
def get_algorithm_tag(db: Session = Depends(get_db)):
    return {"data": db.query(models.AlgorithmTag).all()}


@router.get("/api/tag/subject", tags=["tag"], description="CS 태그 리스트 확인")
def get_subject_tag(db: Session = Depends(get_db)):
    return {"data": db.query(models.SubjectTag).all()}