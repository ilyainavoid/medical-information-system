import {PatientModel} from "../../interfaces/patient-model-interface.ts";

export interface PatientState {
    patient: PatientModel | null;
}

export enum PatientActionType {
    SET_PATIENT = 'SET_PATIENT'
}

interface SetPatientAction {
    type: PatientActionType.SET_PATIENT;
    payload: PatientModel;
}

export type PatientAction = SetPatientAction;