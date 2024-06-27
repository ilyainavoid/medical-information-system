import { DoctorRegisterModel } from "../../interfaces/doctor-register-model-interface.ts";
import axiosInstance from '../axiosInstance.ts'
import {BASE_URL} from "../../consts/baseURL.ts";
export const registerDoctor = async ({ RegistrationValues }: { RegistrationValues: DoctorRegisterModel }) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/doctor/register`, RegistrationValues);
        return response.data;
    } catch (error) {
        console.error("Error registering doctor:", error);
        throw error;
    }
};