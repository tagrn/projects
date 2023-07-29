export const getDataList = function () {
  return function (dispatch) {
    fetch(`{base_url}/api/data/datalist/all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_DATA_LIST",
          payload: res,
        });
      });
  };
};

export const getModelList = function () {
  return function (dispatch) {
    fetch({base_url}/api/data/trainingmodel/all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_MODEL_LIST",
          payload: res,
        });
      });
  };
};

export const getUserDataSet = function (userId) {
  return function (dispatch) {
    fetch(`{base_url}/api/data/userdataset/select/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_USER_DATA_SET",
          payload: res,
        });
      });
  };
};

export const getUserModelSet = function (userId) {
  return function (dispatch) {
    fetch(`{base_url}/api/data/trainingmodel/select/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_USER_MODEL_SET",
          payload: res,
        });
      });
  };
};

export const getUserPredictDataSet = function (userId) {
  return function (dispatch) {
    fetch(
      `{base_url}/api/data/userdatapredict/select/${userId}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_USER_PREDICT_DATA_SET",
          payload: res,
        });
      });
  };
};

export const setUserDataSetId = function (userDataSetId) {
  return {
    type: "SET_USER_DATA_SET_ID",
    payload: userDataSetId,
  };
};

export const setDisplayData = function (data) {
  return {
    type: "SET_DISPLAY_DATA",
    payload: data,
  };
};

export const setDisplayCode = function (code) {
  return {
    type: "SET_DISPLAY_CODE",
    payload: code,
  };
};

export const setModelingStep = function (step) {
  return {
    type: "SET_MODELING_STEP",
    payload: step,
  };
};

export const initModelingStep = function (length) {
  return {
    type: "INIT_MODELING_STEP",
    payload: length,
  };
};

export const setSpinner = function (status) {
  return {
    type: "SET_SPINNER",
    payload: status,
  };
};

export const setChart = function (data) {
  return {
    type: "SET_CHART",
    payload: data,
  };
};

export const setModalOpen = function (status) {
  return {
    type: "SET_MODAL_OPEN",
    payload: status,
  };
};

export const setModalTitle = function (status) {
  return {
    type: "SET_MODAL_TITLE",
    payload: status,
  };
};

export const setModalContent = function (status) {
  return {
    type: "SET_MODAL_CONTENT",
    payload: status,
  };
};

export const setModalPage = function (modalPage) {
  return {
    type: "SET_MODAL_PAGE",
    payload: modalPage,
  };
};
