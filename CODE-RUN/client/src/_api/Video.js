import axios from 'axios';
import { SERVER, ACCESS_TOKEN, VIDEO_SERVER } from 'Config.js';

// 비디오 업로드 (내용)
export function postVideoContentUpload(video_info) {
    return axios.post(`${SERVER}/api/video/create`, video_info, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}

// 비디오 업로드 (비디오)
export function postVideoUpload(video_id, file_extension, video_info) {
    return axios.post(`${VIDEO_SERVER}/video/create/${video_id}/${file_extension}`, video_info, {
        headers: { token: `${ACCESS_TOKEN}`, 'Content-Type': 'multipart/form-data' },
    });
}
// 비디오 게시물 삭제하기
export function deleteVideo(video_id) {
    return axios.delete(`${SERVER}/api/video/delete/${video_id}`, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}
// 비디오 게시물 수정하기
export function updateVideo(video_info) {
    return axios.put(`${SERVER}/api/video/update`, video_info, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}
// 비디오 디테일 보기
export function fetchVideoDetail(video_id) {
    return axios.get(`${SERVER}/api/video/detail/${video_id}`, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}

// 비디오 좋아요 post
export function postVideoLike(video_id) {
    return axios.post(`${SERVER}/api/video/${video_id}`, '', {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}

// 비디오 가져오기
export function fetchFilteredVideoList(count) {
    return axios.get(`${SERVER}/api/video/page/${count}`);
}

// 비디오 가져오기 (로그인)
export function fetchLoginedFilteredVideoList(user_id, count) {
    return axios.get(`${SERVER}/api/video/page/${count}?user_id=${user_id}`);
}

// 비디오 검색 가져오기
export function fetchSearchedVideoList(data, count) {
    return axios.get(`${SERVER}/api/video/search?count=${count}&search_text=${data}`);
}

// 비디오 검색 가져오기 (로그인)
export function fetchLoginedSearchedVideoList(user_id, data, count) {
    return axios.get(
        `${SERVER}/api/video/search?count=${count}&search_text=${data}&user_id=${user_id}`,
    );
}

// 비디오 가져오기(알고만)
export function fetchAlgoFilteredVideoList(algorithm_tag_id, count) {
    return axios.get(`${SERVER}/api/video/page/${count}?algorithm_tag_id=${algorithm_tag_id}`);
}

// 비디오 가져오기(알고 & 로그인)
export function fetchLoginedAlgoFilteredVideoList(algorithm_tag_id, user_id, count) {
    return axios.get(
        `${SERVER}/api/video/page/${count}?algorithm_tag_id=${algorithm_tag_id}&user_id=${user_id}`,
    );
}

// 비디오 가져오기(CS만)
export function fetchCsFilteredVideoList(subject_tag_id, count) {
    return axios.get(`${SERVER}/api/video/page/${count}?subject_tag_id=${subject_tag_id}`);
}

// 비디오 가져오기(CS & 로그인)
export function fetchLoginedCsFilteredVideoList(subject_tag_id, user_id, count) {
    return axios.get(
        `${SERVER}/api/video/page/${count}?subject_tag_id=${subject_tag_id}&user_id=${user_id}`,
    );
}

// 비디오 가져오기(algo/언어)
export function fetchAlgoLangFilteredVideoList(algorithm_tag_id, language_tag_id, count) {
    return axios.get(
        `${SERVER}/api/video/page/${count}?algorithm_tag_id=${algorithm_tag_id}&language_tag_id=${language_tag_id}`,
    );
}

// 비디오 가져오기(algo/언어 & 로그인)
export function fetchLoginedAlgoLangFilteredVideoList(
    algorithm_tag_id,
    language_tag_id,
    user_id,
    count,
) {
    return axios.get(
        `${SERVER}/api/video/page/${count}?algorithm_tag_id=${algorithm_tag_id}&language_tag_id=${language_tag_id}&user_id=${user_id}`,
    );
}
// 비디오 댓글 작성하기
export function postVideoComment(comment) {
    return axios.post(`${SERVER}/api/video/comment/create`, comment, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}
// 비디오 댓글 가져오기
export function fetchVideoComments(video_id) {
    return axios.get(`${SERVER}/api/video/comment/${video_id}`, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}
// 비디오 댓글 지우기
export function deleteVideoComment(video_comment_id) {
    return axios.delete(`${SERVER}/api/video/comment/delete/${video_comment_id}`, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}
// 비디오 댓글 수정하기
export function updateVideoComment(comment) {
    return axios.put(`${SERVER}/api/video/comment/update`, comment, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}
// 베스트 비디오 5개
export function fetchBestVideos() {
    return axios.get(`${SERVER}/api/video/recommend`);
}
