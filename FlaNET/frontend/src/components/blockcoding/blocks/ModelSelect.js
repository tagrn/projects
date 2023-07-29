import Blockly from "blockly";
import store from "../../../index.js";
import {
  setModelingStep,
  setSpinner,
  setUserDataSetId,
} from "../../../actions/index";

const makeOptionsArray = function (userModelSets) {
  const options = [];

  for (let index = 0; index < userModelSets.length; index++) {
    if (userModelSets[index].training_model_xml !== null) {
      const temp = [];

      if (userModelSets[index].training_model_name === null) {
        temp.push(`모델 (${userModelSets[index].training_model_date})`);
      } else {
        temp.push(userModelSets[index].training_model_name);
      }
      temp.push(String(userModelSets[index].training_model_id));
      options.push(temp);
    }
  }

  if (options.length === 0) {
    const temp = ["선택 불가", "0"];

    options.push(temp);
  }

  return options;
};

Blockly.Blocks.ModelSelect = {
  init() {
    const userModelSets = store.getState().userModelSets;

    const modelSelect = new Blockly.FieldDropdown(
      makeOptionsArray(Object.values(userModelSets)[0])
    );

    this.appendDummyInput()
      .appendField("학습 모델 선택")
      .appendField(modelSelect, "SELECT");
    this.setColour("#0db3d9");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

Blockly.JavaScript.ModelSelect = function (block) {
  setTimeout(function () {
    store.dispatch(setSpinner(true));
    const trainingModelId = block.getFieldValue("SELECT");

    store.dispatch(setUserDataSetId(["training", trainingModelId]));
    store.dispatch(setModelingStep({ training_model_id: trainingModelId }));
    store.dispatch(setSpinner(false));
  }, 7000);

  return "ModelSelect";
};
