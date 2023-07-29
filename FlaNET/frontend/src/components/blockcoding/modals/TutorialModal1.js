import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalPage } from "../../../actions/index";

const TutorialModal1 = ({ open, close }) => {
  const dispatch = useDispatch();
  const nextModal = () => {
    dispatch(setModalPage(3));
    close();
  };
  const prevModal = () => {
    dispatch(setModalPage(1));
    close();
  };
  const closeModal = () => {
    dispatch(setModalPage(0));
    close();
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            FlaNET 홈페이지 튜토리얼
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <main>
            <br />
            <div className="main-title">
              <h1>
                1. 블록코딩을 위한 Workspace!
                <br />
              </h1>
            </div>
            <div className="main-title h3-none">
              FlaNET에서는 누구나 쉽게 블록으로 코딩할 수 있도록 Workspace를
              지원하고 있어요!
              <br />
              블록 코딩을 통해 나만의 모델을 만들며 학습을 해봅시다!
            </div>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_1_2.PNG`}
              className="tutorial-img-1-3"
              alt="home_block"
            />
            <br />
            <br />
            <br />

            <div className="main-title">
              <h1>
                2. 학습 결과를 확인할 수 있는 그래프!
                <br />
              </h1>
            </div>

            <div className="main-title h3-none">
              학습을 했으면 결과를 확인해야겠죠? <br />
              학습된 결과가 데이터, 그래프, 그리고 내가 짠 블록의 코드로
              제공됩니다!
            </div>
            <br />

            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_1_3.PNG`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            <br />
            <br />

            <div className="main-title">
              <h1>
                3. 다양한 FlaNET 서비스! <br />
              </h1>
            </div>
            <div className="main-title h3-none">
              {" "}
              수집 데이터부터 분석, 예측 데이터, 그리고 내가 만든 딥러닝
              모델까지!
              <br />
              마이페이지에서 진행한 내용을 확인하고 사용해보세요!
            </div>
            <br />

            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_1_4.PNG`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            <br />
            <div className="main-title">
              <h3> 다음 장부터 블록 코딩하는 방법을 배워봐요!</h3>{" "}
            </div>
          </main>
          <footer>
            <span className="foot-number">2 / 5</span>
            <button onClick={prevModal}> prev </button>&nbsp;
            <button onClick={nextModal}> next </button>&nbsp;
            <button className="close" onClick={closeModal}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

TutorialModal1.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default TutorialModal1;
