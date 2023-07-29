import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalPage } from "../../../actions/index";

const TutorialModal3 = ({ open, close }) => {
  const dispatch = useDispatch();
  const nextModal = () => {
    dispatch(setModalPage(5));
    close();
  };
  const prevModal = () => {
    dispatch(setModalPage(3));
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
            블록 코딩을 위한 Workspace 사용 방법 - 2
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <main className="content">
            <h2>4. 딥러닝 모델 학습</h2>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_3_1.PNG`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            통합 딥러닝 솔루션 같은 경우, 학습, 추론까지 고려해서 제공되는
            블록입니다. 그러나 딥러닝 모델 학습은 단순히 모델만 지원해 주고
            있습니다. 모델만 지원하기 때문에 추론이나 정확도 등 사용자가 직접
            다른 블록으로 이어 붙여야 완성된 형태가 됩니다. 데이터 분석을 더
            세분화하여 실제 딥러닝 실행 파이프라인과 같은 환경으로 블록 코딩을
            할 수 있습니다! 여기서는 LSTM와 CNN 모델 학습을 기본 블록으로
            제공하며, 이전에 학습한 모델이 있다면 불러와서 사용도 가능합니다.
            <br />
            <br />
            <br />
            <h2>5. 딥러닝 모델 커스텀</h2>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_3_2.PNG`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            각 모델들을 구성하는 레이어입니다. Convolution, Max-Pooling,
            Average-Pooling, Dropout, LSTM 모델 레이어가 지원되며 이 레이어를
            통해 자신만의 모델을 생성할 수 있습니다. 딥러닝 모델 학습 카테고리를
            더 세분화하며, 사용자가 직접 모델을 설계하고 학습을 할 수 있습니다.
            <br /> <br />
            다음 그림은 딥러닝 모델 커스텀을 통해 레이어로 모델을 직접 만드는
            예시입니다.기온 데이터를 학습데이터로 사용하고, 각 레이어들을
            이용하여 나만의 딥러닝 모델을 만들 수 있습니다. 더 자세한 건 다음
            장에서 설명하겠습니다.
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_3_3.gif`}
              className="tutorial-img-1-3"
              alt="home_block"
            />
            <br />
            <br />
            <br />
            <h2>6. 모델 평가 및 데이터 추론</h2>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_3_4.PNG`}
              className="tutorial-img-1-3"
              alt="home_block"
            />
            <br />
            모델을 학습했으면, 이제 해당 모델을 평가해야합니다. 정확도가 얼마나
            되는지, 손실율이 어느정도인지 확인을 할 수 있는 학습 모델 평가
            블록과 이제 학습된 모델로 원하는 날만큼 추론을 할 수 있게 도와주는
            데이터 추론 블록을 지원합니다.
            <br />
            <br />
          </main>
          <footer>
            <span className="foot-number">4 / 5</span>
            &nbsp;
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

TutorialModal3.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default TutorialModal3;
