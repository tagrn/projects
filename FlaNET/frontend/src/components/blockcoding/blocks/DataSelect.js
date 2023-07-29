import Blockly from "blockly";
import store from "../../../index.js";
import {
  initModelingStep,
  setDisplayCode,
  setDisplayData,
  setModelingStep,
  setUserDataSetId,
  setSpinner,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../../actions/index";

const makeOptionsArray = function (userDataSets) {
  const options = [];

  for (let index = 0; index < userDataSets.length; index++) {
    if (userDataSets[index].user_data_set_xml !== null) {
      const dateStart = new Date(userDataSets[index].user_data_set_start);
      const dateEnd = new Date(userDataSets[index].user_data_set_end);

      const dateDiff =
        (dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24);

      if (dateDiff > 30 || userDataSets[index].user_data_set_start === null) {
        const temp = [];

        if (userDataSets[index].user_data_set_name === null) {
          temp.push(`데이터 (${userDataSets[index].user_data_set_date})`);
        } else {
          temp.push(userDataSets[index].user_data_set_name);
        }
        temp.push(String(userDataSets[index].user_data_set_id));
        options.push(temp);
      }
    }
  }

  if (options.length === 0) {
    const temp = ["선택 불가", "0"];

    options.push(temp);
  }

  return options;
};

Blockly.Blocks.DataSelect = {
  init() {
    const userDataSets = store.getState().userDataSets;

    const dataSelect = new Blockly.FieldDropdown(
      makeOptionsArray(Object.values(userDataSets)[0])
    );

    this.appendDummyInput("user_data_set")
      .appendField("저장된 데이터 선택")
      .appendField(dataSelect, "SELECT");
    this.setNextStatement(true, null);
    this.setColour("#47a644");
  },
};

Blockly.JavaScript.DataSelect = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("처리 실패!"));
    store.dispatch(setModalOpen(true));
  };

  store.dispatch(setSpinner(true));

  const userDataSetId = block.getFieldValue("SELECT");

  let url = `{base_url}/api/easy/userdataset/${userDataSetId}`;

  store.dispatch(setUserDataSetId(["crawling", userDataSetId]));
  store.dispatch(setDisplayCode(""));
  store.dispatch(initModelingStep(store.getState().modelingStep.length));
  store.dispatch(setModelingStep({ userDataSetId }));

  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(setDisplayData(res.data_set));
    })
    .catch(() => {
      openErrorModal();
    });

  url = "{base_url}/ml/tensorflow/input";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_data_set_id: userDataSetId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(setDisplayCode(res.code));
      store.dispatch(setModelingStep(res));
      store.dispatch(setSpinner(false));
    })
    .catch(() => {
      openErrorModal();
    });

  return "DataSelect";
};
