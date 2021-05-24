import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { listArticle, initialListArticle } from '_api/Board.js';

import { ListGroup, Row, Col, InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import './CommunityList.css';

function CommunityList(props) {
    const history = useHistory();
    const date = new Date();
    let user = useSelector(state => state.user);

    const [ListData, setListData] = useState([]);

    const [SearchData, setSearchData] = useState('');
    const [Cnts, setCnts] = useState(0);
    const [PageCount, setPageCount] = useState(1);

    useEffect(() => {
        initialListArticle(PageCount)
            .then(res => {
                setCnts(res.data.page_cnt);
                setListData(res.data.data);
            })
            .catch(err => {
                history.push('/account');
            });
    }, []);

    const onSearchDataHandler = event => {
        setSearchData(event.currentTarget.value);
        listArticle(PageCount, event.currentTarget.value).then(res => {
            setCnts(res.data.page_cnt);
            setListData(res.data.data);
        });
    };

    const onNextHandler = num => {
        setPageCount(num);
        if (SearchData) {
            listArticle(num, SearchData).then(res => {
                setCnts(res.data.page_cnt);
                setListData(res.data.data);
            });
        } else {
            initialListArticle(num).then(res => {
                setCnts(res.data.page_cnt);
                setListData(res.data.data);
            });
        }
        window.scrollTo(0, 0);
    };
    const onPreviousHandler = num => {
        setPageCount(num);

        if (SearchData) {
            listArticle(num, SearchData).then(res => {
                setCnts(res.data.page_cnt);
                setListData(res.data.data);
            });
        } else {
            initialListArticle(num).then(res => {
                setCnts(res.data.page_cnt);
                setListData(res.data.data);
            });
        }
        window.scrollTo(0, 0);
    };
    const RenderList = ListData.map((data, index) => {
        return (
            <a className="articleAtag" href={'/community/detail/' + data.Board.id} key={index}>
                <ListGroup className="communityList" horizontal={true}>
                    <ListGroup.Item
                        style={{ width: 300, textAlign: 'left' }}
                        className="articleItem"
                    >
                        <Image
                            src={data.profile + '?' + date}
                            style={{ width: 30, height: 30 }}
                            roundedCircle
                        ></Image>
                        {data.name}
                    </ListGroup.Item>
                    <ListGroup.Item className="articleItem contentItem">
                        {data.Board.select ? (
                            <Image
                                src={`${process.env.PUBLIC_URL}/img/winner.png`}
                                style={{ width: 30, height: 30 }}
                                roundedCircle
                            ></Image>
                        ) : null}{' '}
                        {data.Board.title}
                    </ListGroup.Item>
                </ListGroup>
            </a>
        );
    });
    return (
        <div>
            <Row>
                <Col xs={{ span: 8, offset: 2 }}>
                    <InputGroup className="mb-3">
                        <FormControl
                            className="communityInput"
                            placeholder="검색어를 입력하세요"
                            onChange={onSearchDataHandler}
                        />
                    </InputGroup>
                    {RenderList}
                    <br></br>
                    <div style={{ float: ' right' }}>
                        {PageCount > 1 ? (
                            <Button
                                variant="outline-success"
                                onClick={() => onPreviousHandler(PageCount - 1)}
                            >
                                이전페이지
                            </Button>
                        ) : (
                            <Button
                                variant="outline-success"
                                disabled={true}
                                onClick={() => onPreviousHandler(PageCount - 1)}
                            >
                                이전페이지
                            </Button>
                        )}{' '}
                        {ListData.length === 10 && Cnts !== PageCount ? (
                            <Button
                                variant="outline-success"
                                onClick={() => onNextHandler(PageCount + 1)}
                            >
                                다음페이지
                            </Button>
                        ) : (
                            <Button
                                variant="outline-success"
                                disabled={true}
                                onClick={() => onNextHandler(PageCount + 1)}
                            >
                                다음페이지
                            </Button>
                        )}{' '}
                        {user ? (
                            <Link to="community/upload/">
                                <Button variant="outline-success">글쓰기</Button>
                            </Link>
                        ) : null}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default CommunityList;
