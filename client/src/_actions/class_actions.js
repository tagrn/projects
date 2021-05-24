import axios from 'axios';
import { VIDEOCLASS } from './types';
import { SERVER } from 'Config.js';

export function videoclasslist() {
    const request = axios.get(`${SERVER}/watch/`, {}).then(res => res.data);
    return {
        type: VIDEOCLASS,
        payload: request,
    };
}
