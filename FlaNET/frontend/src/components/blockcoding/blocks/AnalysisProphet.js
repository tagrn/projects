import * as Blockly from "blockly/core";
import "blockly/javascript";
import store from "../../../index.js";
import {
  setUserDataSetId,
  setDisplayData,
  setDisplayCode,
  setSpinner,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../../actions/index";

Blockly.Blocks.AnalysisProphet = {
  init() {
    this.appendDummyInput().appendField("PROPHET - 분석, 추론");
    this.appendDummyInput()
      .appendField("     추론 기간")
      .appendField(new Blockly.FieldTextInput("ex. 10, 20, 30"), "PERIOD")
      .appendField("일");
    this.appendDummyInput()
      .appendField("     민감도")
      .appendField(new Blockly.FieldTextInput("ex. 0.1 (0 ~ 1)"), "CPS");
    this.setTooltip("PROPHET을 통해 분석을 진행할 수 있습니다.");
    this.setColour("#0db3d9");
    this.setPreviousStatement(true, null);
  },
};

Blockly.JavaScript.AnalysisProphet = function (block) {
  setTimeout(function () {
    store.dispatch(setSpinner(true));
    const dataId = store.getState().userDataSetId[1];
    const periods = block.getFieldValue("PERIOD");
    const cps = block.getFieldValue("CPS");

    const url = "{base_url}/ml/prophet/stock/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_data_set_id: dataId,
        periods,
        cps,
      }),
    })
      .then((res1) => res1.json())
      .then((res1) => {
        const dataurl = `{base_url}/csv/download/userdatapredict/json/${res1.user_data_predict_id}`;
        const code = store.getState().displayCode;

        store.dispatch(
          setUserDataSetId(["prophet", res1.user_data_predict_id])
        );
        store.dispatch(setDisplayCode(`${code}\n\n${res1.code}`));

        fetch(dataurl, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => {
            store.dispatch(setDisplayData(data));
            store.dispatch(setSpinner(false));
          })
          .catch(() => {
            store.dispatch(setModalTitle("error!"));
            store.dispatch(setModalContent("분석 및 추론 실패."));
            store.dispatch(setModalOpen(true));
          });
      })
      .catch(() => {
        store.dispatch(setModalTitle("error!"));
        store.dispatch(setModalContent("분석 및 추론 실패."));
        store.dispatch(setModalOpen(true));
      });
  }, 500);

  return "AnalysisProphet";
};
