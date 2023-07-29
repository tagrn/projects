# MLServer

## windows 실행 방법

```bash
cd MLServer # 이미 MLServer 폴더라면 X
python -m venv env # 가상환경 생성
source ./env/Scripts/activate # 가상환경 활성화
pip install -r requirements.txt
cd app
Uvicorn main:app --reload --port=8081	# fastapi default는 8000이라 수동 변경

#### 추가 ####
# 가상환경을 끄고 싶다면
deactivate # 이 명령어 하나면 가상환경 비활성화
```



## 리눅스 실행방법

```bash
cd MLServer # 이미 MLServer 폴더라면 X
python -m venv env # 가상환경 생성
source ./env/bin/activate # 가상환경 활성화
pip install -r requirements.txt
cd app
Uvicorn main:app --reload --port=8081	# fastapi default는 8000이라 수동 변경

#### 추가 ####
# 가상환경을 끄고 싶다면
deactivate # 이 명령어 하나면 가상환경 비활성화
```