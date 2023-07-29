# 서드 파티 라이브러리
from pydantic import BaseModel
from typing import Optional


# 데이터 목록 베이스
class UserBase(BaseModel):
    email: str
    password: str
    name: str