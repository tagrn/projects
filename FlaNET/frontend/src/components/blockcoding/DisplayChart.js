import React from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import Plotly from "plotly.js";
import store from "../../index.js";
import { setChart } from "../../actions";

function DisplayChart({ result, data }) {
  const dispatch = useDispatch();

  if (Object.values(data).length > 1) {
    // datas를 날짜와 값만 뽑아서 가공
    let dataDisplay = [];
    let chartPlotly = [];
    let layout = {};

    // 데이터 수집 그래프 그리기
    if (result[0].slice(-8) === "crawling") {
      if (data) {
        const dataDate = data.map((d) => d.data_set_date);
        const dataValue = data.map((d) => d.data_set_value);

        dataDisplay = [dataDate, dataValue];
      }

      chartPlotly = [
        {
          x: dataDisplay[0],
          y: dataDisplay[1],
          line: { color: "#0db3d9" },
          type: "scatter",
        },
      ];

      layout = {
        title: {
          text: "데이터 수집 결과",
        },
        autosize: false,
        width: 700,
        height: 500,
      };

      document.getElementById("displayChart").innerHTML = "";
      Plotly.newPlot("displayChart", chartPlotly, layout);
    }
    // Prophet 그래프 그리기
    else if (result[0] === "prophet") {
      let yhatDisplay = [];
      let trendDisplay = [];
      let weeklyDisplay = [];
      let yearlyDisplay = [];

      if (data) {
        const datasDate = data.map((d) => d.ds);
        const datasYhat = data.map((d) => d.yhat);
        const datasTrend = data.map((d) => d.trend);
        const datasWeekly = data.map((d) => d.weekly);
        let datasYearly = data.map((d) => {
          return d.yearly ? d.yearly : "";
        });

        datasYearly = datasYearly.filter(Boolean);
        const datasCloseTemp = data[0].Close
          ? data.map((d) => d.Close)
          : data.map((d) => d.Temp);

        yhatDisplay = [datasDate, datasYhat, datasCloseTemp];
        trendDisplay = [datasDate, datasTrend];
        weeklyDisplay = [
          data[0].Close
            ? ["월", "화", "수", "목", "금"]
            : ["월", "화", "수", "목", "금", "토", "일"],
          datasWeekly,
        ];
        yearlyDisplay = datasYearly;
      }

      const yhatPlotly = {
        name: "yhat",
        x: yhatDisplay[0],
        y: yhatDisplay[1],
        line: { color: "#d92525" },
        type: "scatter",
      };

      const closePlotly = {
        name: data[0].Close ? "Close" : "Temp",
        x: yhatDisplay[0],
        y: yhatDisplay[2],
        line: { color: "8977ad" },
        type: "scatter",
      };

      const trendPlotly = {
        name: "trend",
        x: trendDisplay[0],
        y: trendDisplay[1],
        line: { color: "#f2b90c" },
        type: "scatter",
        xaxis: "x2",
        yaxis: "y2",
      };

      const weeklyPlotly = {
        name: "weekly",
        x: weeklyDisplay[0],
        y: weeklyDisplay[1],
        line: { color: "#47a644" },
        type: "scatter",
        xaxis: "x3",
        yaxis: "y3",
      };

      const yearlyPlotly = {
        name: "yearly",
        y: yearlyDisplay,
        line: { color: "#0db3d9" },
        type: "scatter",
        xaxis: "x4",
        yaxis: "y4",
      };

      chartPlotly = [
        closePlotly,
        yhatPlotly,
        trendPlotly,
        weeklyPlotly,
        yearlyPlotly,
      ];

      layout = {
        title: {
          text: "PROPHET 결과",
        },
        grid: {
          rows: 4,
          columns: 1,
          pattern: "independent",
        },
        autosize: false,
        width: 700,
        height: 2000,
      };

      document.getElementById("displayChart").innerHTML = "";
      Plotly.newPlot("displayChart", chartPlotly, layout);
    }
    // TENSORFLOW (CNN, LSTM) 그래프 그리기
    else if (
      result[0] === "training" ||
      result[0] === "evaluate" ||
      result[0] === "predict"
    ) {
      if (result[0] === "training") {
        if (data) {
          const datasEpoch = data.map((d) => d.epoch);
          const datasLoss = data.map((d) => d.loss);
          const datasValLoss = data.map((d) => d.val_loss);

          dataDisplay = [datasEpoch, datasLoss, datasValLoss];
        }

        chartPlotly = [
          {
            name: "loss",
            x: dataDisplay[0],
            y: dataDisplay[1],
            line: { color: "#d92525" },
            type: "scatter",
          },
          {
            name: "val_loss",
            x: dataDisplay[0],
            y: dataDisplay[2],
            line: { color: "#0db3d9" },
            type: "scatter",
          },
        ];

        layout = {
          title: {
            text: "모델 훈련 결과",
          },
          autosize: false,
          width: 700,
          height: 500,
        };

        dispatch(setChart(dataDisplay));

        Plotly.newPlot("displayChart", chartPlotly, layout);
      } else if (result[0] === "evaluate") {
        const trainingDatas = store.getState().chart;

        if (data) {
          const datasDate = data.map((d) => d.Date);
          const datasActual = data.map((d) => d.actual);
          const datasTrain = data.map((d) => d.train_evaluate);
          const datasTest = data.map((d) => d.test_evaluate);

          dataDisplay = [datasDate, datasActual, datasTrain, datasTest];
        }

        const trainingChart = [
          {
            name: "loss",
            x: trainingDatas[0],
            y: trainingDatas[1],
            line: { color: "#d92525" },
            type: "scatter",
          },
          {
            name: "val_loss",
            x: trainingDatas[0],
            y: trainingDatas[2],
            line: { color: "#0db3d9" },
            type: "scatter",
          },
        ];

        const evaluateChart = [
          {
            name: "actual",
            x: dataDisplay[0],
            y: dataDisplay[1],
            line: { color: "#0db3d9" },
            type: "scatter",
            xaxis: "x2",
            yaxis: "y2",
          },
          {
            name: "train prediction",
            x: dataDisplay[0],
            y: dataDisplay[2],
            line: { color: "#47a644" },
            type: "scatter",
            xaxis: "x2",
            yaxis: "y2",
          },
          {
            name: "test prediction",
            x: dataDisplay[0],
            y: dataDisplay[3],
            line: { color: "#f2b904" },
            type: "scatter",
            xaxis: "x2",
            yaxis: "y2",
          },
        ];

        chartPlotly = trainingChart.concat(evaluateChart);

        layout = {
          title: "모델 훈련 및 평가 결과",
          grid: {
            rows: 2,
            columns: 1,
            pattern: "independent",
          },
          autosize: false,
          width: 700,
          height: 1000,
        };

        document.getElementById("displayChart").innerHTML = "";

        Plotly.newPlot("displayChart", chartPlotly, layout);
      } else if (result[0] === "predict") {
        const trainingDatas = store.getState().chart;
        let predictChart = [];

        const trainingChart = [
          {
            name: "loss",
            x: trainingDatas[0],
            y: trainingDatas[1],
            line: { color: "#d92525" },
            type: "scatter",
          },
          {
            name: "val_loss",
            x: trainingDatas[0],
            y: trainingDatas[2],
            line: { color: "#0db3d9" },
            type: "scatter",
          },
        ];

        if (store.getState().modelingStep.slice(-1)[0].result_evaluate) {
          const evaluateData = store.getState().modelingStep.slice(-1)[0]
            .result_evaluate;

          if (data) {
            const datasDate = evaluateData.map((d) => d.Date);
            const datasActual = evaluateData.map((d) => d.actual);
            const datasTrain = evaluateData.map((d) => d.train_evaluate);
            const datasTest = evaluateData.map((d) => d.test_evaluate);
            const datasFutureDate = data.map((d) => d.date);
            const datasFuture = data.map((d) => d.future);

            dataDisplay = [
              datasDate,
              datasActual,
              datasTrain,
              datasTest,
              datasFutureDate,
              datasFuture,
            ];
          }

          predictChart = [
            {
              name: "actual",
              x: dataDisplay[0],
              y: dataDisplay[1],
              line: { color: "#0db3d9" },
              type: "scatter",
              xaxis: "x2",
              yaxis: "y2",
            },
            {
              name: "train prediction",
              x: dataDisplay[0],
              y: dataDisplay[2],
              line: { color: "#47a644" },
              type: "scatter",
              xaxis: "x2",
              yaxis: "y2",
            },
            {
              name: "test prediction",
              x: dataDisplay[0],
              y: dataDisplay[3],
              line: { color: "#f2b90c" },
              type: "scatter",
              xaxis: "x2",
              yaxis: "y2",
            },
            {
              name: "future",
              x: dataDisplay[4],
              y: dataDisplay[5],
              line: { color: "#d92525" },
              type: "scatter",
              xaxis: "x2",
              yaxis: "y2",
            },
          ];

          chartPlotly = trainingChart.concat(predictChart);

          layout = {
            title: "모델 훈련, 평가 및 예측 결과",
            grid: {
              rows: 2,
              columns: 1,
              pattern: "independent",
            },
            autosize: false,
            width: 700,
            height: 1000,
          };
        } else {
          if (data) {
            const datasDate = data.map((d) => d.date);
            const datasFuture = data.map((d) => d.future);

            dataDisplay = [datasDate, datasFuture];
          }

          predictChart = [
            {
              name: "future",
              x: dataDisplay[0],
              y: dataDisplay[1],
              line: { color: "blue" },
              type: "scatter",
              xaxis: "x2",
              yaxis: "y2",
            },
          ];

          chartPlotly = trainingChart.concat(predictChart);

          layout = {
            title: "모델 훈련, 예측 결과",
            grid: {
              rows: 2,
              columns: 1,
              pattern: "independent",
            },
            autosize: false,
            width: 700,
            height: 1000,
          };
        }

        Plotly.newPlot("displayChart", chartPlotly, layout);
      }
    }
  } else if (Object.values(data).length > 0) {
    document.getElementById("displayChart").innerHTML =
      "<h5>차트를 그릴 수 없습니다.</h5>";
  } else if (result[0] === "initialize") {
    document.getElementById("displayChart").innerHTML = "";
  }

  return (
    <React.Fragment>
      <input name="nav" type="radio" className="nav" id="chart" />
      <div className="page">
        <div className="page-contents">
          <div className="displayContent" id="displayChart"></div>
        </div>
      </div>
      <label className="nav" htmlFor="chart">
        <span>차트</span>
      </label>
    </React.Fragment>
  );
}

DisplayChart.propTypes = {
  result: PropTypes.array,
  data: PropTypes.array,
};

export default connect((state) => ({
  result: state.userDataSetId,
  data: state.displayData,
}))(DisplayChart);
