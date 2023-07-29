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

Blockly.Blocks.ModelCNNTraining = {
  init() {
    this.appendDummyInput().appendField("CNN 모델 학습");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#0db3d9");
  },
};

Blockly.JavaScript.ModelCNNTraining = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("학습 실패!"));
    store.dispatch(setModalOpen(true));
  };

  setTimeout(function () {
    store.dispatch(setSpinner(true));
    const user = JSON.parse(
      sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
      )
    );
    const modelingStep = store.getState().modelingStep;
    const code = store.getState().displayCode;

    const url = "{base_url}/ml/tensorflow/cnn/training";

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
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setUserDataSetId(["training", res.training_model_id]));
        store.dispatch(setDisplayCode(`${code}\n${res.code}`));
        store.dispatch(setDisplayData(res.result_training));
        store.dispatch(setModelingStep(res));
        store.dispatch(setSpinner(false));
      })
      .catch(() => {
        openErrorModal();
      });
  }, 7000);

  return "ModelCNNTraining";
};
