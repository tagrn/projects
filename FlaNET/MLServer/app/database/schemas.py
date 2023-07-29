# 서드 파티 라이브러리
from pydantic import BaseModel


# 스톡 베이스
class StockBase(BaseModel):
    current_stock: int
    date: str
    code: str


# 상속된 스톡 데이터와 스톡의 디폴트 값 생성
class Stock(StockBase):
    id: int

    class Config:
        orm_mode = True