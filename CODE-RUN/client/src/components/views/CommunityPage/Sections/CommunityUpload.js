import React, { useState } from 'react';

import { createArticle } from '_api/Board.js';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './CommunityUpload.css';

function CommunityUpload(props) {
    const history = useHistory();

    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');

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
            title: Title,
            content: Content,
        };
        createArticle(body)
            .then(res => {
                props.history.push(`/community/detail/${res.data.data.id}`);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="uploadcontainer">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Form className="uploadform">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                className="titleInput"
                                as="textarea"
                                rows={1}
                                onChange={titleHandler}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                className="contentInput"
                                as="textarea"
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

export default CommunityUpload;
