import {DoctorEditModel} from "../../interfaces/doctor-edit-model-interface.ts";
import axiosInstance from "../axiosInstance.ts";
import {BASE_URL} from "../../consts/baseURL.ts";

export const editDoctorProfile = async ({newProfileData} : {newProfileData : DoctorEditModel}) => {
    try {
        return await axiosInstance.put(`${BASE_URL}/doctor/profile`, newProfileData);
    }
    catch (error) {
        console.error("Error while editing doctor's profile:", error);
        throw error;
    }
}