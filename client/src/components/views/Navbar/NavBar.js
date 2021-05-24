import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import NavBarSearch from './NavBarSearch.js';

//api
import { SERVER } from 'Config.js';

function NavBar(props) {
    let user = useSelector(state => state.user);
    const [imageUrl, setimageUrl] = useState('');

    //기본 데이터 넣기
    const renderImageUrl = () => {
        const date = new Date();
        setimageUrl(`${SERVER}/image/profile/${user.login.user.id}` + '?' + date);
    };

    return (
        <div className="Nav">
            <Navbar
                fixed="top"
                collapseOnSelect
                expand="lg"
                variant="dark"
                className="NavContainer"
            >
                {/* 로고 */}
                <Navbar.Brand href="/" className="NavLogo">
                    코드런
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="sidebar">
                    <Nav className="NavMenu">
                        {/* 탭 */}
                        <Nav.Item className="NavItem">
                            <Nav.Link href="/class" className="NavLink">
                                클래스
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="NavItem">
                            <Nav.Link href="/community" className="NavLink">
                                커뮤니티
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="NavMenu-right">
                        {/* 검색창 */}
                        {window.location.href.split('/')[3] === 'class' ? (
                            <div></div>
                        ) : (
                            <Nav.Item className="NavItem-right">
                                <NavBarSearch />
                            </Nav.Item>
                        )}

                        {/* 동영상업로드 버튼 */}
                        <Nav.Item className="NavItem-right">
                            <Button variant="outline-info" href="/upload/video">
                                <FontAwesomeIcon icon={faPlus} className="NavVideoBtn" />
                            </Button>
                        </Nav.Item>
                        {/* 로그인/회원가입 버튼 */}
                        <Nav.Item className="NavItem-right">
                            {window.localStorage.getItem('token') !== null ? (
                                <a href={`/profile/${user.login.user.id}`}>
                                    <Avatar
                                        size={45}
                                        src={
                                            <img
                                                src={imageUrl}
                                                alt="없음"
                                                onError={renderImageUrl}
                                            />
                                        }
                                    />
                                </a>
                            ) : (
                                <a href="/account">
                                    <button className="Nav-AccountBtn">LogIn</button>
                                </a>
                            )}
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;
