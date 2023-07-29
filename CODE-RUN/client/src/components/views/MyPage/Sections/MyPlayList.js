import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// API
import {
    createPlaylist,
    readPlaylist,
    editPlaylist,
    deletePlaylist,
    watchPlaylist,
} from '_api/Playlist.js';
import './MyPlayList.css';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';

function MyPlayList(props) {
    const history = useHistory();
    const [PlaylistArray, setPlaylistArray] = useState(props.Playlists);
    const [Playlist, setPlaylist] = useState('');
    const [updatePlaylist, setupdatePlaylist] = useState('');
    const [UpdateNum, setUpdateNum] = useState(null);
    const video_list_id = UpdateNum;

    useEffect(() => {
        setPlaylistArray(props.Playlists);
    }, [props.Playlists]);
    const playlistHandler = e => {
        setPlaylist(e.currentTarget.value);
    };

    const createPlaylistHandler = e => {
        e.preventDefault();
        if (!Playlist) {
            return alert('제목을 입력해 주셔야 합니다.');
        }
        const body = {
            title: Playlist,
        };
        createPlaylist(body).then(res => {
            readPlaylist().then(res => {
                setPlaylistArray(res.data.data);
                setPlaylist('');
            });
        });
    };

    const onDeleteHander = idx => {
        deletePlaylist(idx).then(res => {
            readPlaylist().then(res => {
                setPlaylistArray(res.data.data);
            });
        });
    };

    const onUpdateHander = idx => {
        const deletebtn = document.getElementsByClassName(idx + 'mypage-playlist-delete');
        deletebtn[0].classList.add('hidden');
        setUpdateNum(idx);
    };

    const onUpdatePlaylistHander = idx => {
        const deletebtn = document.getElementsByClassName(idx + 'mypage-playlist-delete');
        deletebtn[0].classList.remove('hidden');
        const body = {
            video_list_id: video_list_id,
            title: updatePlaylist,
        };
        editPlaylist(body).then(res => {
            readPlaylist().then(res => {
                setPlaylistArray(res.data.data);
                setUpdateNum(null);
            });
        });
    };

    const onCanclePlaylistHander = idx => {
        const deletebtn = document.getElementsByClassName(idx + 'mypage-playlist-delete');
        deletebtn[0].classList.remove('hidden');
        setUpdateNum(null);
    };

    const onPlaylistChangehandler = e => {
        setupdatePlaylist(e.currentTarget.value);
    };

    const gotoWatchpage = num => {
        const video_list_id = num;

        watchPlaylist(video_list_id)
            .then(res => {
                history.push({
                    pathname: '/watch/' + res.data.data[0].video_id,
                    state: { playlistId: video_list_id },
                });
            })
            .catch(err => {
                alert('재생목록에 동영상을 담아주세요');
            });
    };

    const renderPlaylists = PlaylistArray.map((playlist, idx) => {
        return (
            <div>
                <Col span={5}>
                    <Card
                        className="shadow  classCard playlist-card"
                        style={{
                            width: '18rem',
                        }}
                        key={idx}
                    >
                        {' '}
                        <Card.Img
                            src={`${process.env.PUBLIC_URL}/img/cardbackground.png`}
                            alt="Card image"
                            style={{ opacity: '0.5', height: '200px' }}
                        />
                        <Card.ImgOverlay>
                            <Card.Body
                                style={{
                                    paddingBottom: '0',
                                }}
                            >
                                <Card.Title
                                    className="playlist-title"
                                    style={{ fontSize: '30px', textAlign: 'center' }}
                                >
                                    {playlist.title}
                                </Card.Title>
                                <Card.Text>
                                    <Button
                                        style={{
                                            backgroundColor: '#009378',
                                            borderColor: '#009378',
                                        }}
                                        onClick={() => gotoWatchpage(playlist.id)}
                                    >
                                        Go to Watch
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <div style={{ display: 'flex' }}>
                                    {UpdateNum === playlist.id ? null : (
                                        <Button
                                            variant="outline-dark"
                                            onClick={() => onUpdateHander(playlist.id)}
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            수정
                                        </Button>
                                    )}
                                    <div className={playlist.id + 'mypage-playlist-delete'}>
                                        <Button
                                            variant="outline-dark"
                                            onClick={() => onDeleteHander(playlist.id)}
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            삭제
                                        </Button>
                                    </div>
                                </div>

                                {UpdateNum === playlist.id ? (
                                    <Form.Group style={{ display: 'flex' }}>
                                        <Form.Control
                                            size="md"
                                            type="text"
                                            onChange={onPlaylistChangehandler}
                                            defaultValue={playlist.title}
                                        />
                                        <div>
                                            <Button
                                                style={{ padding: '4px' }}
                                                variant="outline-success"
                                                onClick={() => onUpdatePlaylistHander(playlist.id)}
                                            >
                                                수정하기
                                            </Button>
                                        </div>

                                        <div className={playlist.id + 'mypage-playlist-delete'}>
                                            <Button
                                                style={{ padding: '4px' }}
                                                variant="outline-success"
                                                onClick={() => onCanclePlaylistHander(playlist.id)}
                                            >
                                                취소하기
                                            </Button>
                                        </div>
                                    </Form.Group>
                                ) : (
                                    <p>{playlist.content}</p>
                                )}
                            </Card.Body>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </div>
        );
    });

    return (
        <div style={{ width: '90%', margin: 'auto', marginTop: '2rem' }}>
            <hr />
            <div className="mypage-card-title">
                <h1 style={{ fontWeight: 'bold' }}>마이 플레이리스트</h1>
            </div>
            <Form>
                <Form.Group controlId="formBasicEmail" style={{ display: 'flex' }}>
                    <Form.Control type="textarea" value={Playlist} onChange={playlistHandler} />
                    <Button
                        variant="outline-success"
                        type="submit"
                        onClick={createPlaylistHandler}
                        style={{ marginLeft: '20px' }}
                    >
                        +
                    </Button>
                </Form.Group>
            </Form>
            <Row>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderPlaylists}</div>
            </Row>
        </div>
    );
}

export default MyPlayList;
