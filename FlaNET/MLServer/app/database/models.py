# 표준 라이브러리
import time

# 서드 파티 라이브러리
from sqlalchemy import Boolean, Column, Integer, ForeignKey, Date, Float, String, DateTime
from sqlalchemy.orm import relationship

# 로컬
from .database import Base

# 데이터 셋
class DataSet(Base):
    __tablename__ = "data_set"

    data_set_date = Column(Date, primary_key=True, index=True)
    data_list_id = Column(Integer, ForeignKey("data_list.data_list_id"), primary_key=True)
    data_set_value = Column(Float, index=True)

    data_list_own = relationship("DataList", back_populates="data_sets")


# 데이터 목록
class DataList(Base):
    __tablename__ = "data_list"

    data_list_id = Column(Integer, primary_key=True, index=True)
    data_list_type = Column(String(10), index=True)
    data_list_name = Column(String(20), unique=True, index=True)
    data_list_url = Column(String(200), index=True)
    stock_code = Column(String(10), unique=True, index=True)

    data_sets = relationship("DataSet", back_populates="data_list_own")
    user_data_sets = relationship("UserDataSet", back_populates="data_list_own")


# 사용자-데이터 셋
class UserDataSet(Base):
    __tablename__ = "user_data_set"

    user_data_set_id = Column(Integer, primary_key=True, index=True)
    data_list_id = Column(Integer, ForeignKey("data_list.data_list_id"))
    user_id = Column(String(100), index=True)
    user_data_set_start = Column(Date, index=True)
    user_data_set_end = Column(Date, index=True)
    user_data_set_name = Column(String(20), index=True)
    user_data_set_xml = Column(String(10000))
    user_data_set_date = Column(DateTime, index=True)

    data_list_own = relationship("DataList", back_populates="user_data_sets")
    user_data_predicts = relationship("UserDataPredict", back_populates="user_data_set_own")


# 모델
class TrainingModel(Base):
    __tablename__ = "training_model"

    training_model_id = Column(Integer, primary_key=True, index=True)
    training_model_name = Column(String(20), index=True)
    training_model_xml = Column(String(10000))
    user_id = Column(String(100), index=True)
    training_model_date = Column(DateTime, index=True)

    user_data_predicts = relationship("UserDataPredict", back_populates="training_model_own")


# 사용자-데이터 분석
class UserDataPredict(Base):
    __tablename__ = "user_data_predict"

    user_data_predict_id = Column(Integer, primary_key=True, index=True)
    user_data_set_id = Column(Integer, ForeignKey("user_data_set.user_data_set_id"))
    training_model_id = Column(Integer, ForeignKey("training_model.training_model_id"))
    user_id = Column(String(100), index=True)
    user_data_predict_name = Column(String(20), index=True)
    user_data_predict_xml = Column(String(10000))
    user_data_predict_date = Column(DateTime, index=True)

    user_data_set_own = relationship("UserDataSet", back_populates="user_data_predicts")
    training_model_own = relationship("TrainingModel", back_populates="user_data_predicts")
