import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

// 인증메일이 가지 않으면 다시요청
export function redirectEmail(email) {
    return axios.get(`${SERVER}/api/emailconfirm/message/${email}`);
}
// 이메일 중복 확인
export function checkEmail(email) {
    return axios.get(`${SERVER}/api/emailcheck/${email}`);
}
// 이메일로 임시 비밀번호 보내기
export function postTemporaryPassword(email) {
    return axios.post(`${SERVER}/api/newpassword`, email);
}
// 비밀번호 수정하기
export function updateUserInfo(user_info) {
    return axios.put(`${SERVER}/api/user/data/update`, user_info, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}
