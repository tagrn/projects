# Backend

## windows 실행 방법

```bash
cd backend # 이미 backend 폴더라면 X
python -m venv env # 가상환경 생성
source ./env/Scripts/activate # 가상환경 활성화
pip install -r requirements.txt
cd app
Uvicorn main:app --reload

#### 추가 ####
# 가상환경을 끄고 싶다면
deactivate # 이 명령어 하나면 가상환경 비활성화
```



## 리눅스 실행방법

```bash
cd backend # 이미 backend 폴더라면 X
python -m venv env # 가상환경 생성
source ./env/bin/activate # 가상환경 활성화
pip install -r requirements.txt
cd app
Uvicorn main:app --reload

#### 추가 ####
# 가상환경을 끄고 싶다면
deactivate # 이 명령어 하나면 가상환경 비활성화
```



## DB 세팅

### DB 설정 및 사용자 생성

```bash
mysql -u root -p # 세팅된 비번으로 mysql 접속
```

##### 원격접속 가능하도록 세팅

```sql
create user 'flanet'@'%' identified by 'budspro';
grant all privileges on *.* to 'flanet'@'%';
```



## .env로 Key 숨기기

* database.py 및 consts.py 파일을 보면 숨겨놓았습니다.
* 하지만 일단 초기에는 쉽게 작동하기 위해 if문으로 조정해놓았습니다.
* `.env` 파일은 app폴더 안에 두시면 되고 메타모스트를 통해 제공합니다.



## config.py와 consts.py 이해

* 환경마다 다른 설정파일을 넣는 것을 config.py에 넣고 사용하면 됩니다.
* 어떤 환경에도 변경되지 않는 것을 consts.py에 넣고 사용하면 됩니다.
* 근데 사실... 이번 프로젝트에는 consts.py 밖에 필요없을 듯합니다.



## 라우터

ex) 실습

* 메인에서 작성

  ```python
  from routers.users import router as user_router
  
  app.include_router(user_router)
  ```

* routers 폴더안에서 users.py 파일 작성

  ```python
  # 표준 라이브러리
  from sys import path as pth
  from os import path
  
  # 서드 파티 라이브러리
  from fastapi import APIRouter, Depends, HTTPException
  from sqlalchemy.orm import Session
  
  # 로컬
  pth.append(path.dirname(path.abspath(path.dirname(__file__))))
  from database import crud, schemas
  from dependency import get_db
  
  
  router = APIRouter()
  
  
  # 유저 생성
  @router.post("/users/create/", response_model=schemas.User, tags=["users"])
  def create_user(user: schemas.UserBase, db: Session = Depends(get_db)):
      db_user = crud.get_user_by_email(db, email=user.email)
      if db_user:
          raise HTTPException(status_code=400, detail="Email already registered")
      return crud.create_user(db=db, user=user)
  
  
  # 모든 유저 확인
  @router.get("/users/all/", tags=["users"])
  def show_all_users(db: Session = Depends(get_db)):
      return crud.get_all_users(db=db)
  ```

* 즉, 이 라우터와 main.py를 이어야 한다.

  * 중요한 코드

    ```python
    # APIRouter 임포트하고
    from fastapi import APIRouter
    
    # main의 app처럼 router 선언
    router = APIRouter()
    
    # main에서는 app.get을 사용했지만 router에서는 이렇게 사용한다.
    # tags는 swagger에서 분류하기 위한 작업
    @router.get("/users/all/", tags=["users"])
    ```

    

## pylint

* 안 봐도 될 메세지 정리

  ```bash
  pylint 파일명 -d C0114 -d C0115 -d C0116 -d C0304 -d E0401 -d R0903
  ```

* .vscode 폴더 안의 settings.json에 넣으시면 됨당! 가상환경 깔고 실행한번 시키면 생길거에요.

  ```json
  {
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": [
        "--line-length",
        "100"
    ],
    "editor.formatOnSave": true,
    "python.linting.pylintArgs": ["--load-plugin","pylint_protobuf"] 
  }
  ```



### 백엔드 초기 파일 린팅 완료.