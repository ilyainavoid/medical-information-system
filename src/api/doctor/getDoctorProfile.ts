import axiosInstance from "../axiosInstance.ts";
import {BASE_URL} from "../../consts/baseURL.ts";

export const getDoctorProfile = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/doctor/profile`);
        return response.data;
    } catch (error) {
        console.error("Error while getting doctor's profile:", error);
        throw error;
    }
}