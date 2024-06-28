import axiosInstance from "../axiosInstance.ts";
import store from "../../store/store.ts";
import {setAuth} from "../../store/actions/authActions.ts";
import {setProfile} from "../../store/actions/profileActions.ts";

export const getDoctorProfile = async () => {
    try {
        const response = await axiosInstance.get('/doctor/profile');
        console.log('getDoctorProfile response:', response.data);
        store.dispatch(setAuth(true));
        store.dispatch(setProfile(response.data));
        return response.data;
    } catch (error) {
        console.error("Error while getting doctor's profile:", error);
        throw error;
    }
}