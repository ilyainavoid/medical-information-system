import {ProfileAction, ProfileActionType} from "../types/profileType.ts";
import {DoctorModel} from "../../interfaces/doctor-model-interface.ts";


export const setProfile = (profile: DoctorModel): ProfileAction => ({
    type: ProfileActionType.SET_PROFILE,
    payload: profile,
});