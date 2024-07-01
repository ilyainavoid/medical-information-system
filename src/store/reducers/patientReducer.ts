import {PatientAction, PatientActionType, PatientState} from "../types/patientType.ts";

const initialState: PatientState = {
    patient: null
}

const patientReducer = (state = initialState, action: PatientAction): PatientState => {
    switch (action.type) {
        case PatientActionType.SET_PATIENT:
            return {...state, patient: action.payload};
        default:
            return state;
    }
}

export default patientReducer;