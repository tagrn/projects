import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

function SignUp() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [readAgreement, setReadAgreement] = useState(false);

  const signUpWithEmail = (event) => {
    if (!agreement) {
      alert("약관에 동의해주세요.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        history.push("/signin");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("이메일 형식을 맞춰주세요.");
        } else if (error.code === "auth/weak-password") {
          alert("비밀번호는 6자 이상, 영문과 숫자 조합으로 사용해 주세요.");
        } else if (error.code === "auth/email-already-in-use") {
          alert("이미 가입된 이메일입니다.");
        }
      });
  };

  const gotoLogin = (event) => {
    history.push("/signin");
  };

  return (
    <div className="signUp userContainer">
      <h1>회원가입</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="ex. flanet@naver.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                signUpWithEmail(e);
              }
            }}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
      </form>
      <div className="signUpTerm">
        <input
          id="term"
          type="checkbox"
          onClick={() => setAgreement(!agreement)}
        />
        <label htmlFor="term">약관 동의</label>
      </div>
      <div className="readSignUpTerm" onClick={() => setReadAgreement(true)}>
        이용약관 보기
      </div>
      {(() => {
        if (readAgreement)
          return (
            <div className="modalComponentForSignup">
              <div className="modalComponentBackground"></div>
              <div className="modalComponentText">
                <h3>1조 (목적)</h3>
                <div>
                  본 약관은 삼성 청년 SW 아카데미의 넷싸 프로젝트 FlaNET을
                  통하여 인터넷상에서 제공하는 서비스(이하 서비스)를 이용하는
                  고객 (이하 고객)간의 권리와 의무 및 책임 등 기타 제반사항을
                  규정함을 목적으로 합니다.
                </div>
                <h3>2조 (용어의 정의)</h3>
                <div> 이 약관에서 사용하는 용어의 정의는 다음과 같습니다. </div>
                <ol>
                  <li>
                    &apos;회원&apos;이라 함은 이 약관에 동의하고 회원가입을
                    통하여 이용자ID(고유번호)와 비밀번호를 발급받은 자로서,
                    사이트가 제공하는 서비스를 이용할 수 있는 이용자를 말합니다.
                  </li>
                  <li>
                    &apos;이용자ID&apos;라 함은 회원의 식별 및 서비스 이용을
                    위하여 회원의 신청에 따라 사이트가 회원 별로 부여하는 고유한
                    문자와 숫자의 조합을 말합니다.
                  </li>
                  <li>
                    &apos;비밀번호&apos;라 함은 이용자ID로 식별되는 회원의 본인
                    여부를 검증하기 위하여 회원이 설정하여 사이트에 등록한
                    고유의 문자와 숫자의 조합을 말합니다.
                  </li>
                  <li>
                    &apos;로그인&apos;이라 함은 이용자ID와 비밀번호를 통하여
                    서비스 신청 및 사용 중 서비스의 세부정보를 확인할 수 있는
                    행위를 말합니다.
                  </li>
                  <li>
                    약관에서 사용하는 용어 중 제1항에서 정하지 아니한 것은 관계
                    법령 및 서비스 별 안내에서 정하는 바에 따르며, 그 외에는
                    일반 관례에 따릅니다.
                  </li>
                </ol>
                <h3>3조 (이용약관의 효력 및 개정)</h3>
                <ol>
                  <li>
                    이 약관은 사이트를 통해 온라인으로 공시하고 회원의 동의로
                    효력을 발생합니다. 본 약관의 공시는 사이트에 게시하는
                    방법으로 합니다.
                  </li>
                  <li>
                    사이트는 합리적인 사유가 발생할 경우 관련 법령에 위배되지
                    않는 범위 내에서 약관을 개정할 수 있습니다. 개정된 약관은
                    사이트를 통해 공지하거나 기타의 방법으로 회원에게
                    공지함으로써 그 효력이 발생하며, 이용자의 권리 또는 의무에
                    관한 변경은 최소한 7일 전에 공지합니다
                  </li>
                  <li>
                    변경된 약관에 대한 정보를 알지 못해 발생하는 회원의 피해는
                    저희 프로젝트에서 책임지지 않습니다.
                  </li>
                </ol>
                <h3>4조 (약관외 준칙)</h3>
                <div>
                  프로젝트는 필요한 경우 기타 서비스 또는 개별약관을 정할 수
                  있으며, 본 약관과 서비스 별 약관의 내용이 상충되는 경우에는
                  서비스 별 약관의 내용을 우선하여 적용합니다.
                </div>
                <h3>5조 (회원 가입)</h3>
                <ol>
                  <li>
                    이 약관의 동의는 회원가입 당시 절차 상의 이용약관 및
                    개인정보처리방침에 동의한다는 의사표시와 함께 사이트가
                    요청하는 정보를 제공하여 회원가입 신청을 완료함으로써
                    이루어집니다.
                  </li>
                  <li>
                    회원으로 가입하여 서비스를 이용하고자 하는 이용자는
                    사이트에서 요청하는 제반 정보(개인정보처리방침 제 1항
                    ‘수집하는 개인정보의 항목’)를 제공하여야 합니다.
                  </li>
                  <li>
                    회원은 반드시 회원 본인의 정보를 제공하여야만 서비스를
                    이용할 수 있으며, 타인의 정보를 도용하거나 허위의 정보를
                    등록하는 등 본인의 정확한 정보를 등록하지 않은 회원은 서비스
                    이용과 관련하여 아무런 권리를 주장할 수 없으며, 관계 법령에
                    따라 처벌 받을 수 있습니다. 또한 제 3자에게 야기한 손해를
                    배상할 책임이 있으며, 사이트는 허위의 정보를 기재한 회원의
                    서비스 이용 자격을 제한할 수 있습니다.
                  </li>
                </ol>
                <h3>6조 (개인정보의 보호 및 사용)</h3>
                <div>
                  사이트는 관계 법령이 정하는 바에 따라 회원의 개인정보를
                  보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 관해서는
                  관계 법령 및 사이트의 개인정보처리방침에 정한 바에 의합니다.
                  단, 회원은 이용자ID 및 비밀번호 등이 타인에게 노출되지 않도록
                  철저히 관리해야 하며 회사는 회원의 귀책사유로 인해 노출된
                  정보에 대해서 책임을 지지 않습니다.
                </div>
              </div>
              <div
                className="exitModalComponent"
                onClick={() => setReadAgreement(false)}
              >
                이용약관 닫기
              </div>
            </div>
          );
        else return <span></span>;
      })()}
      <button
        className="signUpButton"
        type="submit"
        onClick={(event) => {
          signUpWithEmail(event);
        }}
      >
        회원가입
      </button>
      <div className="returnLoginPage">
        <span onClick={gotoLogin}>로그인페이지 돌아가기</span>
      </div>
    </div>
  );
}

export default SignUp;
