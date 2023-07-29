import Blockly from "blockly";
import createTrainingPlus from "./TrainingPlus";
import createTrainingMinus from "./TrainingMinus";
import store from "../../../index.js";
import {
  setDisplayCode,
  setDisplayData,
  setModelingStep,
  setUserDataSetId,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../../actions/index";

const modelCustomTraining = {
  type: "ModelCustomTraining",
  message0: "나만의 딥러닝 모델 %1",
  args0: [
    {
      type: "input_dummy",
      name: "EMPTY",
    },
  ],
  colour: "#0DB3D9",
  previousStatement: null,
  nextStatement: null,
  tooltip: "다양한 레이어를 쌓아 나만의 딥러닝 모델로 학습할 수 있습니다.",
  mutator: "training_list_mutators",
};

Blockly.Blocks.ModelCustomTraining = {
  init() {
    this.jsonInit(modelCustomTraining);
  },
};

Blockly.JavaScript.ModelCustomTraining = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("학습 실패!"));
    store.dispatch(setModalOpen(true));
  };

  setTimeout(function () {
    const user = JSON.parse(
      sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
      )
    );
    const modelingStep = store.getState().modelingStep;
    const code = store.getState().displayCode;

    const childBlocks = block.getChildren();
    const layerList = [];

    for (let i = 0; i < childBlocks.length; i++) {
      const layer = { layer_name: childBlocks[i].type };

      for (let j = 1; j < childBlocks[i].inputList.length; j++) {
        layer[childBlocks[i].inputList[j].fieldRow[1].name] =
          childBlocks[i].inputList[j].fieldRow[1].value_;
      }

      layerList.push(layer);
    }

    const url = "{base_url}/ml/tensorflow/custom/training";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_processed_data: modelingStep[2],
        input_layer: layerList,
        user_id: user.uid,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setUserDataSetId(["training", res.training_model_id]));
        store.dispatch(setDisplayCode(`${code}\n${res.code}`));
        store.dispatch(setDisplayData(res.result_training));
        store.dispatch(setModelingStep(res));
      })
      .catch(() => {
        openErrorModal();
      });
  }, 7000);

  return "ModelCustomTraining";
};

const listCreateMutator = {
  itemCount_: 0,

  mutationToDom() {
    const container = Blockly.utils.xml.createElement("mutation");

    container.setAttribute("items", this.itemCount_);

    return container;
  },

  domToMutation(xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute("items"), 10);

    this.updateShape_(targetCount);
  },

  updateShape_(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
    this.updateMinus_();
  },

  plus() {
    this.addPart_();
    this.updateMinus_();
  },

  minus() {
    if (this.itemCount_ === 0) {
      return;
    }
    this.removePart_();
    this.updateMinus_();
  },

  addPart_() {
    if (this.itemCount_ === 0) {
      this.removeInput("EMPTY");
      this.topInput_ = this.appendValueInput(`ADD ${this.itemCount_}`)
        .appendField(createTrainingPlus(), "PLUS")
        .appendField("나만의 딥러닝 모델");
    } else {
      this.appendValueInput(`ADD ${this.itemCount_}`);
    }
    this.itemCount_++;
  },

  removePart_() {
    this.itemCount_--;
    this.removeInput(`ADD ${this.itemCount_}`);
    if (this.itemCount_ === 0) {
      this.topInput_ = this.appendDummyInput("EMPTY")
        .appendField(createTrainingPlus(), "PLUS")
        .appendField("나만의 딥러닝 모델");
    }
  },

  updateMinus_() {
    const minusField = this.getField("MINUS");

    if (!minusField && this.itemCount_ > 0) {
      this.topInput_.insertFieldAt(1, createTrainingMinus(), "MINUS");
    } else if (minusField && this.itemCount_ < 1) {
      this.topInput_.removeField("MINUS");
    }
  },
};

const listCreateHelper = function () {
  this.getInput("EMPTY").insertFieldAt(0, createTrainingPlus(), "PLUS");
  this.updateShape_(1);
};

Blockly.Extensions.registerMutator(
  "training_list_mutators",
  listCreateMutator,
  listCreateHelper
);
