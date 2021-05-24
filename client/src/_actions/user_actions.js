import axios from 'axios';
import { LOGIN_USER, SIGNUP_USER, UPDATE_USER, LOGOUT_USER } from './types';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

export function loginUser(dataToSubmit) {
    const request = axios
        .post(`${SERVER}/api/login`, dataToSubmit)
        .then(res => res.data)
        .catch(err => console.log(err));
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function signupUser(dataToSumbmit) {
    const request = axios
        .post(`${SERVER}/api/signup`, dataToSumbmit)
        .then(res => res.data)
        .catch(err => console.log(err));
    return {
        type: SIGNUP_USER,
        payload: request,
    };
}

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export function updateUser(dataToSubmit) {
    const request = axios
        .put(`${SERVER}/api/user/data/update`, dataToSubmit, {
            headers: { token: `${ACCESS_TOKEN}` },
        })
        .then(res => res.data.user)
        .catch(err => console.log(err));
    return {
        type: UPDATE_USER,
        payload: request,
    };
}
