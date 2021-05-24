import React, { useEffect, useState } from 'react';

import './Footer.css';

function Footer() {
    const renderFooter = () => {
        return (
            <div fixed="bottom" style={{ zIndex: '2' }} className="Footer">
                <p className="Service">코드런</p>
                <div className="AboutUs">
                    <div className="TeamIntroduce">
                        <p className="Team">(주)삼성말고오성</p>
                        <p className="TeamMember">Team Leader | 구태완 (넥슨으로 싸탈)</p>
                        <p className="TeamMember">Team Member | 권세진</p>
                        <p className="TeamMember">Team Member | 정예림</p>
                        <p className="TeamMember">Team Member | 이경연 (지그재그로 싸탈)</p>
                        <p className="TeamMember">Team Member | 박노정</p>
                    </div>

                    <div className="Contact">
                        <p className="ContactUs">전화 | 010-4071-3729 (평일 09:00~18:00)</p>
                        <p className="ContactUs">주소 | 경상북도 구미시 3공단3로 302</p>
                    </div>
                </div>

                <p className="Copyrights">
                    <a href="https://www.ssafy.com/">
                        Copyright ⓒ 2021 삼성말고오성 in SSAFY. All rights reserved.
                    </a>
                </p>
            </div>
        );
    };

    return <div>{renderFooter()}</div>;
}

export default Footer;
