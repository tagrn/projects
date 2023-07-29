import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";

function SignIn() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = (event) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((result) => {
            history.push("*");
          })
          .catch((error) => {
            alert("잘못된 이메일과 비밀번호입니다.");
          });
      })
      .catch(() => {
        alert("파이어베이스와 연결이 지연되고 있습니다.");
      });
  };

  const gotoMain = (event) => {
    history.push("/");
  };

  const signInWithGoogle = (event) => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((response) => {
            history.push("*");
          })
          .catch((error) => {});
      })
      .catch(() => {
        alert("파이어베이스와 연결이 지연되고 있습니다.");
      });
  };

  return (
    <div className="signIn userContainer">
      <h1>로그인</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="이메일을 입력해주세요."
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
            placeholder="비밀번호를 입력해주세요."
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                signInWithEmail(event);
              }
            }}
          />
        </div>
      </form>
      <button
        className="signInButton"
        type="submit"
        onClick={(event) => {
          signInWithEmail(event);
        }}
      >
        로그인
      </button>
      <p className="signUpText">
        계정이 없나요?
        <Link to="/signup" className="toSignUpButton">
          회원가입
        </Link>
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/img/btn_google_signin_light_normal_web.png`}
        alt="googleSignInButton"
        className="googleSignInButton"
        onClick={(event) => {
          signInWithGoogle(event);
        }}
      />
      <div className="returnMainPage">
        <span onClick={gotoMain}>메인페이지 돌아가기</span>
      </div>
    </div>
  );
}

export default SignIn;
