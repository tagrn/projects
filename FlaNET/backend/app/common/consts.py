# 서드 파티 라이브러리
from pydantic import BaseSettings


# 전역 변수 세팅 및 자주 사용할 변수들
# 밑에는 DB 변수 예시
class Settings(BaseSettings):
    # db_user: str = (DB_USER if DB_USER else "flanet:budspro")
    # db_name: str = (DB_NAME if DB_NAME else "blockai")
    pass
