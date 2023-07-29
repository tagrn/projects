import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalPage } from "../../../actions/index";

const TutorialModal4 = ({ open, close }) => {
  const dispatch = useDispatch();
  const prevModal = () => {
    dispatch(setModalPage(4));
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
            블록 코딩 활용
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <main className="content">
            <h1>더 많은 예시</h1>
            앞서 배운 블록을 가지고 이제 다양한 블록 코딩 예시를 해보겠습니다.
            FlaNET에서는 수집 - 데이터 전처리 - 학습 - 평가 및 추론이라는 딥러닝
            파이프라인이 가능하기 때문에 이와 같은 형태로 학습하는 것을
            권장합니다. 처음에는 통합 딥러닝 솔루션으로 학습한 후, 딥러닝 모델
            커스텀에서 파이프라인을 세분화하여 해봅니다. 통합 딥러닝 솔루션은
            3장에서 예제로 제공되므로, 파이프라인에 맞게 블록 코딩을
            해보겠습니다.
            <br />
            <br />
            <h2>단계별 딥러닝 블록 코딩 </h2>
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_4_1.gif`}
              className="tutorial-img-1-3"
              alt="이미지"
            />
            <br />
            수집 - 전처리 - 학습 - 평가 및 추론라는 순서대로 블록 구현한 것을
            확인할 수 있습니다. 저장된 데이터를 이용하여 데이터 수집을 하고,
            원하는 값만큼 train, test 값을 설정합니다. 다음으로 이미 모델링이
            되어있는 CNN 모델을 가지고 평가와 추론을 진행했습니다.
            <br />
            <br />
            <h2>학습 모델 커스튬</h2>
            파이프라인에 맞게 구현된 블록 코딩은 인공지능과 가장 유사합니다.
            그러나 인공지능 성능에서 가장 중요한 것은 모델입니다. 모델링을
            어떻게 했나에 따라 성능과 속도는 천지차이인데요. 이번에는 이미
            만들어진 CNN 학습이 아니라 딥러닝 모델 커스텀 블록을 사용해서 저
            사이에 저만의 딥러닝 모델을 넣어보겠습니다. <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_4_2.gif`}
              className="tutorial-img-1-3"
              alt="이미지"
            />
            <br />
            <br />
            블록의 구성은 아까와 같습니다. 다만 CNN 모델 블록을 단계별 딥러닝
            학습을 세분화하여 딥러닝 모델커스튬 카테고리에서 딥러닝 관련 모델
            레이어를 가지고 자신만의 모델을 블록 코딩으로 만들 수 있습니다.
            CNN의 규칙에 맞게 저만의 모델링으로 만들었으며, 밑 결과 화면을
            통해정상적으로 작동하는 것을 확인할 수 있습니다. 또한, 실행을 하면
            수집 그래프, 데이터부터 추론까지 계속 변하면서 단계별 파이프라인
            수행하는 것을 확인할 수 있습니다.
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_4_3.PNG`}
              className="tutorial-img-1-1"
              alt="이미지"
            />
            <br />
            <br />
            위 예시는 파이프라인을 따라가며 작성했지만, 어느정도 유연하게 블록
            배치도 가능합니다. 이미 학습된 블록을 가져다 사용할 수도 있고,평가
            블록을 제거하거나 추론 블록, 아니면 평가 추론 블록을 제외하고도
            실행이 가능합니다.
            <br />
            <br />
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/img/tutorial_4_4.PNG`}
              className="tutorial-img-1-3"
              alt="home_block"
            />
            <br />
            <br />
            <h2>더 좋은 모델과 학습을 위한 제약 조건 및 권장 사항!</h2>
            블록 코딩을 할 때 몇 가지 권장하는 것이 있습니다. 이 가이드라인을
            따라 좋은 모델을 만들어봅시다.
            <br />
            <br />
            <h3 className="rm-margin">1. 짧은 기간의 데이터</h3>
            &nbsp;&nbsp;짧은 기간의 데이터가 학습으로 주어질 경우 정확도가
            낮아지며, 너무 짧을 경우는 레이어에서 실행조차 안될 수도 있습니다.
            30일 이상의 데이터를 권고하며, 최소 15일 이상의 데이터는
            있어야합니다.
            <br />
            <br />
            <h3 className="rm-margin">2. 긴 기간의 데이터나 예측기간</h3>
            &nbsp;&nbsp; 데이터가 너무 많거나 예측 기간이 길다면, 학습을 할 때
            시간이 오래걸립니다
            <br />
            <br />
            <h3 className="rm-margin">3. 많은 레이어 수</h3>
            &nbsp;&nbsp; 레이어 수 또한 많으면 레이어들의 동작 시간이 오래걸리고
            과적합 문제가 일어날 수도 있습니다.
            <br />
            <br />
            <h3 className="rm-margin">4. 많은 filters, units</h3>
            &nbsp;&nbsp; 높은 파라미터 값을 설정했을 때 시간이 오래걸리고,
            과적합의 문제도 일어날 수 있습니다.
            <br />
            <br />
            <h3 className="rm-margin">5. 높은 Dropout의 rate</h3>
            &nbsp;&nbsp; Dropout은 학습이 진행되는 노드를 끊는 것입니다. 과적합
            방지를 위해 사용되고 있지만, 비율이 높을 경우 의미있는 데이터까지
            버려질 수 있기 때문에 정확도가 떨어집니다.
            <br />
            <br />
            <h3 className="rm-margin">6. CNN 제약조건</h3>
            &nbsp;&nbsp; CNN으로 모델링을 할 경우 제약조건을 맞춰줘야합니다!
            다음 제약 조건을 따르지 않을 경우 정상 실행이 되지 않습니다!
            <br />
            - Convolution 레이어의 아웃풋 텐서 수 : input Size - Kernel Size + 1
            <br />
            - Param의 수 : Input Size * Kernerl Size * filters + filters
            <br />
            <br />
            <br />
            <div className="main-title">
              <h3>
                튜토리얼은 모두 끝났습니다.
                <br />
                <br />
                이제 그럼 최고의 성능을 가지는 모델을 만들러 가볼까요?!
              </h3>
            </div>
          </main>
          <footer>
            <span className="foot-number">5 / 5</span>
            &nbsp;
            <button onClick={prevModal}> prev </button>&nbsp;
            <button className="disabled"> next </button>&nbsp;
            <button className="close" onClick={closeModal}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

TutorialModal4.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default TutorialModal4;
