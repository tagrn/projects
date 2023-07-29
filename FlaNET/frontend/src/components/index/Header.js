import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setModalPage } from "../../actions/index";
import Modal0 from "../../components/blockcoding/modals/TutorialModal";
import Modal1 from "../../components/blockcoding/modals/TutorialModal1";
import Modal2 from "../../components/blockcoding/modals/TutorialModal2";
import Modal3 from "../../components/blockcoding/modals/TutorialModal3";
import Modal4 from "../../components/blockcoding/modals/TutorialModal4";
import store from "../../index.js";

const signOut = (event) => {
  sessionStorage.removeItem(
    `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
  );
};

function Header({ modalPage }) {
  const dispatch = useDispatch();

  // tutorial 모달 관련 함수
  const [tutorialOpen0, setTutorialOpen0] = useState(false);
  const [tutorialOpen1, setTutorialOpen1] = useState(false);
  const [tutorialOpen2, setTutorialOpen2] = useState(false);
  const [tutorialOpen3, setTutorialOpen3] = useState(false);
  const [tutorialOpen4, setTutorialOpen4] = useState(false);

  const tutorialOpen = () => {
    setTutorialOpen0(true);
  };

  const tutorialClose0 = () => {
    setTutorialOpen0(false);
  };
  const tutorialClose1 = () => {
    setTutorialOpen1(false);
  };
  const tutorialClose2 = () => {
    setTutorialOpen2(false);
  };
  const tutorialClose3 = () => {
    setTutorialOpen3(false);
  };
  const tutorialClose4 = () => {
    setTutorialOpen4(false);
  };

  setTimeout(function () {
    const pageNumber = store.getState().modalPage;

    const modalChangeTime = 250;

    if (pageNumber === 1) {
      setTimeout(() => setTutorialOpen0(true), modalChangeTime);
      dispatch(setModalPage(0));
    } else if (pageNumber === 2) {
      setTimeout(() => setTutorialOpen1(true), modalChangeTime);
      dispatch(setModalPage(0));
    } else if (pageNumber === 3) {
      setTimeout(() => setTutorialOpen2(true), modalChangeTime);
      dispatch(setModalPage(0));
    } else if (pageNumber === 4) {
      setTimeout(() => setTutorialOpen3(true), modalChangeTime);
      dispatch(setModalPage(0));
    } else if (pageNumber === 5) {
      setTimeout(() => setTutorialOpen4(true), modalChangeTime);
      dispatch(setModalPage(0));
    }
  }, 200);
  return (
    <header className="header">
      <div className="defaultBackgroundNavColor" />
      <a href="/" className="logo">
        <img
          src={`${process.env.PUBLIC_URL}/img/flanet_gray_logo.png`}
          className="logo"
          alt="logo"
        />
      </a>
      <nav className="nav">
        <Link className="nava1" onClick={tutorialOpen}>
          튜토리얼
        </Link>
        {(function () {
          if (window.location.pathname === "/profile")
            return (
              <Link className="nava2" to="/blockcoding">
                블록 코딩
              </Link>
            );
          else
            return (
              <Link className="nava2" to="/profile">
                마이페이지
              </Link>
            );
        })()}

        <Link className="nava3" to="/" onClick={signOut}>
          로그아웃
        </Link>
      </nav>
      <div className="defaultBackgroundNavHeight"></div>
      <Modal0 open={tutorialOpen0} close={tutorialClose0}></Modal0>
      <Modal1 open={tutorialOpen1} close={tutorialClose1}></Modal1>
      <Modal2 open={tutorialOpen2} close={tutorialClose2}></Modal2>
      <Modal3 open={tutorialOpen3} close={tutorialClose3}></Modal3>
      <Modal4 open={tutorialOpen4} close={tutorialClose4}></Modal4>
    </header>
  );
}
Header.propTypes = {
  modalPage: PropTypes.any,
};

export default Header;
