import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

// 비디오 썸네일 post
export function postThumbnail(video_id, video_info) {
    return axios.post(`${SERVER}/image/thumbnail/create/${video_id}`, video_info, {
        headers: { token: `${ACCESS_TOKEN}`, 'Content-Type': 'multipart/form-data' },
    });
}
