import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalPage } from "../../../actions/index";

const TutorialModal = ({ open, close }) => {
  const dispatch = useDispatch();
  const nextModal = () => {
    dispatch(setModalPage(2));
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
            <div className="main-title">
              <h1>
                FlaNET에 오신 것을 환영합니다.
                <br />
              </h1>
              <span className="h3-none">
                FlaNET은 머신 러닝에 관심이 있는 모두를 위한 블록 코딩
                서비스입니다!
                <br />
                튜토리얼을 통해 머신러닝을 학습해보아요!{" "}
              </span>
            </div>
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/flanet_logo.png`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            <h1 className="main-title"> 빠른 블록코딩 예시 </h1>
            <div className="main-title h3-none"></div>
            <br />

            <div className="main-title">
              <h1>
                1. 데이터 수집
                <br />
              </h1>
            </div>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/tu_block_2.JPG`}
              className="modalBlockImgDataInput"
              alt="block coding"
            />
            <br />
            <br />
            <div className="main-title h3-none">
              위의 블록만으로 실행 시켜보겠습니다.
            </div>
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/exec_1.JPG`}
              className="modalBlockImgDataGraph"
              alt="block coding"
            />
            <br />
            <br />
            <div className="main-title h3-none">
              실행 시킨 결과를 그래프로 볼 수 있습니다.
            </div>
            <br />
            <br />
            <br />
            <div className="main-title">
              <h1>
                2. 데이터 정제
                <br />
                <br />
              </h1>
            </div>

            <div className="main-title h3-none">
              수집을 했으면 데이터 전처리를 해야 합니다. <br />
              데이터 정제는 두 가지 종류가 있습니다. <br />
            </div>
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/tu_block_5.JPG`}
              className="modalBlockImgDataInput"
              alt="block coding"
            />
            <br />
            <br />
            <div className="main-title h3-none">
              첫 번째는 데이터 크롤링의 데이터를 정제합니다. <br />
            </div>
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/exec_2.JPG`}
              className="modalBlockImgDataGraph"
              alt="block coding"
            />
            <br />
            <br />
            <br />
            <div className="main-title h3-none">
              정제 시킨 데이터의 코드를 실제로 실행시키면 크롤링된 결과를
              출력합니다.
            </div>
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/tu_block_8.JPG`}
              className="modalBlockImgDataInput"
              alt="block coding"
            />
            <br />
            <br />
            <div className="main-title h3-none">
              두 번째는 데이터를 딥러닝할 데이터로 정제합니다. <br />
              이제 이 데이터는 딥러닝 학습을 할 준비가 완료되었습니다.
            </div>
            <br />
            <br />
            <br />

            <div className="main-title">
              <h1>
                3. 통합 딥러닝 솔루션 <br />
              </h1>
            </div>
            <br />
            <br />
            <div className="main-title h3-none">
              정제된 데이터를 가지고 딥러닝을 쉽게 해보겠습니다. <br />
              먼저 만들어진 통합 딥러닝 솔루션부터 써볼까요?
            </div>
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/tu_block_14.JPG`}
              className="modalBlockImgDataInput"
              alt="block coding"
            />
            <br />
            <br />
            <br />
            <div className="main-title h3-none">
              해당 솔루션 블록 안에는 학습, 평가, 추론이 모두 들어있습니다.
            </div>
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/exec_3.JPG`}
              className="modalBlockImgDataGraph"
              alt="block coding"
            />
            <br />
            <br />
            <br />
            <div className="main-title h3-none">
              위의 그래프에서 모델 학습과 평가를 확인할 수 있고 <br />
              밑의 그래프에서 미래 값을 예측할 수 있습니다.
            </div>
            <br />
            <br />
            <br />
            <div className="main-title">
              <h1>
                4. 딥러닝 모델 학습 및 평가, 추론 <br />
              </h1>
            </div>
            <br />
            <br />
            <div className="main-title h3-none">
              앞서 해본 솔루션은 한 블록으로 모델 학습 및 평가, 추론이
              가능했습니다. <br />
              그럼 실제로 학습, 평가, 추론을 한 블록씩 연결해 보겠습니다.
            </div>
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/tu_block_20.JPG`}
              className="modalBlockImgDataInput"
              alt="block coding"
            />
            <br />
            <br />
            <br />
            <div className="main-title h3-none">
              위에서는 주식 데이터로 했으니, 이번엔 기온 데이터로 해보겠습니다.
            </div>
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tu_block/exec_4.JPG`}
              className="modalBlockImgDataGraph"
              alt="block coding"
            />
            <br />
            <br />
            <br />
            <div className="main-title h3-none">
              솔루션보다 자세한 그래프를 볼 수 있습니다. <br />
              기존의 값들과 트레이닝한 그래프 및 예측 값을 밑의 그래프에서 모두
              보입니다.
            </div>
            <br />
            <br />
            <br />
            <div className="main-title">
              <h3>
                <br />
                이제 다음 튜토리얼을 보면서 다른 딥러닝 방법과 머신러닝을
                경험하고
                <br />
                그리고 나만의 딥러닝 커스텀 모델을 만들어보세요!
              </h3>
            </div>
          </main>
          <footer>
            <span className="foot-number">1 / 5</span>
            <button className="disabled"> prev </button>&nbsp;
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

TutorialModal.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default TutorialModal;
