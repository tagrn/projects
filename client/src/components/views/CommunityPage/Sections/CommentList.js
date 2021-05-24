import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    detailArticle,
    listComment,
    selectComment,
    deleteComment,
    createComment,
    updatingComment,
} from '_api/Board.js';

import './CommentList.css';
import { CloseOutlined, EditOutlined, CheckOutlined, SendOutlined } from '@ant-design/icons';
import { Image, ListGroup, Button, Form, Col } from 'react-bootstrap';

function CommentList(props) {
    let user = useSelector(state => state.user);

    const date = new Date();
    const ArticleId = props.ArticleId;

    const [Article, setArticle] = useState({});
    const [Comments, setComments] = useState([]);
    const [Comment, setComment] = useState('');
    const [updateComment, setupdateComment] = useState('');
    const [UpdateNum, setUpdateNum] = useState(null);

    useEffect(() => {
        detailArticle(ArticleId).then(res => {
            setArticle(res.data.data.Board);
        });
        listComment(ArticleId).then(res => {
            setComments(res.data.data);
        });
    }, []);

    const commentHandler = event => {
        setComment(event.currentTarget.value);
    };
    const createCommentHandler = event => {
        const body = {
            board_id: ArticleId,
            content: Comment,
        };

        createComment(body).then(res => {
            setComment('');
            listComment(ArticleId).then(res => {
                setComments(res.data.data);
            });
        });
    };
    const onselectHander = idx => {
        const body = {
            board_comment_id: idx,
        };
        selectComment(body).then(res => {
            listComment(ArticleId).then(res => {
                setComments(res.data.data);
            });
        });
        window.location.replace(`/community/detail/${ArticleId}`);
    };
    const onDeleteHander = idx => {
        deleteComment(idx).then(res => {
            listComment(ArticleId).then(res => {
                setComments(res.data.data);
            });
        });
    };
    const onUpdateHander = idx => {
        setUpdateNum(idx);
    };
    const onUpdateCommentHander = num => {
        const board_comment_id = UpdateNum;

        const body = {
            board_comment_id: board_comment_id,
            content: updateComment,
        };

        updatingComment(body).then(res => {
            listComment(ArticleId).then(res => {
                setComments(res.data.data);
                setUpdateNum(null);
            });
        });
    };
    const onCommentChangehandler = event => {
        setupdateComment(event.currentTarget.value);
    };
    const renderComments = Comments.map((comment, index) => {
        return (
            <ListGroup.Item className="CommentBackground" key={index}>
                {comment.BoardComment?.select ? (
                    <Image
                        src={`${process.env.PUBLIC_URL}/img/winner.png`}
                        style={{ width: 30, height: 30 }}
                        roundedCircle
                    ></Image>
                ) : null}
                <Image
                    src={comment.profile + '?' + date}
                    style={{ width: 30, height: 30 }}
                    roundedCircle
                ></Image>
                {comment.name}{' '}
                {!Article.select && Article.user_id === user?.login?.user?.id ? (
                    <CheckOutlined onClick={() => onselectHander(comment.BoardComment?.id)} />
                ) : null}{' '}
                {UpdateNum !== comment.BoardComment.id &&
                comment.BoardComment.user_id === user?.login?.user?.id ? (
                    <EditOutlined onClick={() => onUpdateHander(comment.BoardComment?.id)} />
                ) : null}{' '}
                {comment.BoardComment.user_id === user?.login?.user?.id ? (
                    <CloseOutlined onClick={() => onDeleteHander(comment.BoardComment?.id)} />
                ) : null}
                <br />
                <br />
                {UpdateNum === comment.BoardComment?.id ? (
                    <Form.Group>
                        <Form.Control
                            size="md"
                            type="text"
                            onChange={onCommentChangehandler}
                            defaultValue={comment.BoardComment?.content}
                        />
                        <Button
                            variant="success"
                            onClick={() => onUpdateCommentHander(comment.BoardComment?.id)}
                        >
                            수정하기
                        </Button>
                    </Form.Group>
                ) : (
                    <p>{comment.BoardComment?.content}</p>
                )}
            </ListGroup.Item>
        );
    });
    return (
        <div className="CommentBg">
            <h4>댓글</h4>
            <Form>
                <Form.Row>
                    <Col xs={11}>
                        <Form.Control
                            type="textarea"
                            className="commentInput Submit"
                            placeholder="댓글을 작성하세요"
                            onChange={commentHandler}
                        />
                    </Col>
                    <br></br>
                    <br></br>
                    <Col>
                        <Button variant="success" type="submit" onClick={createCommentHandler}>
                            작 성
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
            <ListGroup>{renderComments}</ListGroup>
        </div>
    );
}

export default CommentList;
