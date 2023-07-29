import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './ClassPage.css';
import 'antd/dist/antd.css';
import Footer from 'components/views/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { fetchCSTag, fetchAlgorithmTag, fetchLanguageTag } from '_api/Tag.js';
// API
import {
    fetchFilteredVideoList,
    fetchLoginedFilteredVideoList,
    fetchSearchedVideoList,
    fetchLoginedSearchedVideoList,
    fetchAlgoFilteredVideoList,
    fetchLoginedAlgoFilteredVideoList,
    fetchCsFilteredVideoList,
    fetchLoginedCsFilteredVideoList,
    fetchAlgoLangFilteredVideoList,
    fetchLoginedAlgoLangFilteredVideoList,
} from '_api/Video.js';

import { Row, Col, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { Menu } from 'antd';
import { ApartmentOutlined, CalculatorOutlined } from '@ant-design/icons';

function ClassPage(props) {
    let user = useSelector(state => state.user);
    const user_id = user?.login?.user?.id;

    const [Cnts, setCnts] = useState(0);
    const [Algos, setAlgos] = useState([]);
    const [Css, setCss] = useState([]);
    const [languages, setlanguages] = useState([]);
    const [Algo, setAlgo] = useState(0);
    const [Cs, setCs] = useState(0);
    const [Language, setLanguage] = useState(0);
    const [Searched, setSearched] = useState('');
    const [Page, setPage] = useState(1);
    const [Classes, setClasses] = useState([]);

    useEffect(() => {
        fetchAlgorithmTag().then(res => {
            setAlgos(res.data.data);
        });
        fetchCSTag().then(res => {
            setCss(res.data.data);
        });
        fetchLanguageTag().then(res => {
            setlanguages(res.data.data);
        });
        if (props.location?.state?.playlist) {
            setClasses(props.location?.state?.playlist);
            setSearched(props.location?.state?.search);
            setCnts(props.location?.state?.cnt);
        } else {
            if (user_id) {
                fetchLoginedFilteredVideoList(user_id, Page).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            } else {
                fetchFilteredVideoList(Page).then(res => {
                    setCnts(res.data.page_cnt);
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            }
        }
    }, []);

    const onAlgoHandler = num => {
        setCs(0);
        setAlgo(num);
        const count = 1;
        setPage(count);
        const algorithm_tag_id = num;
        if (user_id) {
            fetchLoginedAlgoFilteredVideoList(algorithm_tag_id, user_id, count).then(res => {
                setCnts(res.data.page_cnt);
                setClasses(res.data.data);
            });
        } else {
            fetchAlgoFilteredVideoList(algorithm_tag_id, count).then(res => {
                setCnts(res.data.page_cnt);
                setClasses(res.data.data);
            });
        }
    };

    const onCsHandler = num => {
        setAlgo(0);
        setCs(num);
        setPage(count);
        const count = 1;
        const subject_tag_id = num;
        const user_id = user?.login?.user?.id;
        if (user_id) {
            fetchLoginedCsFilteredVideoList(subject_tag_id, user_id, count).then(res => {
                setCnts(res.data.page_cnt);
                setClasses(res.data.data);
            });
        } else {
            fetchCsFilteredVideoList(subject_tag_id, count).then(res => {
                setCnts(res.data.page_cnt);
                setClasses(res.data.data);
            });
        }
    };

    const onLanguageHandler = num => {
        setLanguage(num);
        const count = 1;
        setPage(count);
        const user_id = user?.login?.user?.id;
        if (user_id) {
            fetchLoginedAlgoLangFilteredVideoList(Algo, num, user_id, count).then(res => {
                setCnts(res.data.page_cnt);
                setClasses(res.data.data);
            });
        } else {
            fetchAlgoLangFilteredVideoList(Algo, num, count).then(res => {
                setCnts(res.data.page_cnt);
                setClasses(res.data.data);
            });
        }
    };

    const renderAlgo = Algos.map((algo, index) => {
        return (
            <Menu.Item className="classmenu" onClick={() => onAlgoHandler(algo.id)} key={index}>
                {algo.algorithm_name}
            </Menu.Item>
        );
    });
    const renderCs = Css.map((cs, index) => {
        return (
            <Menu.Item
                className="classmenu"
                onClick={() => onCsHandler(cs.id)}
                key={index + Algos?.length}
            >
                {cs.subject_name}
            </Menu.Item>
        );
    });
    const renderButton = languages.map((languagetag, index) => {
        if (Algo) {
            return (
                <Button
                    className="algoButton"
                    onClick={() => onLanguageHandler(languagetag.id)}
                    key={index}
                >
                    {languagetag.language_name}
                </Button>
            );
        } else {
            return <div></div>;
        }
    });
    const toWatchHandler = num => {
        props.history.push('/watch/' + num);
    };
    const renderCards = Classes.map((classs, index) => {
        return (
            <Col className="colcard" span={3}>
                <Col span={3}>
                    <Card
                        key={index}
                        onClick={() => toWatchHandler(classs.Video.id)}
                        className="shadow classCard"
                        style={{ width: 240, height: 320 }}
                    >
                        <Card.Img
                            className="classImg"
                            variant="top"
                            src={classs.Video.thumbnail}
                            style={{ height: 180 }}
                        />
                        <Card.Body>
                            <Card.Title className="classTitle">{classs.Video.title}</Card.Title>
                            {/* 유저네임 */}
                            <Card.Text>{classs.name}</Card.Text>
                            {classs.Video.likestatus ? (
                                <Card.Text>
                                    <FontAwesomeIcon style={{ color: '#1ee494' }} icon={fasHeart} />{' '}
                                    {classs.Video.likecnt}
                                </Card.Text>
                            ) : (
                                <Card.Text>
                                    <FontAwesomeIcon style={{ color: '#1ee494' }} icon={farHeart} />{' '}
                                    {classs.Video.likecnt}
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                    <br></br>
                </Col>
            </Col>
        );
    });
    const onNextHandler = num => {
        setPage(num);
        if (user_id) {
            if (Algo) {
                if (Language) {
                    fetchLoginedAlgoLangFilteredVideoList(Algo, Language, user_id, num).then(
                        res => {
                            setCnts(res.data.page_cnt);
                            setClasses(res.data.data);
                        },
                    );
                } else {
                    fetchLoginedAlgoFilteredVideoList(Algo, user_id, num).then(res => {
                        setCnts(res.data.page_cnt);
                        setClasses(res.data.data);
                    });
                }
            } else if (Cs) {
                fetchLoginedCsFilteredVideoList(Cs, user_id, num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            } else if (Searched) {
                fetchLoginedSearchedVideoList(user_id, Searched, num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            } else {
                fetchLoginedFilteredVideoList(user_id, num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            }
        } else {
            if (Algo) {
                if (Language) {
                    fetchAlgoLangFilteredVideoList(Algo, Language, num).then(res => {
                        setCnts(res.data.page_cnt);
                        setClasses(res.data.data);
                    });
                } else {
                    fetchAlgoFilteredVideoList(Algo, num).then(res => {
                        setCnts(res.data.page_cnt);
                        setClasses(res.data.data);
                    });
                }
            } else if (Cs) {
                fetchCsFilteredVideoList(Cs, num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            } else if (Searched) {
                fetchSearchedVideoList(Searched, num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            } else {
                fetchFilteredVideoList(num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            }
        }
        window.scrollTo(0, 0);
    };

    const onPreviousHandler = num => {
        setPage(num);
        if (user_id) {
            if (Algo) {
                if (Language) {
                    fetchLoginedAlgoLangFilteredVideoList(Algo, Language, user_id, num).then(
                        res => {
                            setCnts(res.data.page_cnt);
                            setClasses(res.data.data);
                        },
                    );
                } else {
                    fetchLoginedAlgoFilteredVideoList(Algo, user_id, num).then(res => {
                        setCnts(res.data.page_cnt);
                        setClasses(res.data.data);
                    });
                }
            } else if (Cs) {
                fetchLoginedCsFilteredVideoList(Cs, user_id, num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            } else {
                fetchLoginedFilteredVideoList(user_id, num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            }
        } else {
            if (Algo) {
                if (Language) {
                    fetchAlgoLangFilteredVideoList(Algo, Language, num).then(res => {
                        setCnts(res.data.page_cnt);
                        setClasses(res.data.data);
                    });
                } else {
                    fetchAlgoFilteredVideoList(Algo, num).then(res => {
                        setCnts(res.data.page_cnt);
                        setClasses(res.data.data);
                    });
                }
            } else if (Cs) {
                fetchCsFilteredVideoList(Cs, num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            } else {
                fetchFilteredVideoList(num).then(res => {
                    setCnts(res.data.page_cnt);
                    setClasses(res.data.data);
                });
            }
        }
        window.scrollTo(0, 0);
    };
    const onSearchHandler = event => {
        setAlgo(0);
        setCs(0);
        setLanguage(0);
        setSearched(event.currentTarget.value);
        setPage(1);
        if (user_id) {
            fetchLoginedSearchedVideoList(user_id, event.currentTarget.value, 1).then(res => {
                setClasses(res.data.data);
                setCnts(res.data.page_cnt);
            });
        } else {
            fetchSearchedVideoList(event.currentTarget.value, 1).then(res => {
                setClasses(res.data.data);
                setCnts(res.data.page_cnt);
            });
        }
    };
    const { SubMenu } = Menu;
    return (
        <div>
            <Row>
                <Col xs={2}>
                    <Menu
                        // onClick={this.handleClick}
                        style={{ color: '#94d3ac' }}
                        className="classBigMenu"
                        // defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1', 'sub2']}
                        mode="inline"
                    >
                        <SubMenu
                            key="sub1"
                            style={{ color: 'black' }}
                            icon={<CalculatorOutlined />}
                            title="Algorithm"
                        >
                            {renderAlgo}
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            style={{ color: 'black' }}
                            icon={<ApartmentOutlined />}
                            title="Computer Science"
                        >
                            {renderCs}
                        </SubMenu>
                    </Menu>
                </Col>
                <Col xs={10}>
                    <br></br>
                    <div style={{ marginLeft: '20px', width: '400px' }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                className="classInput"
                                placeholder="검색어를 입력하세요"
                                onChange={onSearchHandler}
                            />
                        </InputGroup>
                    </div>
                    {renderButton}
                    {/* <Space size={2}> */}
                    <Row className="cardBoard">{renderCards}</Row>
                    {/* </Space> */}
                    <br></br>
                    <div style={{ marginRight: '30px', float: 'right' }}>
                        {Page > 1 ? (
                            <Button
                                variant="outline-success"
                                onClick={() => onPreviousHandler(Page - 1)}
                            >
                                이전페이지
                            </Button>
                        ) : (
                            <Button
                                variant="outline-success"
                                disabled={true}
                                onClick={() => onPreviousHandler(Page - 1)}
                            >
                                이전페이지
                            </Button>
                        )}{' '}
                        {Classes.length === 12 && Cnts !== Page ? (
                            <Button
                                variant="outline-success"
                                onClick={() => onNextHandler(Page + 1)}
                            >
                                다음페이지
                            </Button>
                        ) : (
                            <Button
                                variant="outline-success"
                                disabled={true}
                                onClick={() => onNextHandler(Page + 1)}
                            >
                                다음페이지
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
            <Footer></Footer>
        </div>
    );
}

export default ClassPage;
