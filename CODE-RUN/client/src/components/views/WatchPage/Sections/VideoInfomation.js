import React, { useState, useEffect } from 'react';
import VideoInfo from './VideoInfo';
import { Input, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoComment from './VideoComment';
//api
import { postVideoComment, deleteVideoComment } from '_api/Video';

function VideoInfomation(props) {
    const [VideoDetail, setVideoDetail] = useState(props.VideoDetail);
    const [VideoComments, setVideoComments] = useState([]);
    const video_id = props.VideoDetail.data.id;
    const [CommentContent, setCommentContent] = useState('');

    useEffect(() => {
        setVideoComments(props.VideoComments);
    }, [props.VideoComments]);

    const renderComment = () => {
        return (
            <div
                style={{
                    height: '320px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '20px',
                }}
            >
                <InfiniteScroll dataLength={VideoComments.length}>
                    {VideoComments.map((comment, index) => (
                        <VideoComment
                            key={index}
                            Videocomment={comment}
                            removeComment={comment_id => deleteCommentHandler(comment_id)}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        );
    };

    const deleteCommentHandler = comment_id => {
        const newVideoComments = [...VideoComments];
        deleteVideoComment(comment_id)
            .then(res => console.log(res.data))
            .then(err => console.log(err));
        const removeComment = newVideoComments.findIndex(comment => comment.id === comment_id);
        newVideoComments.splice(removeComment, 1);
        setVideoComments([...newVideoComments]);
    };

    const changeContent = e => {
        setCommentContent(e.currentTarget.value);
    };

    const sendVideoComment = e => {
        if (CommentContent.length !== 0) {
            const body = { video_id: video_id, content: CommentContent };
            postVideoComment(body)
                .then(res => {
                    setVideoComments([...VideoComments, res.data.data]);
                    setCommentContent('');
                })
                .catch(err => console.log(err));
        } else {
            alert('댓글을 입력해주세요.');
        }
    };

    const EnterComment = e => {
        if (CommentContent.length !== 0) {
            const body = { video_id: video_id, content: CommentContent };
            postVideoComment(body)
                .then(res => {
                    setVideoComments([...VideoComments, res.data.data]);
                    setCommentContent('');
                })
                .catch(err => console.log(err));
        } else {
            alert('댓글을 입력해주세요.');
        }
    };

    return (
        <div style={{ marginRight: '1.5rem' }}>
            <VideoInfo
                VideoListId={props.VideoListId}
                video={VideoDetail.data}
                like={VideoDetail.like_status}
            />

            {props.VideoListId !== undefined ? (
                <div></div>
            ) : (
                <div>
                    <div style={{ display: 'flex' }}>
                        <Input
                            style={{ marginRight: '10px' }}
                            className="comment-input"
                            placeholder="댓글을 입력해주세요."
                            onPressEnter={EnterComment}
                            onChange={changeContent}
                            value={CommentContent}
                        ></Input>
                        <Button className="comment-input-btn" onClick={sendVideoComment}>
                            작성
                        </Button>
                    </div>
                    {VideoComments.length === 0 ? (
                        <div>
                            <p>아직 댓글이 없어요 ㅠㅠ</p>
                        </div>
                    ) : (
                        renderComment()
                    )}
                </div>
            )}
        </div>
    );
}

export default VideoInfomation;
