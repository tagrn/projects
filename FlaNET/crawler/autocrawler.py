# 표준 라이브러리
import time, json, os
from ast import literal_eval

# 서드 파티 라이브러리
from dotenv import load_dotenv
import yfinance as yf
import requests


# chilling 값을 변화
chilling_time = [86400, 86302, 83493, 85555, 89999, 85306, 87772, 85122, 86120, 87924]
hidx = 0
cidx = 0
holiday = [False, False, False, False, True, True, False, False]
america_holiday = [False, False, False, False, False, True, True, False]
load_dotenv(verbose=True)
apikey = os.getenv("APIKEY")

# 매일 약 오후 7시(범위 랜덤)에 받아오게 끔 (시작시간 설정).
# 미국 시차 적용
while True:
    chilling = chilling_time[cidx]
    cidx += 1
    cidx %= 10
    hidx += 1
    hidx %= 7
    check = False
    now = time.localtime()
    year = str(now.tm_year)
    month = str(now.tm_mon)
    day = now.tm_mday

    if len(month) == 1:
        month = "0" + month
    if len(str(day)) == 1:
        str_day = "0" + str(day)
    else:
        str_day = str(day)

    today_date = year + "-" + month + "-" + str_day
    america_date = year + "-" + month + "-" + (str(day - 1) if day - 1 > 9 else ('0' + str(day - 1)))

    res = requests.get(
        "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey="
        + apikey
        + "&solYear="
        + year
        + "&solMonth="
        + month
    )
    points = res.text.split("isHoliday")

    for i in range(1, len(points), 2):
        if "Y" in points[i]:
            if day == int(points[i + 1].split("locdate")[1][7:9]):
                check = True
                break
    # 삼성 전자 데이터만 추가.
    for data_list_id in range(1,12):
        if 3 < data_list_id < 7:
            if america_holiday[hidx]:
                print('---------------------------')
                print('미국 주식시장 주말')
                print('---------------------------')
                continue
            data = str(yf.download('AAPL', start = today_date, end=today_date)).split('-')
            if str(data)[2:7] == 'Empty':
                print('---------------------------')
                print('미국 주식시장 휴무일')
                print('---------------------------')
                continue
            
        if data_list_id < 4:
            if holiday[hidx]:
                print('---------------------------')
                print('한국 주식시장 주말')
                print('---------------------------')
                continue
            if check:
                print('---------------------------')
                print('한국 주식시장 휴무일')
                print('---------------------------')
                continue

        if data_list_id == 7:
            continue
        if data_list_id < 7:
            res_c = requests.get(f"{base_url}/api/crawling/stocks/{data_list_id}/")
        else:
            res_c = requests.get(f"{base_url}/api/crawling/temperatures/{data_list_id}/")

        if str(res_c) == "<Response [500]>": 
            print(f"{data_list_id}번째 데이터 크롤링 실패")
            continue
        if str(res_c) == "<Response [400]>": 
            print(f"{data_list_id}번째 데이터 크롤링 실패")
            continue

        print(res_c)
        res_dic = literal_eval(res_c.text)
        if 3 < data_list_id < 7:
            res_dic["data_set_date"] = america_date

        resp = requests.post(
            "{base_url}/api/stocks/store/", data=json.dumps(res_dic)
        )
        print(
            "---------------------------------------- 데이터 추가 ----------------------------------------"
        )
        print(year + "년 " + month + "월 " + str(day) + "일")
        print(res_dic)
        print("***** 저장 유무 *****")
        print(resp)
        print(
            "--------------------------------------------------------------------------------------------"
        )

    
    time.sleep(chilling)