import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
    baseURL: 'https://mis-api.kreosoft.space/api'
}

const api: AxiosInstance = axios.create(config);

export default api;