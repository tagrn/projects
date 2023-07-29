import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <img
        src={`${process.env.PUBLIC_URL}/img/flanet_gray_logo.png`}
        className="logo"
        alt="logo"
      />
      <div className="footerExplanation">
        <div className="footerBold">
          <span>플래닛 이용약관</span>
          <span>개인정보 처리방침</span>
          <span>책임의 한계와 법적 고지</span>
          <span>학습 서비스 이용약관</span>
          <span>플래닛 운영 정책</span>
        </div>
        <br />
        <div className="footerSmall">
          플래닛은 싸피 넷싸프로젝트에서 시작한 AI/ML 교육 플랫폼입니다. 모든
          저작물은 교육 목적에 한해 출처를 밝히고 자유롭게 이용할 수 있습니다.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
