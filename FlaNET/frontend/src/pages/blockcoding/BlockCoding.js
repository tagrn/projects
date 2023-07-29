import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import Blockly from "blockly";
import BlocklyJS from "blockly/javascript";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import DeleteSweepOutlinedIcon from "@material-ui/icons/DeleteSweepOutlined";
import BlocklyWorkspace from "../../components/blockcoding/BlocklyWorkspace";
import { Block, Category } from "../../components/blockcoding/BlocklyElement";
import "../../components/blockcoding/blocks/AnalysisCNN";
import "../../components/blockcoding/blocks/AnalysisLSTM";
import "../../components/blockcoding/blocks/AnalysisProphet";
import "../../components/blockcoding/blocks/DataCrawlingPeriod";
import "../../components/blockcoding/blocks/DataCrawlingRealTime";
import "../../components/blockcoding/blocks/DataFileInput";
import "../../components/blockcoding/blocks/DataPreparation";
import "../../components/blockcoding/blocks/DataPreprocessing";
import "../../components/blockcoding/blocks/DataSelect";
import "../../components/blockcoding/blocks/ModelCNNTraining";
import "../../components/blockcoding/blocks/ModelCustomTraining";
import "../../components/blockcoding/blocks/ModelLSTMTraining";
import "../../components/blockcoding/blocks/ModelEvaluate";
import "../../components/blockcoding/blocks/ModelPredict";
import "../../components/blockcoding/blocks/ModelSelect";
import "../../components/blockcoding/blocks/LayerConvolution";
import "../../components/blockcoding/blocks/LayerMaxPooling";
import "../../components/blockcoding/blocks/LayerAveragePooling";
import "../../components/blockcoding/blocks/LayerDropout";
import "../../components/blockcoding/blocks/LayerLSTM";
import DisplayTable from "../../components/blockcoding/DisplayTable";
import DisplayChart from "../../components/blockcoding/DisplayChart";
import DisplayCode from "../../components/blockcoding/DisplayCode";
import store from "../../index.js";
import ModalNotification from "../../components/blockcoding/modals/WarningMdal";
import {
  getDataList,
  getUserDataSet,
  getUserModelSet,
  setDisplayCode,
  setDisplayData,
  setUserDataSetId,
  setModalOpen,
  setModalTitle,
  setModalContent,
} from "../../actions/index";

