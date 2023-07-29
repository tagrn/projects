const initialState = {
  dataLists: {},
  modelLists: {},
  userDataSets: {},
  userModelSets: {},
  userPredictData: {},
  userDataSetId: [],
  displayData: [],
  displayCode: "",
  modelingStep: [],
  spinner: false,
  chart: [],
  modalOpen: false,
  modalTitle: "",
  modalContent: "",
  modalPage: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_LIST":
      return { ...state, dataLists: action.payload };
    case "GET_MODEL_LIST":
      return { ...state, modelLists: action.payload };
    case "GET_USER_DATA_SET":
      return { ...state, userDataSets: action.payload };
    case "GET_USER_MODEL_SET":
      return { ...state, userModelSets: action.payload };
    case "GET_USER_PREDICT_DATA_SET":
      return { ...state, userPredictData: action.payload };
    case "SET_USER_DATA_SET_ID":
      return { ...state, userDataSetId: action.payload };
    case "SET_DISPLAY_DATA":
      return { ...state, displayData: action.payload };
    case "SET_DISPLAY_CODE":
      return { ...state, displayCode: action.payload };
    case "SET_MODELING_STEP":
      return {
        ...state,
        modelingStep: [...state.modelingStep, action.payload],
      };
    case "INIT_MODELING_STEP":
      return {
        ...state,
        modelingStep: state.modelingStep.slice(action.payload + 1),
      };
    case "SET_SPINNER":
      return { ...state, spinner: action.payload };
    case "SET_CHART":
      return { ...state, chart: action.payload };
    case "SET_MODAL_OPEN":
      return { ...state, modalOpen: action.payload };
    case "SET_MODAL_TITLE":
      return { ...state, modalTitle: action.payload };
    case "SET_MODAL_CONTENT":
      return { ...state, modalContent: action.payload };
    case "SET_MODAL_PAGE":
      return { ...state, modalPage: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
