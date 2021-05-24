import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '_actions/user_actions';
import { Row, Col } from 'react-bootstrap';
import './AddtoPlaylist.js';
import ShowVideo from './Sections/ShowVideo';
import VideoInfomation from './Sections/VideoInfomation';

//api
import { fetchVideoDetail, fetchVideoComments } from '_api/Video';

function WatchPage(props) {
    const dispatch = useDispatch();
    const getParams = props.location?.state?.playlistId;
    const video_id = props.match.params.id;
    const [VideoDetail, setVideoDetail] = useState({});
    const [VideoComments, setVideoComments] = useState([]);

    useEffect(() => {
        const videoData = async () => {
            try {
                await fetchVideoDetail(video_id)
                    .then(res => setVideoDetail(res.data))
                    .catch(err => {
                        if (err.response.data.detail === 'Could not validate credentials') {
                            window.localStorage.removeItem('token');
                            dispatch(logoutUser());
                            props.history.push('/account');
                        }
                    });

                const res2 = await fetchVideoComments(video_id);
                setVideoComments(res2.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        videoData();
    }, []);

    return (
        <div style={{ marginTop: '2.5rem' }}>
            <Row>
                <Col xs={12} md={9} lg={9} xl={9}>
                    {VideoDetail.data === undefined ? null : (
                        <div>
                            <ShowVideo classId={video_id} />
                        </div>
                    )}
                </Col>
                <Col xs={12} md={3} lg={3} xl={3}>
                    {VideoDetail.data === undefined ? null : (
                        <VideoInfomation
                            VideoListId={getParams}
                            VideoDetail={VideoDetail}
                            VideoComments={VideoComments}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default WatchPage;
