import React, { useState, useEffect } from 'react';
import { updateArticle, detailArticle } from '_api/Board.js';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './CommunityUpdate.css';

function CommunityUpdate(props) {
    const history = useHistory();

    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    useEffect(() => {
        detailArticle(props.match.params.id).then(res => {
            setTitle(res.data.data.Board.title);
            setContent(res.data.data.Board.content);
        });
    }, []);

    const titleHandler = event => {
        setTitle(event.currentTarget.value);
    };
    const contentHandler = event => {
        setContent(event.currentTarget.value);
    };
    const submitHandler = event => {
        event.preventDefault();
        if (!Title || !Content) {
            return alert('모든 값을 넣어 주셔야 합니다.');
        }
        const body = {
            board_id: props.match.params.id,
            title: Title,
            content: Content,
        };
        updateArticle(body)
            .then(res => {
                props.history.push(`/community/detail/${props.match.params.id}`);
            })
            .catch(err => console.log(err));
    };
    return (
        <div className="updatecontainer">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Form className="uploadform">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                className="titleUpdateInput"
                                as="textarea"
                                defaultValue={Title}
                                rows={1}
                                onChange={titleHandler}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                className="contentUpdateInput"
                                as="textarea"
                                defaultValue={Content}
                                rows={8}
                                onChange={contentHandler}
                            />
                        </Form.Group>
                        <Button
                            className="uploadbutton"
                            style={{ backgroundColor: '#009378', border: 'none' }}
                            type="submit"
                            onClick={submitHandler}
                        >
                            작성
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default CommunityUpdate;
