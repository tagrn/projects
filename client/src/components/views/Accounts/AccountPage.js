import React, { useState } from 'react';
import Footer from 'components/views/Footer/Footer';
import './AccountPage.css';
import { Modal, Button } from 'react-bootstrap';

import { loginUser, signupUser } from '_actions/user_actions';
import { redirectEmail, checkEmail, postTemporaryPassword } from '_api/User';
import { useDispatch } from 'react-redux';

function LoginPage(props) {
    const dispatch = useDispatch();
    const [HashPasswordConfirm, setHashPasswordConfirm] = useState('');
    const [Password, setPassword] = useState('');
    const [Loginpw, setLoginpw] = useState('');
    const [LoginEmail, setLoginEmail] = useState('');
    const [PasswordConfirm, setPasswordConfirm] = useState('');
    const [Email, setEmail] = useState('');
    const [Nickname, setNickname] = useState('');
    const [Visible, setVisible] = useState(false);
    const [Visible2, setVisible2] = useState(false);
    const [FindEmail, setFindEmail] = useState('');
    const [ModalText, setModalText] = useState('이메일 인증을 진행해주세요.');

    const accountclick = event => {
        const container = document.getElementById('container');
        if (event.type === 'click') {
            if (event.target.id === 'signUp') {
                container.classList.add('right-panel-active');
            } else {
                container.classList.remove('right-panel-active');
            }
        }
    };

    const NicknameHandler = event => {
        setNickname(event.currentTarget.value);
    };

    const passwordHandler = event => {
        let pw = event.currentTarget.value;
        setPassword(pw);
    };

    const OverlapEmail = event => {
        event.preventDefault();
        let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regExp.test(Email) === true) {
            checkEmail(Email)
                .then(res => alert('사용가능한 Email 입니다.'))
                .catch(err => alert('Email이 중복되요'));
        } else {
            alert('email 형식이 맞지 않아요.');
        }
    };

    const passwordConfirmHandler = event => {
        const pwconfirm = document.getElementById('passwordConfirm');
        let pw = event.currentTarget.value;
        setPasswordConfirm(pw);
        const sha = require('sha256');
        if (Password === pw) {
            setHashPasswordConfirm(sha(pw));
            pwconfirm.style.backgroundColor = '#eee';
        } else {
            pwconfirm.style.backgroundColor = '#ffdcdc';
        }
    };

    const postSignup = event => {
        event.preventDefault();
        const body = { email: Email, password: HashPasswordConfirm, name: Nickname };
        if (Email.length === 0 || HashPasswordConfirm.length === 0 || Nickname.length === 0) {
            alert('빠짐없이 입력해주세요.');
        } else {
            dispatch(signupUser(body))
                .then(res => {
                    if (res.payload.profile === undefined) {
                        setVisible(true);
                    } else {
                        alert('회원가입에 실패했습니다. ㅠㅠ');
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const postLogin = event => {
        event.preventDefault();
        const body = { email: LoginEmail, password: Loginpw };
        dispatch(loginUser(body))
            .then(res => {
                if (res.payload.user.active === false) {
                    setModalText('이메일 인증이 안된거 같아요 ㅠㅠ');
                    setVisible(true);
                } else {
                    window.localStorage.setItem('token', res.payload.token);
                    window.location.replace('/');
                }
            })
            .catch(err => alert('로그인 다시해줭 ㅠㅠ'));
    };

    const ValidEmail = event => {
        const email = document.getElementById('email');
        let asValue = event.currentTarget.value;
        let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regExp.test(asValue) === true) {
            email.style.backgroundColor = '#eee';
            setEmail(asValue);
        } else {
            email.style.backgroundColor = '#ffdcdc';
            setEmail(asValue);
        }
    };

    const loginPassword = event => {
        let pw = event.currentTarget.value;
        const sha = require('sha256');
        setLoginpw(sha(pw));
    };

    const loginEmail = event => {
        setLoginEmail(event.currentTarget.value);
    };

    const findEmail = event => {
        setFindEmail(event.currentTarget.value);
    };

    const handleOk = () => {
        setVisible(false);
        window.location.reload();
    };

    const handelFindEmail = () => {
        setVisible(false);
        const body = { email: FindEmail };
        postTemporaryPassword(body)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const handleCancel = () => {
        setVisible(false);
        setVisible2(false);
        window.location.reload();
    };

    const sendEmail = event => {
        if (Email === '') {
            redirectEmail(LoginEmail)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else {
            redirectEmail(Email)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    };

    const openPasswordModal = () => {
        setVisible2(true);
    };
    return (
        <div>
            <div className="account-body">
                <Modal show={Visible} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>이메일 인증</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{ModalText}</p>
                    </Modal.Body>
                    <p>인증메일을 받지 못하였나요?</p>
                    <button class="modal_button" onClick={sendEmail}>
                        인증메일 요청
                    </button>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleOk}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={Visible2} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>임시 비밀번호 발급</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>
                            이메일을 입력해주세요.
                        </p>
                    </Modal.Body>
                    <input
                        type="email"
                        style={{
                            backgroundColor: '#eee',
                            border: 'none',
                            padding: '12px 15px',
                            margin: '0rem 10% 1rem 10%',
                            width: '80%',
                        }}
                        placeholder="Email"
                        onChange={findEmail}
                    />

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handelFindEmail}>
                            보내기
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>

                            <div style={{ display: 'flex', width: '100%' }}>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={ValidEmail}
                                />
                                <button id="check-btn" onClick={OverlapEmail}>
                                    중복확인
                                </button>
                            </div>
                            <input type="text" placeholder="Nickname" onChange={NicknameHandler} />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={passwordHandler}
                            />
                            <input
                                id="passwordConfirm"
                                type="password"
                                placeholder="PasswordConfirm"
                                onChange={passwordConfirmHandler}
                            />

                            <button onClick={postSignup}>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>

                            <input type="email" placeholder="Email" onChange={loginEmail} />
                            <input
                                id="login_pw"
                                type="password"
                                placeholder="Password"
                                onChange={loginPassword}
                            />
                            <p className="findPW-text" onClick={openPasswordModal}>
                                비밀번호 찾고 싶어?
                            </p>
                            <button onClick={postLogin}>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>코드:RUN 입장</h1>
                                <p>어서 로그인 해줭!</p>
                                <button className="ghost" id="signIn" onClick={accountclick}>
                                    Sign In
                                </button>
                            </div>

                            <div className="overlay-panel overlay-right">
                                <h1>
                                    코드:RUN은<br></br>
                                    처음이지?
                                </h1>
                                <p>너의 상세한 정보가 궁금해</p>

                                <button className="ghost" id="signUp" onClick={accountclick}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default LoginPage;
