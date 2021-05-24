import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

// 글쓰기
export function createArticle(data) {
    return axios.post(`${SERVER}/api/board`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}
// 글 상세페이지
export function detailArticle(id) {
    return axios.get(`${SERVER}/api/board/detail/${id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}
// 글 지우기
export function deleteArticle(id) {
    return axios.delete(`${SERVER}/api/board/delete/${id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}
// 글 고치기
export function updateArticle(data) {
    return axios.put(`${SERVER}/api/board/update`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 댓글 쓰기
export function createComment(data) {
    return axios.post(`${SERVER}/api/board/comment`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 댓글 리스트
export function listComment(id) {
    return axios.get(`${SERVER}/api/board/comment/${id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 댓글 채택
export function selectComment(data) {
    return axios.put(`${SERVER}/api/board/comment/select`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 댓글 삭제
export function deleteComment(id, data) {
    return axios.delete(`${SERVER}/api/board/comment/delete/${id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 댓글 수정
export function updatingComment(data) {
    return axios.put(`${SERVER}/api/board/comment/update`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 글 검색 리스트
export function listArticle(count, search_text) {
    return axios.get(`${SERVER}​/api/board/search?count=${count}&search_text=${search_text}`);
}

// 글 리스트
export function initialListArticle(count) {
    return axios.get(`${SERVER}​/api/board/search?count=${count}`);
}
