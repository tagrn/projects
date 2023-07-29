import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalPage } from "../../../actions/index";

const TutorialModal2 = ({ open, close }) => {
  const dispatch = useDispatch();
  const nextModal = () => {
    dispatch(setModalPage(4));
    close();
  };
  const prevModal = () => {
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
            블록 코딩을 위한 Workspace 사용 방법 - 1
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <main className="content">
            <h1>블록 코딩을 위한 Workspace</h1>
            FlaNET에서는 머신러닝 학습을 위한 End-to-End Pipeline을 제공합니다.
            블록에 대한 카테고리에 대해 설명하고, 블록 코딩 사용 법과 FlaNET에서
            제공해주는 분석 모델, 그리고 간단한 블록 코딩을 통해 알아보도록
            하겠습니다.
            <br />
            <br />
            <h2>1. 데이터 수집 블록 코딩</h2>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_2_1.PNG`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            데이터 수집 카테고리에서는 실시간 데이터 수집과 기간별 데이터 수집,
            사용자가 직접 입력할 수 있는 블록과 데이터를 학습시키기위해 정리하는
            데이터 정제 블록으로 구성되어 있습니다. FlaNET에서는 기본적으로
            기온과 주식 데이터를 실시간으로 수집하고 있으며, 이렇게 수집된
            데이터를 기간별로 나눠서 분석할 수 있습니다.
            <br />
            <br />
            <h3>실시간 데이터 수집</h3>현재의 지역별 기온 데이터와 주식 데이터를
            확인할 수 있는 블록입니다. 실행 시, 크롤링으로 실시간 데이터 수집을
            진행합니다. 결과 값은 표를 통해서 확인할 수 있으며, 데이터를 얻기
            위해 사용된 python 크롤링 코드 또한 제공됩니다. <br />
            <br />
            <h3>기간별 데이터 수집</h3> 기간별 데이터 수집 블록은 FlaNET에서
            제공해주는 기온과 주식 데이터를 이용하여 확인하거나 머신 러닝을
            사용할 때 입력 값으로 사용할 수 있습니다. 실시간 데이터 수집과 달리,
            기간별 데이터가 나오기 때문에 차트를 통해서도 확인이 가능합니다.
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_2_2.gif`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            <h3>데이터 입력 블록</h3>주어진 데이터 뿐만 아니라, 사용자가
            분석하고 싶은 csv 데이터 파일을 첨부하여 데이터 입력으로도 사용이
            가능합니다.
            <br />
            <br />
            <h3>저장된 데이터 선택 블록</h3> FlaNet에서는 사용자가 실행 후,
            수집한 데이터를 저장할 수 있습니다. 마이페이지나 저장된 데이터 선택
            블록을 통해 이전에 사용했던 데이터를 확인하거나 바로 사용이
            가능합니다.
            <br />
            <br />
            <br />
            <h2>2. 데이터 정제 블록 코딩</h2>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_2_3.PNG`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            앞서 수집한 데이터를 조회하고, 관련 데이터를 나눠서 훈련하고
            테스트를 진행할 지 선택합니다. 여기서 훈련이란 모델을 학습하기 위한
            작업입니다. 훈련 후, 테스트 데이터와 비교하여 성능을 평가합니다.
            사용자가 직접 나눌수 있는 블록과, 수집 데이터를 정제해주는 블록으로
            나눠져 있습니다.
            <br />
            <br />
            <br />
            <h2>3. 통합 딥러닝 솔루션</h2>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_2_4.PNG`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
            <br />
            데이터 분석으로 Prophet, CNN, LSTM 모델을 지원합니다. 톱합 딥러닝
            솔루션에서는 대한 완성된 세 가지 모델을 사용할 수 있습니다. 학습과
            추론 과정을 한 번에 수행할 수 있는 블록이기 때문에 쉽게 사용해볼 수
            있습니다. 또한 사용자가 블록을 나눠서 분석할 수 있는 딥러닝 모델
            커스텀도 제공하고 있습니다. 이 부분은 다음 장에서 자세히 설명합니다.
            {/* 설명합니다.  */}
            <h3>PROPHET 분석 추론 블록</h3>Prophet은 facebook에서 만든
            머신러닝을 이용한 시계열 예측 라이브러리입니다. 데이터 예측 뿐만
            아니라 학습된 데이터 값에서 데이터의 주간, 년간, 트렌드 등 데이터의
            주기성에 대해 분석이 가능합니다. 입력 받는 민감도 값은 데이터 값
            변화에 얼마나 유연하게 반응할 지 정하는 변수입니다. 0 ~ 1 사이 값을
            넣는 것을 권장합니다. <br />
            <br />
            <h3>CNN 학습 평가 추론 모델 블록</h3>CNN 이라는 딥러닝 모델을
            학습부터 평가, 추론까지 해볼 수 있는 블록입니다. 영상처리 분야에서
            많이 사용되며, 데이터의 패턴을 찾기 때문에 시계열 추론에서도
            사용됩니다. 다른 딥러닝 모델에 비해 빠른 분석과 추론이 가능한 장점이
            있습니다.
            <br />
            <br />
            <h3>LSTM 학습 평가 추론 모델 블록</h3>대표적인 시계열 데이터 분석
            모델입니다. 문자열이나 시퀀스 데이터에서도 사용이 됩니다. 다른
            모델들에 비해 정확도는 높지만, 학습 과정에서 속도가 느린 단점을
            가지고 있습니다.
            <br />
            <br />
            <br />
            <h2>간단한 블록 코딩 예제</h2>
            데이터 수집과 Prophet 분석 블록을 이용해서 간단한 블록 코딩
            예제입니다. 표를 보면 데이터 수집 과정 후, 데이터 분석이 진행되는
            것을 확인할 수 있습니다. <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_2_5.gif`}
              className="tutorial-img-1-1"
              alt="home_block"
            />
          </main>
          <footer>
            <span className="foot-number">3 / 5</span>
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

TutorialModal2.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default TutorialModal2;
