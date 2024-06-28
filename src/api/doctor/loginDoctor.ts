import {LoginCredentialsModel} from "../../interfaces/login-credentials-model-interface.ts";
import axiosInstance from "../axiosInstance.ts";
import {setToken} from "../../utils/authorizationHelpers.ts";

export const loginDoctor = async ({LoginValues} : {LoginValues : LoginCredentialsModel}) => {
    try {
        const response = await axiosInstance.post('/doctor/login', LoginValues);
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        setToken(response.data.token);
        return response.data;
    } catch (error) {
        console.error("Error logging in doctor:", error);
        throw error;
    }
}