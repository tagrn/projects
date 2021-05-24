import axios from 'axios';
import { SERVER } from 'Config.js';

// LANGUAGE TAG
export function getLanguageTag() {
    return axios.get(`${SERVER}/api/tag/language`);
}

// SUBJECT TAG
export function getCsTag() {
    return axios.get(`${SERVER}/api/tag/subject`);
}

// ALGORITHM TAG
export function getAlgoTag() {
    return axios.get(`${SERVER}/api/tag/algorithm`);
}
