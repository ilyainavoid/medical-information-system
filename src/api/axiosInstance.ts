import axios from 'axios';
import {getAccessToken} from "../utils/authorizationHelpers.ts";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
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
