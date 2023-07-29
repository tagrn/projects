import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Col } from 'antd';
import './UploadedVideos.css';

function UploadedVideos(props) {
    const history = useHistory();
    const [Classes, setClasses] = useState(props.VideoArray);

    useEffect(() => {
        setClasses(props.VideoArray);
    }, [props.VideoArray]);

    const toWatchHandler = num => {
        history.push('/watch/' + num);
    };

    const renderCards = Classes.map((classs, index) => {
        return (
            <div>
                <Col span={5}>
                    <Card
                        hoverable
                        onClick={() => toWatchHandler(classs.id)}
                        className="shadow classCard"
                        style={{ width: 240, height: 300, marginLeft: '20px', marginTop: '20px' }}
                        cover={
                            <img
                                className="classImg"
                                style={{ width: '100%', height: '210px' }}
                                alt="example"
                                src={classs.thumbnail}
                            />
                        }
                        bordered={false}
                    >
                        <p className="classTitle " style={{ fontSize: '18px' }}>
                            {classs.title}
                        </p>
                    </Card>
                </Col>
            </div>
        );
    });

    return (
        <div className="mypage-uploadvideo-container" style={{ marginTop: '2rem' }}>
            <hr />
            <div className="mypage-card-title">
                <h1 style={{ fontWeight: 'bold' }}>내가 업로드한 동영상</h1>
            </div>
            <Row style={{ marginBottom: '20px' }}>{Classes.length > 0 ? renderCards : null}</Row>
        </div>
    );
}

export default UploadedVideos;