function BlockCoding({ spinner, modalOpen, modalTitle, modalContent }) {
  const [simpleWorkspace] = useState(React.createRef());
  const dispatch = useDispatch();

  // 경고 모달 관련 함수
  const closeModal = () => {
    dispatch(setModalOpen(false));
  };
  const openSuccessModal = () => {
    dispatch(setModalTitle("success!"));
    dispatch(setModalContent("데이터를 성공적으로 다운받았습니다."));
    dispatch(setModalOpen(true));
  };
  const openErrorModal = () => {
    dispatch(setModalTitle("error!"));
    dispatch(setModalContent("데이터를 다운받을 수 없습니다."));
    dispatch(setModalOpen(true));
  };

  const user = JSON.parse(
    sessionStorage.getItem(
      `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
    )
  );

  dispatch(getDataList());
  dispatch(getUserDataSet(user.uid));
  dispatch(getUserModelSet(user.uid));
  dispatch(setDisplayData([]));

  useEffect(() => {
    dispatch(setDisplayCode(""));
  }, []);

  // 실행 버튼
  function execute() {
    BlocklyJS.workspaceToCode(simpleWorkspace.current.workspace);
  }

  // 저장 버튼
  function workspaceStore() {
    const dataId = store.getState().userDataSetId[1];
    const workspaceXml = Blockly.Xml.workspaceToDom(
      simpleWorkspace.current.workspace
    );
    const workspaceXmlText = Blockly.Xml.domToPrettyText(workspaceXml);

    const url = "{base_url}/api/data/userdataset/xml/update";

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_data_set_id: dataId,
        user_data_set_xml: workspaceXmlText,
      }),
    })
      .then((res) => {
        dispatch(getUserDataSet(user.uid));
        dispatch(getUserModelSet(user.uid));
        dispatch(setModalTitle("success!"));
        dispatch(setModalContent("저장되었습니다."));
        dispatch(setModalOpen(true));
      })
      .catch(() => {
        dispatch(setModalTitle("error!"));
        dispatch(setModalContent("저장을 할 수 없습니다."));
        dispatch(setModalOpen(true));
      });
  }

  // 데이터 다운 버튼
  const dataDownload = () => {
    // 사용자가 지금 작업 중인 data랑 매칭 해줄 dataId
    const dataId = store.getState().userDataSetId[1];
    let url = "";

    // 이거 기점으로 다운로드 링크 설정해줄게요 !
    try {
      if (
        store.getState().userDataSetId[0].slice(-8) === "crawling" ||
        store.getState().userDataSetId[0] === "fileInput"
      ) {
        url = `{base_url}/api/easy/userdataset/file/${dataId}`;
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 200) {
              location.href = url;
              openSuccessModal();
            } else {
              openErrorModal();
            }
          })
          .catch(() => {
            openErrorModal();
          });
      } else if (
        store.getState().userDataSetId[0] === "prophet" ||
        store.getState().userDataSetId[0] === "predict"
      ) {
        url = `{base_url}/csv/download/userdatapredict/${dataId}`;
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 200) {
              location.href = url;
              openSuccessModal();
            } else {
              openErrorModal();
            }
          })
          .catch(() => {
            openErrorModal();
          });
      } else {
        openErrorModal();
      }
    } catch (err) {
      openErrorModal();
    }
  };

  // 블록 작업실 초기화 버튼
  const reset = () => {
    dispatch(setUserDataSetId(["initialize", -1]));
    dispatch(setDisplayData([]));
    dispatch(setDisplayCode(""));
    simpleWorkspace.current.workspace.clear();
    dispatch(setModalTitle("success!"));
    dispatch(setModalContent("초기화되었습니다."));
    dispatch(setModalOpen(true));
  };

  return (
    <div className="container blockCoding">
      <div className="buttonArea">
        <button className="button executeButton" onClick={execute}>
          <PlayCircleFilledWhiteOutlinedIcon /> &nbsp; 실행
        </button>
        <button className="button storeButton" onClick={workspaceStore}>
          <SaveOutlinedIcon /> &nbsp; 저장
        </button>
        <button className="button downloadButton" onClick={dataDownload}>
          <GetAppOutlinedIcon /> &nbsp; 데이터 다운
        </button>
        <button className="button resetButton" onClick={reset}>
          <DeleteSweepOutlinedIcon /> &nbsp; 작업실 초기화
        </button>
      </div>

      {spinner.spinner ? (
        <div className="loading">
          <p className="blinking"> 블 록 &nbsp; 작 업 중 &nbsp;&nbsp; </p>
          <div className="sk-fading-circle">
            <div className="sk-circle1 sk-circle"></div>
            <div className="sk-circle2 sk-circle"></div>
            <div className="sk-circle3 sk-circle"></div>
            <div className="sk-circle4 sk-circle"></div>
            <div className="sk-circle5 sk-circle"></div>
            <div className="sk-circle6 sk-circle"></div>
            <div className="sk-circle7 sk-circle"></div>
            <div className="sk-circle8 sk-circle"></div>
            <div className="sk-circle9 sk-circle"></div>
            <div className="sk-circle10 sk-circle"></div>
            <div className="sk-circle11 sk-circle"></div>
            <div className="sk-circle12 sk-circle"></div>
          </div>
        </div>
      ) : (
        <div className="welcome">
          <p> Welcome FlaNET World! </p>
        </div>
      )}

      <BlocklyWorkspace
        ref={simpleWorkspace}
        readOnly={false}
        trashcan={true}
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
        initialXml={`
          <xml xmlns="http://www.w3.org/1999/xhtml">
          </xml>
        `}
      >
        <React.Fragment>
          <Category name="데이터 수집">
            <Block type="DataCrawlingRealTime" />
            <Block type="DataCrawlingPeriod" />
            <Block type="DataFileInput" />
            <Block type="DataSelect" />
          </Category>
          <Category name="데이터 정제">
            <Block type="DataPreprocessing" />
            <Block type="DataPreparation" />
          </Category>
          <Category name="통합 딥러닝 솔루션">
            <Block type="AnalysisCNN" />
            <Block type="AnalysisLSTM" />
            <Block type="AnalysisProphet" />
          </Category>
          <Category name="딥러닝 모델 학습">
            <Block type="ModelCNNTraining" />
            <Block type="ModelLSTMTraining" />
            <Block type="ModelSelect" />
          </Category>
          <Category name="딥러닝 모델 커스텀">
            <Block type="ModelCustomTraining" />
            <Block type="Conv1D" />
            <Block type="MaxPooling1D" />
            <Block type="AveragePooling1D" />
            <Block type="Dropout" />
            <Block type="LSTM" />
          </Category>
          <Category name="모델 평가 및 데이터 추론">
            <Block type="ModelEvaluate" />
            <Block type="ModelPredict" />
          </Category>
        </React.Fragment>
      </BlocklyWorkspace>
      <div className="visualizationArea">
        <DisplayTable />
        <DisplayChart />
        <DisplayCode />
      </div>
      <React.Fragment>
        <ModalNotification
          open={modalOpen}
          close={closeModal}
          title={modalTitle}
          content={modalContent}
        ></ModalNotification>
      </React.Fragment>
    </div>
  );
}

BlockCoding.propTypes = {
  spinner: PropTypes.bool,
  modalOpen: PropTypes.bool,
  modalTitle: PropTypes.string,
  modalContent: PropTypes.string,
};

export default connect((state) => ({
  spinner: state.spinner,
  modalOpen: state.modalOpen,
  modalTitle: state.modalTitle,
  modalContent: state.modalContent,
}))(BlockCoding);
