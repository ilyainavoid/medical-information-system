import axios from 'axios';
import {getAccessToken} from "../utils/authorizationHelpers.ts";
import {BASE_URL} from "../consts/baseURL.ts";
import qs from 'qs';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token && token !== "undefined") {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
