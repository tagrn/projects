# 서드 파티 라이브러리
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Date, DateTime


# 데이터 목록 베이스
class DataListBase(BaseModel):
    data_list_type: str
    data_list_name: str
    data_list_url: str
    stock_code: str


# 상속된 데이터 목록과 데이터 목록의 디폴트 값 생성
class DataList(DataListBase):
    data_list_id: int

    class Config:
        orm_mode = True


# 데이터 셋 베이스
class DataSet(BaseModel):
    data_set_date: str
    data_list_id: int
    data_set_value: float


# 유저 크롤링 입력 베이스
class UserCrawling(BaseModel):
    data_list_id: int
    user_id: str


# 유저 데이터 셋 입력 베이스
class UserDataSetInputBase(BaseModel):
    data_list_id: int
    user_id: str
    user_data_set_start: Optional[str] = None
    user_data_set_end: Optional[str] = None


# 유저 데이터 셋 베이스
class UserDataSetBase(UserDataSetInputBase):
    user_data_set_name: Optional[str] = None
    user_data_set_date: Optional[str] = None
    user_data_set_xml: Optional[str] = None


# 유저 데이터 셋 베이스
class UserDataSetXML(BaseModel):
    user_data_set_id: int
    user_data_set_xml: str
    user_data_set_name: Optional[str] = None


# 상속된 유저 데이터 셋 베이스와 유저 데이터 셋의 디폴트 값 생성
class UserDataSet(UserDataSetBase):
    user_data_set_id: int

    class Config:
        orm_mode = True


class UserDataPredictXML(BaseModel):
    user_data_predict_id: int
    user_data_predict_xml: str


class TrainingModelXML(BaseModel):
    training_model_id: int
    training_model_xml: str