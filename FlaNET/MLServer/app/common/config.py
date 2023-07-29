# 표준 라이브러리
from dataclasses import dataclass
from os import environ, path


base_dir = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))


@dataclass
class Config:
    # 기본 Configuration
    BASE_DIR = base_dir
    DB_POOL_RECYCLE: int = 900
    DB_ECHO: bool = True


@dataclass
class LocalConfig(Config):
    PROJ_RELOAD: bool = True


@dataclass
class ProdConfig(Config):
    PROJ_RELOAD: bool = False


# 설정해야 할 때, 적는 부분, 지금은 설정할게 없다.
# 밑의 conf() 아직 사용 X
def conf():
    config = dict(prod=ProdConfig(), local=LocalConfig())
    return config.get(environ.get("API_ENV", "local"))