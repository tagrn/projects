import axios from 'axios';
import { SERVER } from 'Config.js';

//언어들 목록
export function fetchLanguageTag() {
    return axios.get(`${SERVER}/api/tag/language`);
}
// 알고리즘 개념 목록
export function fetchAlgorithmTag() {
    return axios.get(`${SERVER}/api/tag/algorithm`);
}
// CS 과목 목록
export function fetchCSTag() {
    return axios.get(`${SERVER}/api/tag/subject`);
}
