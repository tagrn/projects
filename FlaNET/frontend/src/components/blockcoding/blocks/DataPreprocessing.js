import Blockly from "blockly/core";
import store from "../../../index.js";
import {
  setDisplayCode,
  setSpinner,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../../actions/index";

const dataPreprocessing = {
  type: "DataPreprocessing",
  message0: "수집 데이터 정제",
  previousStatement: null,
  colour: "#f2b90c",
};

Blockly.Blocks.DataPreprocessing = {
  init() {
    this.jsonInit(dataPreprocessing);
  },
};

Blockly.JavaScript.DataPreprocessing = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("전처리 실패"));
    store.dispatch(setModalOpen(true));
  };

  setTimeout(function () {
    store.dispatch(setSpinner(true));
    let codeurl = "";
    const userDataSetId = store.getState().userDataSetId;
    const code = store.getState().displayCode;

    if (userDataSetId[0] === "stock crawling") {
      codeurl = "{base_url}/api/code/dataprocessing/stock";
    } else if (userDataSetId[0] === "stock period crawling") {
      codeurl =
        "{base_url}/api/code/dataprocessing/stock/period";
    } else if (userDataSetId[0] === "temperature crawling") {
      codeurl = "{base_url}/api/code/dataprocessing/temperature";
    } else if (userDataSetId[0] === "temperature period crawling") {
      codeurl =
        "{base_url}/api/code/dataprocessing/temperature/period";
    }

    fetch(codeurl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setDisplayCode(`${code}\n${res.code}`));
        store.dispatch(setSpinner(false));
      })
      .catch(() => {
        openErrorModal();
      });
  }, 500);

  return "DataPreprocessing";
};
