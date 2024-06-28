import {DoctorModel} from "../../interfaces/doctor-model-interface.ts";

export interface ProfileState {
    profile: DoctorModel | null;
}

export enum ProfileActionType {
    SET_PROFILE = 'SET_PROFILE',
    UPDATE_PROFILE = 'UPDATE_PROFILE',
}

interface SetProfileAction {
    type: ProfileActionType.SET_PROFILE;
    payload: DoctorModel;
}

interface UpdateProfileAction {
    type: ProfileActionType.UPDATE_PROFILE;
    payload: Partial<DoctorModel>;
}

export type ProfileAction = SetProfileAction | UpdateProfileAction;