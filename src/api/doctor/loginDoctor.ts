import {LoginCredentialsModel} from "../../interfaces/login-credentials-model-interface.ts";
import axiosInstance from "../axiosInstance.ts";
import {BASE_URL} from "../../consts/baseURL.ts";

export const loginDoctor = async ({LoginValues} : {LoginValues : LoginCredentialsModel}) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/doctor/login`, LoginValues);
        return response.data;
    } catch (error) {
        console.error("Error logging in doctor:", error);
        throw error;
    }
}