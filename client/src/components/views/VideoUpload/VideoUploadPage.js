import React, { useState, useEffect } from 'react';
import VideoContent from './Sections/VideoContent';
import VideoTag from './Sections/VideoTag';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';

// api
import { fetchLanguageTag, fetchAlgorithmTag, fetchCSTag } from '_api/Tag';
import { postVideoContentUpload, postVideoUpload } from '_api/Video';
import { postThumbnail } from '_api/Thumbnail';

import { Row, Col } from 'antd';
import './VideoUpload.css';

function VideoUpload(props) {
    const [Languages, setLanguages] = useState([]);
    const [Algorithms, setAlgorithms] = useState([]);
    const [CSes, setCSes] = useState([]);
    const [Courses, setCourses] = useState(['알고리즘', 'CS']);
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [Lanid, setLanid] = useState(null);
    const [AlgoList, setAlgoList] = useState([]);
    const [CSList, setCSList] = useState([]);
    const [FileArray, setFileArray] = useState([]);
    const [VideoArray, setVideoArray] = useState([]);
    const [PreviewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        const TagData = async () => {
            try {
                const res1 = await fetchLanguageTag();
                setLanguages(res1.data.data);
                const res2 = await fetchAlgorithmTag();
                setAlgorithms(res2.data.data);
                const res3 = await fetchCSTag();
                setCSes(res3.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        TagData();
    }, []);

    const renderCourseTag = Courses.map((course, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag tag={course} tag_id={index} />
                </Col>
            </div>
        );
    });

    const clickCourse = event => {
        const lan = document.getElementsByClassName('lan-container');
        const algo = document.getElementsByClassName('algo-container');
        const cs = document.getElementsByClassName('cs-container');

        if (event.target.innerHTML === '알고리즘') {
            if (event.target.style.backgroundColor !== 'grey') {
                event.target.style.backgroundColor = 'grey';
                lan[0].classList.remove('hidden');
                algo[0].classList.remove('hidden');
                cs[0].classList.add('hidden');
            } else {
                event.target.style.backgroundColor = '#01bf71';
                lan[0].classList.add('hidden');
                algo[0].classList.add('hidden');
                cs[0].classList.add('hidden');
            }
        } else if (event.target.innerHTML === 'CS') {
            if (event.target.style.backgroundColor !== 'grey') {
                event.target.style.backgroundColor = 'grey';
                cs[0].classList.remove('hidden');
                lan[0].classList.add('hidden');
                algo[0].classList.add('hidden');
            } else {
                event.target.style.backgroundColor = '#01bf71';
                lan[0].classList.add('hidden');
                algo[0].classList.add('hidden');
                cs[0].classList.add('hidden');
            }
        }
    };
    const handlerLanTag = (e, tag) => {
        setLanid(parseInt(tag));
        if (e.target.style.backgroundColor === 'grey') {
            e.target.style.backgroundColor = '#01bf71';
        } else {
            e.target.style.backgroundColor = 'grey';
        }
    };
    const handlerAlgoTag = (e, tag) => {
        if (e.target.style.backgroundColor === 'grey') {
            e.target.style.backgroundColor = '#01bf71';
            const idx = AlgoList.indexOf(tag);
            AlgoList.splice(idx, 1);
        } else {
            e.target.style.backgroundColor = 'grey';
            AlgoList.push(tag);
        }
    };
    const handlerCSTag = (e, tag) => {
        if (e.target.style.backgroundColor === 'grey') {
            e.target.style.backgroundColor = '#01bf71';
            const idx = CSList.indexOf(tag);
            CSList.splice(idx, 1);
        } else {
            e.target.style.backgroundColor = 'grey';
            CSList.push(tag);
        }
    };

    const renderLanguageTag = Languages.map((language, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag
                        tag={language.language_name}
                        tag_id={language.id}
                        handlerTag={(event, tag) => handlerLanTag(event, tag)}
                    />
                </Col>
            </div>
        );
    });
    const renderAlgorithmTag = Algorithms.map((algorithm, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag
                        tag={algorithm.algorithm_name}
                        tag_id={algorithm.id}
                        handlerTag={(event, tag) => handlerAlgoTag(event, tag)}
                    />
                </Col>
            </div>
        );
    });
    const renderCSTag = CSes.map((cs, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag
                        tag={cs.subject_name}
                        tag_id={cs.id}
                        handlerTag={(event, tag) => handlerCSTag(event, tag)}
                    />
                </Col>
            </div>
        );
    });

    const handlerTitle = title => {
        setTitle(title);
    };
    const handlerInfo = info => {
        setContent(info);
    };

    const postVideo = e => {
        const loaderContainer = document.getElementsByClassName('loader-container');
        loaderContainer[0].classList.remove('hidden');
        const body = {
            title: Title,
            content: Content,
            language_tag_id: Lanid,
            algorithm_tag_ids: AlgoList,
            subject_tag_ids: CSList,
        };

        postVideoContentUpload(body)
            .then(res => {
                const video_id = res.data.data.id;
                let formData = new FormData();
                formData.append('file', FileArray);
                postThumbnail(video_id, formData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                let formData2 = new FormData();
                formData2.append('file', VideoArray);
                const file_extension = VideoArray.type.split('/')[1];
                postVideoUpload(video_id, file_extension, formData2)
                    .then(res => {
                        if (res.data.data === 'success') {
                            props.history.push(`/profile/${props.user.login.user.id}`);
                        } else {
                            alert('Stay!!!');
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    const dropHandler = file => {
        setFileArray(file[0]);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file[0]);
    };

    const canclePreviewImg = () => {
        setPreviewUrl('');
    };
    const canclePreviewVideo = () => {
        setVideoArray([]);
    };

    const dropVideoHandler = video => {
        const content = document.getElementsByClassName('video-size-text');
        if (video[0].size >= 2.5e8) {
            content[0].style.color = 'red';
            alert('헤당 비디오는 250MB를 넘어갑니다.');
        } else {
            setVideoArray(video[0]);
        }
    };

    return (
        <div class="page">
            <div class="video-preview">
                <div>
                    <h1>비디오</h1>
                    <p className="video-size-text">용량은 최대 250MB까지 지원됩니다.</p>
                    {VideoArray.length === 0 ? (
                        <Dropzone onDrop={dropVideoHandler}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div
                                        style={{
                                            width: 280,
                                            height: 210,
                                            border: '1px solid lightgray',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '1rem',
                                        }}
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />

                                        <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    ) : (
                        <div
                            style={{
                                width: 280,
                                height: 210,
                                border: '1px solid lightgray',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                style={{ height: '100px' }}
                                src={`${process.env.PUBLIC_URL}/img/okay.png`}
                                alt="gg"
                            />
                        </div>
                    )}
                    <button className="pulse" onClick={canclePreviewVideo}>
                        취소
                    </button>
                </div>

                <div>
                    <h1>썸네일</h1>
                    <p className="video-size-text">이미지 비율은 4:3을 권장합니다.</p>
                    {PreviewUrl.length === 0 ? (
                        <Dropzone onDrop={dropHandler}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div
                                        style={{
                                            width: 280,
                                            height: 210,
                                            border: '1px solid lightgray',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    ) : (
                        <div>
                            <img style={{ height: '210px', width: '280px' }} src={PreviewUrl}></img>
                        </div>
                    )}
                    <button className="pulse" onClick={canclePreviewImg}>
                        취소
                    </button>
                </div>
            </div>

            <div class="video-content">
                <div style={{ marginBottom: '1rem' }}>
                    <h1>제목</h1>
                    <VideoContent
                        row={1}
                        maxlength={50}
                        handlerContent={title => handlerTitle(title)}
                        style={{ marginBottom: '1rem' }}
                    />
                </div>
                <h1>내용</h1>
                <VideoContent
                    row={10}
                    maxlength={1000}
                    handlerContent={info => handlerInfo(info)}
                />
                <button
                    className="pulse"
                    // style={{ position: 'absolute', right: '10px', top: '60%' }}
                    onClick={postVideo}
                >
                    제출
                </button>
                <div className="loader-container hidden">
                    <div id="loader">
                        <div id="d1"></div>
                        <div id="d2"></div>
                        <div id="d3"></div>
                        <div id="d4"></div>
                        <div id="d5"></div>
                    </div>
                </div>
            </div>
            <div class="video-tag" onClick={clickCourse}>
                <div>
                    <h3>코스 선택</h3>
                    <Row gutter={[8, 16]}>{renderCourseTag}</Row>
                </div>
                <div class="lan-container hidden">
                    <h3>언어(1개)</h3>
                    <Row gutter={[8, 16]}>{renderLanguageTag}</Row>
                </div>
                <div class="algo-container hidden">
                    <h3>알고리즘(복수가능)</h3>
                    <Row gutter={[8, 16]}>{renderAlgorithmTag}</Row>
                </div>
                <div class="cs-container hidden">
                    <h3>CS(복수가능)</h3>
                    <Row gutter={[8, 16]}>{renderCSTag}</Row>
                </div>
            </div>
        </div>
    );
}

export default VideoUpload;
