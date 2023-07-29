import Blockly from "blockly";
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

const makeOptionsArray = function (dataLists) {
  const options = [];

  for (let index = 0; index < dataLists.length; index++) {
    if (dataLists[index].data_list_url !== null) {
      const temp = [];

      temp.push(
        `${dataLists[index].data_list_type === "stock" ? "주식" : "기온"} - ${
          dataLists[index].data_list_name
        }`
      );
      temp.push(String(dataLists[index].data_list_id));
      options.push(temp);
    }
  }

  return options.sort();
};

Blockly.Blocks.DataCrawlingRealTime = {
  init() {
    const dataLists = store.getState().dataLists;

    const dataSelect = new Blockly.FieldDropdown(
      makeOptionsArray(Object.values(dataLists)[0])
    );

    this.appendDummyInput()
      .appendField("실시간 데이터 수집")
      .appendField(dataSelect, "DATA");
    this.setColour("#47a644");
    this.setTooltip("원하는 데이터 값을 실시간으로 확인할 수 있습니다.");
  },
};

Blockly.JavaScript.DataCrawlingRealTime = function (block) {
  const openErrorModal = () => {
    store.dispatch(setModalTitle("error!"));
    store.dispatch(setModalContent("데이터 수집 실패"));
    store.dispatch(setModalOpen(true));
  };

  store.dispatch(setSpinner(true));

  const dataId = block.getFieldValue("DATA");

  const user = JSON.parse(
    sessionStorage.getItem(
      `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
    )
  );

  let url = "";
  let userDataSetName = "";

  if (dataId <= 6) {
    url = "{base_url}/api/crawling/stocks";
    userDataSetName = "stock crawling";
  } else {
    url = "{base_url}/api/crawling/temperatures";
    userDataSetName = "temperature crawling";
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data_list_id: dataId,
      user_id: user.uid,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(
        setUserDataSetId([userDataSetName, res.user_data_set.user_data_set_id])
      );
      store.dispatch(
        setDisplayData([
          `실시간 데이터 수집 결과는 ${res.data_set_value} 입니다.`,
        ])
      );
      store.dispatch(setSpinner(false));
    })
    .catch(() => {
      openErrorModal();
    });

  const codeurl = `{base_url}/api/code/crawling/${dataId}`;

  fetch(codeurl, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(setDisplayCode(res.code));
    })
    .catch(() => {
      openErrorModal();
    });

  return "실시간 데이터 수집";
};
