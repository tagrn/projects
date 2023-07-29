import Blockly from "blockly/core";
import store from "../../../index.js";
import {
  setUserDataSetId,
  setDisplayData,
  setSpinner,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../../actions/index";

Blockly.Blocks.AnalysisLSTM = {
  init() {
    this.appendDummyInput().appendField("LSTM 모델 - 학습, 평가, 추론");
    this.appendDummyInput()
      .appendField("     추론 기간")
      .appendField(new Blockly.FieldTextInput("ex. 10, 20, 30"), "PERIOD")
      .appendField("일");
    this.setColour("#0db3d9");
    this.setPreviousStatement(true, null);
    this.setTooltip("LSTM 모델을 통해 분석을 진행할 수 있습니다.");
  },
};

Blockly.JavaScript.AnalysisLSTM = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("LSTM 학습에 실패했습니다!"));
    store.dispatch(setModalOpen(true));
  };

  setTimeout(function () {
    store.dispatch(setSpinner(true));
    const dataId = store.getState().userDataSetId[1];
    const modelingStep = store.getState().modelingStep;
    const periods = block.getFieldValue("PERIOD");

    const user = JSON.parse(
      sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
      )
    );

    let url = "{base_url}/ml/tensorflow/lstm/training";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_processed_data: modelingStep[2],
        user_id: user.uid,
      }),
    })
      .then((res1) => res1.json())
      .then((res1) => {
        store.dispatch(setUserDataSetId(["training", res1.training_model_id]));
        store.dispatch(setDisplayData(res1.result_training));

        url = "{base_url}/ml/tensorflow/evaluate";

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input_processed_data: modelingStep[2],
            training_model_id: res1.training_model_id,
          }),
        })
          .then((res2) => res2.json())
          .then((res2) => {
            store.dispatch(
              setUserDataSetId(["evaluate", res1.training_model_id])
            );
            store.dispatch(setDisplayData(res2.result_evaluate));

            url = "{base_url}/ml/tensorflow/predict";

            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_data_set_id: dataId,
                input_processed_data: modelingStep[2],
                training_model_id: res1.training_model_id,
                user_id: user.uid,
                period: periods,
              }),
            })
              .then((res3) => res3.json())
              .then((res3) => {
                store.dispatch(
                  setUserDataSetId(["predict", res1.training_model_id])
                );
                store.dispatch(setDisplayData(res3.result_predict));
                store.dispatch(setSpinner(false));
              })
              .catch(() => {
                openErrorModal();
              });
          })
          .catch(() => {
            openErrorModal();
          });
      })
      .catch(() => {
        openErrorModal();
      });
  }, 7000);

  return "AnalysisLSTM";
};
