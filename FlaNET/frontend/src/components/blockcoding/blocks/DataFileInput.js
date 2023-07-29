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

let file = "";

Blockly.Blocks.DataFileInput = {
  init() {
    const fileInput = new Blockly.FieldTextInput(".csv 파일을 선택해주세요");

    this.appendDummyInput().appendField("데이터 입력").appendField(fileInput);
    this.setColour("#47a644");
    this.setNextStatement(true, null);
    this.setTooltip("CSV 파일을 업로드해서 데이터를 입력할 수 있습니다.");

    fileInput.showEditor_ = () => {
      const input = document.createElement("input");

      input.type = "file";
      input.accept = ".csv";
      input.onchange = function (event) {
        file = event.target.files[0];
        fileInput.setValue(event.target.files[0].name);
      };
      input.click();
    };
  },
};

Blockly.JavaScript.DataFileInput = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("데이터 저장 실패"));
    store.dispatch(setModalOpen(true));
  };

  store.dispatch(setSpinner(true));

  const user = JSON.parse(
    sessionStorage.getItem(
      `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
    )
  );

  let url = "{base_url}/api/csv/upload/userdataset";
  const formData = new FormData();

  formData.append("file", file);
  formData.append("user_id", user.uid);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(setDisplayCode(""));
      store.dispatch(
        setUserDataSetId(["crawling", res.user_data_set.user_data_set_id])
      );
      store.dispatch(initModelingStep(store.getState().modelingStep.length));
      store.dispatch(
        setModelingStep({ userDataSetId: res.user_data_set.user_data_set_id })
      );

      url = `{base_url}/api/easy/userdataset/${res.user_data_set.user_data_set_id}`;

      fetch(url, {
        method: "GET",
      })
        .then((res1) => res1.json())
        .then((res1) => {
          const inputRawData = res1.data_set.map((data) => ({
            Date: data.data_set_date,
            analysis_value: data.data_set_value,
          }));

          store.dispatch(setModelingStep({ raw_data: inputRawData }));
          store.dispatch(setDisplayData(res1.data_set));
          store.dispatch(setSpinner(false));
        })
        .catch(() => {
          openErrorModal();
        });
    })
    .catch(() => {
      openErrorModal();
    });

  return "DataFileInput";
};
