import {ProfileAction, ProfileActionType} from "../types/profileType.ts";
import {DoctorModel} from "../../interfaces/doctor-model-interface.ts";
import {DoctorEditModel} from "../../interfaces/doctor-edit-model-interface.ts";


export const setProfile = (profile: DoctorModel): ProfileAction => ({
    type: ProfileActionType.SET_PROFILE,
    payload: profile,
});

export const updateProfile = (changes: Partial<DoctorEditModel>): ProfileAction => ({
    type: ProfileActionType.UPDATE_PROFILE,
    payload: changes,
});