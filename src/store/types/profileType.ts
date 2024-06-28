import {DoctorModel} from "../../interfaces/doctor-model-interface.ts";

export interface ProfileState {
    profile: DoctorModel | null;
}

export enum ProfileActionType {
    SET_PROFILE = 'SET_PROFILE',
}

interface SetProfileAction {
    type: ProfileActionType.SET_PROFILE;
    payload: DoctorModel;
}

export type ProfileAction = SetProfileAction;