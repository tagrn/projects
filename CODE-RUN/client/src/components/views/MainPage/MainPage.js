import React, { useState, useEffect } from 'react';
import './MainPage.css';
import BestClasses from './Sections/BestClasses.js';
import SelectCourse from './Sections/SelectCourse.js';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import BackImage from './images/back.png';
// api
import { fetchBestVideos } from '_api/Video';

function MainPage(props) {
    const [mainPageIndex, setMainPageIndex] = useState(0);
    const [message, setMessage] = useState('');
    const [BestVideos, setBestVideos] = useState([]);
    const messages = [
        '인생은 "한강 뷰"아니면 "한강 물"이다.',
        '빨리 공부하러 안 가고 뭐하냐?',
        '싸탈은 지능순',
        '풀기 전에 생각했나요?',
    ];

    useEffect(() => {
        fetchBestVideos()
            .then(res => setBestVideos(res.data.data))
            .catch(err => console.log(err));
    }, []);

    const changeMainPageIndex = function (idx) {
        if (idx < 0) {
            idx = 2;
        }
        idx = idx % 3;
        downPageMovement(idx);
        setMessage(messages[Date.now() % messages.length]);
        setTimeout(setMainPageIndex(idx), 3000);
    };

    const gotoClass = function () {
        props.history.push('/class');
    };

    const downPageMovement = function (idx) {
        const first = document.getElementsByClassName('transitionMainPage1');
        const second = document.getElementsByClassName('transitionMainPage3');
        const third = document.getElementsByClassName('transitionMainPage2');
        if (idx === 0) {
            first[0].classList.remove('transitionMainPage');
        } else {
            first[0].classList.add('transitionMainPage');
        }
        if (idx === 2) {
            second[0].classList.remove('transitionMainPage');
        } else {
            second[0].classList.add('transitionMainPage');
        }
        if (idx === 1) {
            third[0].classList.remove('transitionMainPage');
        } else {
            third[0].classList.add('transitionMainPage');
        }
    };

    return (
        <div
            className="mainPage"
            onWheel={event => {
                if (event.nativeEvent.wheelDelta > 0) {
                    changeMainPageIndex(mainPageIndex + 1);
                } else {
                    changeMainPageIndex(mainPageIndex - 1);
                }
            }}
        >
            <div className="mainPageBackground">
                <h1 className="mainPageBackgroundText">{message}</h1>
            </div>
            <div
                className="buttonChangeMainPageUpIndex"
                onClick={() => changeMainPageIndex(mainPageIndex + 1)}
            >
                <UpCircleOutlined />
            </div>
            <div
                className="buttonChangeMainPageDownIndex"
                onClick={() => changeMainPageIndex(mainPageIndex - 1)}
            >
                <DownCircleOutlined />
            </div>
            <div className="transitionMainPage1">
                <div className="mainBanner">
                    <img className="backImage" src={BackImage} />
                    <div className="animateCodeRun">
                        <span className="animateCodeRun1">C</span>
                        <span className="animateCodeRun2">O</span>
                        <span className="animateCodeRun3">D</span>
                        <span className="animateCodeRun4">E</span>
                        <span className="animateCodeRun5">:</span>
                        <span className="animateCodeRun6">R</span>
                        <span className="animateCodeRun7">U</span>
                        <span className="animateCodeRun8">N</span>
                    </div>
                    <div className="startBack">
                        <button className="getStartedBtn" onClick={() => gotoClass()}>
                            시작하기
                        </button>
                    </div>
                </div>
            </div>
            <div className="transitionMainPage3 transitionMainPage">
                <div className="specificMainPage">
                    <img className="backImage2" src={BackImage} />
                    <BestClasses
                        className="specificBestClasses"
                        {...props}
                        BestVideos={BestVideos}
                    />
                </div>
            </div>
            <div className="transitionMainPage2 transitionMainPage">
                <div className="specificMainPage">
                    <img className="backImage3" src={BackImage} />
                    <SelectCourse {...props} />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
