import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

// 마이페이지에서 재생리스트 CRUD
export function createPlaylist(data) {
    return axios.post(`${SERVER}/api/videolist/create`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}

export function readPlaylist() {
    return axios.get(`${SERVER}/api/videolist`, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 재생목록 내 동영상 가져오기
export function fetchPlaylist(video_list_id) {
    return axios.get(`${SERVER}/api/videolist/detail/${video_list_id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

export function editPlaylist(data) {
    return axios.put(`${SERVER}/api/videolist/update`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}

export function deletePlaylist(video_list_id) {
    return axios.delete(`${SERVER}/api/videolist/delete/${video_list_id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 마이페이지에서 재생리스트 보기/비디오 추가/삭제
export function watchPlaylist(video_list_id) {
    return axios.get(`${SERVER}/api/videolist/detail/${video_list_id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

export function createPlaylistdata(data) {
    return axios.post(`${SERVER}/api/videolist/detail/create`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}

export function deletePlaylistdata(video_list_data_id) {
    return axios.delete(`${SERVER}/api/videolist/detail/delete/${video_list_data_id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}
