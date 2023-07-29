import Blockly from "blockly";
import store from "../../../index.js";
import {
  setDisplayCode,
  setModelingStep,
  setSpinner,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../../actions/index";

Blockly.Blocks.DataPreparation = {
  init() {
    const options = [
      ["8 : 2", "0.8"],
      ["7 : 3", "0.7"],
      ["6 : 4", "0.6"],
    ];

    this.appendDummyInput().appendField("모델링 데이터 정제");
    this.appendDummyInput()
      .appendField("     Data Set 비율 ")
      .appendField(new Blockly.FieldDropdown(options), "SELECT")
      .appendField(" (Train : Test)");
    this.setColour("#f2b90c");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

Blockly.JavaScript.DataPreparation = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("학습 실패"));
    store.dispatch(setModalOpen(true));
  };

  setTimeout(function () {
    store.dispatch(setSpinner(true));
    const rate = block.getFieldValue("SELECT");
    const modelingStep = store.getState().modelingStep;
    const code = store.getState().displayCode;

    const url = "{base_url}/ml/tensorflow/preprocess";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_raw_data: modelingStep[1],
        set_rate: rate,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setDisplayCode(`${code}\n${res.code}`));
        store.dispatch(setModelingStep(res));
        store.dispatch(setSpinner(false));
      })
      .catch(() => {
        openErrorModal();
      });
  }, 5000);

  return "DataPreparation";
};
