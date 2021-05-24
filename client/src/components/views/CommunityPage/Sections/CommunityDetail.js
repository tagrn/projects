import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '_actions/user_actions';
import { useSelector } from 'react-redux';
import Footer from 'components/views/Footer/Footer';
import { detailArticle, deleteArticle } from '_api/Board.js';
import { Col, Row, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import CommentList from './CommentList';

import './CommunityDetail.css';

function CommunityDetail(props) {
    const dispatch = useDispatch();
    const date = new Date();
    const num = props.match.params.id;
    const [Article, setArticle] = useState({});
    const history = useHistory();
    let user = props.user;

    useEffect(() => {
        detailArticle(num)
            .then(res => {
                setArticle(res.data.data);
            })
            .catch(err => {
                if (err.response.data.detail === 'Could not validate credentials') {
                    window.localStorage.removeItem('token');
                    dispatch(logoutUser());
                    props.history.push('/account');
                }
            });
    }, []);
    const create_date = new Date(Article.Board?.created_date);
    const year = create_date.getFullYear();
    const month = create_date.getMonth();
    const day = create_date.getDate();
    const created_date = `${year}년 ${month}월 ${day}일`;
    const deleteHandler = event => {
        event.preventDefault();
        const article_id = props.match.params.id;
        deleteArticle(article_id).then(res => {
            props.history.push('/community');
        });
    };

    return (
        <div>
            <div>
                <br></br>
                <br></br>
                <Row>
                    <Col>
                        <div>
                            <Col md={{ span: 8, offset: 2 }}>
                                <h1>
                                    {Article.Board?.title}{' '}
                                    {Article.Board?.select ? (
                                        <span
                                            style={{
                                                backgroundColor: '#655c56',
                                                color: '#fc8a15',
                                                float: 'right',
                                            }}
                                            className="badge"
                                        >
                                            채택
                                        </span>
                                    ) : null}
                                </h1>
                                <Image
                                    src={Article.profile + '?' + date}
                                    style={{ width: 40, height: 40 }}
                                    roundedCircle
                                ></Image>
                                {Article.name}
                                <div style={{ color: 'grey' }}>
                                    {created_date}
                                    {Article.Board?.created_date === Article.Board?.updated_date ? (
                                        <div></div>
                                    ) : (
                                        <div style={{ color: 'black', float: 'right' }}>수정됨</div>
                                    )}
                                </div>

                                <hr></hr>
                                <h2>
                                    {Article.Board?.content}
                                    {Article.Board?.user_id === user.login?.user?.id ? (
                                        <div style={{ float: 'right' }}>
                                            <Link
                                                style={{ color: 'black', width: 50 }}
                                                to={`update/${props.match.params.id}`}
                                            >
                                                <EditOutlined style={{ fontSize: '100%' }} />
                                            </Link>{' '}
                                            <CloseOutlined
                                                style={{ fontSize: '100%' }}
                                                onClick={deleteHandler}
                                            />
                                        </div>
                                    ) : null}
                                </h2>

                                <br></br>
                            </Col>
                        </div>
                        <br></br>
                        <div className="CommentBg">
                            <Col md={{ span: 8, offset: 2 }}>
                                <br />
                                <CommentList ArticleId={props.match.params.id} />
                                <br />
                            </Col>
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default CommunityDetail;
