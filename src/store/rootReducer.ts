import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer.ts";
import profileReducer from "./reducers/profileReducer.ts";
import patientReducer from "./reducers/patientReducer.ts";
import inspectionQueryReducer from "./reducers/inspectionQueryReducer.ts";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    patient: patientReducer,
    inspectionQuery: inspectionQueryReducer
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>