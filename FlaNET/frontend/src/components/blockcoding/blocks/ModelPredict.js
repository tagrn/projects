import Blockly from "blockly";
import store from "../../../index.js";
import {
  setDisplayCode,
  setDisplayData,
  setUserDataSetId,
  setSpinner,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../../actions/index";

Blockly.Blocks.ModelPredict = {
  init() {
    this.appendDummyInput().appendField("데이터 추론");
    this.appendDummyInput()
      .appendField("     추론 기간")
      .appendField(new Blockly.FieldTextInput("ex. 10, 20, 30"), "PERIOD")
      .appendField("일");
    this.setColour("#d92525");
    this.setPreviousStatement(true, null);
    this.setTooltip(
      "학습이 완료된 모델을 통해 원하는 기간의 데이터를 추론할 수 있습니다."
    );
  },
};

Blockly.JavaScript.ModelPredict = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("추론 실패!"));
    store.dispatch(setModalOpen(true));
  };

  setTimeout(function () {
    store.dispatch(setSpinner(true));
    const periods = block.getFieldValue("PERIOD");
    const user = JSON.parse(
      sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
      )
    );
    const modelingStep = store.getState().modelingStep;
    const code = store.getState().displayCode;

    const url = "{base_url}/ml/tensorflow/predict";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_data_set_id: modelingStep[0].userDataSetId,
        input_processed_data: modelingStep[2],
        training_model_id: modelingStep[3].training_model_id,
        user_id: user.uid,
        period: periods,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(
          setUserDataSetId(["predict", modelingStep[3].training_model_id])
        );
        store.dispatch(setDisplayCode(`${code}\n${res.code}`));
        store.dispatch(setDisplayData(res.result_predict));
        store.dispatch(setSpinner(false));
      })
      .catch(() => {
        openErrorModal();
      });
  }, 40000);

  return "ModelPredict";
};
