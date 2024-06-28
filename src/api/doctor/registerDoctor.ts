import { DoctorRegisterModel } from "../../interfaces/doctor-register-model-interface.ts";
import axiosInstance from '../axiosInstance.ts'
import {setToken} from "../../utils/authorizationHelpers.ts";
export const registerDoctor = async ({ RegistrationValues }: { RegistrationValues: DoctorRegisterModel }) => {
    try {
        const response = await axiosInstance.post('/doctor/register', RegistrationValues);
        console.log('Access token:', response.data)
        setToken(response.data.token);
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        return response.data;
    } catch (error) {
        console.error("Error registering doctor:", error);
        throw error;
    }
};