# 표준 라이브러리
import warnings

warnings.filterwarnings("ignore")

# 서드 파티 라이브러리
import pandas as pd
from fbprophet import Prophet
from fbprophet.plot import seasonality_plot_df
import numpy as np


# prophet 옵션 없는 상태.original_df = 원본
def prophet_stock(conv_df, item, period_value, cps, original_df):

    # 데이터 입력, 전처리
    df = pd.DataFrame({"ds": conv_df.index, "y": conv_df[item]})

    # prophet object 생성
    m = Prophet(daily_seasonality=True, changepoint_prior_scale=cps)

    m.fit(df)

    future = m.make_future_dataframe(periods=period_value)
    start_date = future["ds"][0]

    # 주말 데이터 삭제
    if item == "Close":
        future["day"] = future["ds"].dt.weekday
        future = future[future["day"] <= 4]

    forecast = m.predict(future)

    s = set(["ds", "yhat", "trend", "weekly", "yearly"])

    # 데이터가 1년 이상과 미만
    if s.issubset(set(forecast.columns)):
        result = forecast[["ds", "yhat", "trend", "weekly", "yearly"]]
        result["yearly"] = pd.DataFrame(Decomposition(m, "yearly", start_date))
    else:  # 15일 이상 제약으로 weekly는 가능
        result = forecast[["ds", "yhat", "trend", "weekly"]]

    result["weekly"] = result.groupby([result["ds"].dt.weekday])["weekly"].mean()

    # 기존 데이터와 예측 데이터 병합
    original_df = original_df.rename({"Date": "ds"}, axis="columns")

    original_df["ds"] = original_df["ds"].astype("datetime64[ns]")

    result = pd.merge(result, original_df, how="outer", on="ds")

    return result.to_csv(index=False)


def Decomposition(m, name, start_date):
    start = pd.to_datetime(start_date)
    period = m.seasonalities[name]["period"]
    end = start + pd.Timedelta(days=period)
    plot_points = 200
    days = pd.to_datetime(np.linspace(start.value, end.value, plot_points))
    df_y = seasonality_plot_df(m, days)
    seas = m.predict_seasonal_components(df_y)

    return seas[name].values