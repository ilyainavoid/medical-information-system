import axiosInstance from "../axiosInstance.ts";
import {BASE_URL} from "../../consts/baseURL.ts";

export const logoutDoctor = async () => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/doctor/logout`);
        return response.data;
    } catch (error) {
        console.error("Error while logging out doctor:", error);
        throw error;
    }
}