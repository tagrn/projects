import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddtoPlaylist from '../AddtoPlaylist.js';
import { Modal, Button } from 'react-bootstrap';
import { Input } from 'antd';
import './VideoInfo.scss';
import './VideoInfo.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { ListGroup, Image } from 'react-bootstrap';
import { HeartOutlined, HeartTwoTone, DeleteOutlined, EditOutlined } from '@ant-design/icons';
//api
import { postVideoLike, deleteVideo, updateVideo } from '_api/Video';
import { fetchPlaylist } from '_api/Playlist';

function VideoInfo(props) {
    let user = useSelector(state => state.user);
    const { TextArea } = Input;
    const history = useHistory();
    const [VideoTitle, setVideoTitle] = useState(props.video.title);
    const [VideoContent, setVideoContent] = useState(props.video.content);
    const [Like, setLike] = useState(props.like);
    const [ClassList, setClassList] = useState([]);
    const [Visible, setVisible] = useState(false);
    const [UpdateVisible, setUpdateVisible] = useState(false);
    const [VideoId, setVideoId] = useState(props.video.id);

    useEffect(() => {
        fetchPlaylist(props.VideoListId).then(res => {
            setClassList(res.data.data);
        });
    }, []);

    const clickHeart = e => {
        if (Like === false) {
            setLike(true);
            postVideoLike(props.video.id)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        } else {
            setLike(false);
            postVideoLike(props.video.id)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    };
    const onPlayListHander = video => {
        setVideoTitle(video.title);
        setVideoContent(video.content);
        setVideoId(video.id);
        history.push({
            pathname: '/watch/' + video.id,
            state: { playlistId: props.VideoListId },
        });
    };

    const renderList = () => {
        if (ClassList.length !== 0) {
            return (
                <div>
                    <hr></hr>
                    <p>재생목록</p>
                    <div
                        style={{
                            height: '200px',
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <InfiniteScroll dataLength={ClassList.length}>
                            {ClassList.map((data, idx) => (
                                <div>
                                    {data.video_id === VideoId ? (
                                        <ListGroup
                                            onClick={() => onPlayListHander(data.Video)}
                                            className="classListItem"
                                            horizontal={true}
                                            key={idx}
                                        >
                                            <ListGroup.Item className="classListItem">
                                                <Image
                                                    src={data.Video.thumbnail}
                                                    style={{ width: 60, height: 45 }}
                                                ></Image>
                                            </ListGroup.Item>

                                            <ListGroup.Item className="classListItem">
                                                {data.Video.title}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    ) : (
                                        <ListGroup
                                            onClick={() => onPlayListHander(data.Video)}
                                            style={{ cursor: 'pointer' }}
                                            horizontal={true}
                                            key={idx}
                                        >
                                            <ListGroup.Item className="classListNormalItem">
                                                <Image
                                                    src={data.Video.thumbnail}
                                                    style={{ width: 60, height: 45 }}
                                                ></Image>
                                            </ListGroup.Item>

                                            <ListGroup.Item
                                                style={{ textAlign: 'center' }}
                                                className="classListNormalItem"
                                            >
                                                {data.Video.title}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    )}
                                </div>
                            ))}
                        </InfiniteScroll>
                        <hr></hr>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        height: '0px',
                    }}
                ></div>
            );
        }
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const handleOk = () => {
        deleteVideo(props.video.id)
            .then(res => {
                setVisible(true);
                history.push('/class');
            })
            .catch(err => console.log(err));
    };
    const clickDelete = () => {
        setVisible(true);
    };
    const clickUpdate = () => {
        setUpdateVisible(true);
    };
    const changeTitle = e => {
        setVideoTitle(e.target.value);
    };
    const changeContent = e => {
        setVideoContent(e.target.value);
    };
    const updateCancle = () => {
        setUpdateVisible(false);
    };
    const updateVideoInfo = () => {
        const body = {
            video_id: props.video.id,
            title: VideoTitle,
            content: VideoContent,
        };
        updateVideo(body)
            .then(res => console.log(res))
            .catch(err => console.log(err.message));
        setUpdateVisible(false);
    };

    const clickTextMore = () => {
        const contentbefore = document.getElementsByClassName('content-simple');
        const contentafter = document.getElementsByClassName('content-detail');
        const morebtn = document.getElementsByClassName('more-btn');
        contentbefore[0].classList.add('hidden');
        contentafter[0].style.display = 'flex';
        morebtn[0].classList.add('hidden');
    };

    return (
        <div class="video-info-container">
            <Modal show={Visible} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: '25px', fontWeight: 'bold' }}>삭제하시겠습까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOk}
                        style={{ backgroundColor: 'green', borderColor: 'green' }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div class="card-content">
                <div class="card-row">
                    <div class="card-col">
                        {UpdateVisible ? (
                            <div>
                                <h4>
                                    <strong>비디오 수정</strong>
                                </h4>
                                <Input
                                    className="watch-videoupdate-title"
                                    defaultValue={VideoTitle}
                                    onChange={changeTitle}
                                ></Input>
                            </div>
                        ) : (
                            <h2>
                                <strong>{VideoTitle}</strong>
                            </h2>
                        )}

                        <p>
                            {UpdateVisible ? (
                                <TextArea
                                    defaultValue={VideoContent}
                                    showCount
                                    maxLength={500}
                                    onChange={changeContent}
                                    rows={5}
                                    className="watch-videoupdate-content"
                                />
                            ) : (
                                <div>
                                    {VideoContent.length > 50 ? (
                                        <div>
                                            <div
                                                className="content-simple"
                                                style={{
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    width: '100%',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {VideoContent}
                                            </div>
                                            <div
                                                className="content-detail hidden"
                                                style={{
                                                    height: '80px',
                                                    overflow: 'auto',
                                                    display: 'none',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <InfiniteScroll dataLength={VideoContent.length}>
                                                    {VideoContent}
                                                </InfiniteScroll>
                                            </div>
                                            <p
                                                className="more-btn"
                                                style={{ cursor: 'pointer', color: '#C0C0C0' }}
                                                onClick={clickTextMore}
                                            >
                                                더보기
                                            </p>
                                        </div>
                                    ) : (
                                        <div>{VideoContent}</div>
                                    )}
                                </div>
                            )}
                        </p>
                        {UpdateVisible ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: '30px',
                                }}
                            >
                                <Button
                                    onClick={updateVideoInfo}
                                    style={{
                                        marginRight: '8px',
                                        backgroundColor: 'green',
                                        borderColor: 'green',
                                    }}
                                >
                                    수정완료
                                </Button>
                                <Button
                                    onClick={updateCancle}
                                    style={{
                                        backgroundColor: 'green',
                                        borderColor: 'green',
                                    }}
                                >
                                    취소
                                </Button>
                            </div>
                        ) : null}

                        {renderList()}
                    </div>
                    <div class="right col"></div>
                </div>
            </div>
            {ClassList.length === 0 ? (
                <div>
                    {UpdateVisible ? null : (
                        <div class="like-save-container">
                            {Like ? (
                                <HeartTwoTone
                                    twoToneColor="rgb(3, 165, 111)"
                                    onClick={clickHeart}
                                />
                            ) : (
                                <HeartOutlined onClick={clickHeart} />
                            )}
                            <AddtoPlaylist videoId={props.video.id} />
                            {props.video.user_id === user.login.user.id ? (
                                <div>
                                    <DeleteOutlined onClick={clickDelete} />
                                    <EditOutlined onClick={clickUpdate} />
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            ) : null}

            <hr style={{ width: '100%' }}></hr>
        </div>
    );
}

export default VideoInfo;
