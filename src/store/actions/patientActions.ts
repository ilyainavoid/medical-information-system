import {PatientModel} from "../../interfaces/patient-model-interface.ts";
import {PatientAction, PatientActionType} from "../types/patientType.ts";

export const setPatient = (patient: PatientModel): PatientAction => ({
    type: PatientActionType.SET_PATIENT,
    payload: patient,
});