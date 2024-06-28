import axiosInstance from "../axiosInstance.ts";
import {removeToken} from "../../utils/authorizationHelpers.ts";

export const logoutDoctor = async () => {
    try {
        const response = await axiosInstance.post('/doctor/logout');
        removeToken()
        return response;
    } catch (error) {
        console.error("Error while logging out doctor:", error);
        throw error;
    }
}