import Blockly from "blockly";
import store from "../../../index.js";
import {
  setDisplayCode,
  setDisplayData,
  setModelingStep,
  setUserDataSetId,
  setSpinner,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../../actions/index";

Blockly.Blocks.ModelEvaluate = {
  init() {
    this.appendDummyInput().appendField("학습 모델 평가");
    this.setColour("#d92525");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

Blockly.JavaScript.ModelEvaluate = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("평가 실패!"));
    store.dispatch(setModalOpen(true));
  };

  setTimeout(function () {
    store.dispatch(setSpinner(true));
    const modelingStep = store.getState().modelingStep;
    const code = store.getState().displayCode;

    const url = "{base_url}/ml/tensorflow/evaluate";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_processed_data: modelingStep[2],
        training_model_id: modelingStep[3].training_model_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(
          setUserDataSetId(["evaluate", modelingStep[3].training_model_id])
        );
        store.dispatch(setDisplayCode(`${code}\n${res.code}`));
        store.dispatch(setDisplayData(res.result_evaluate));
        store.dispatch(setModelingStep(res));
        store.dispatch(setSpinner(false));
      })
      .catch(() => {
        openErrorModal();
      });
  }, 30000);

  return "ModelEvaluate";
};
