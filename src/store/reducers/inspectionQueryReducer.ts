import {InspectionQueryAction, InspectionQueryActionType, InspectionQueryState} from "../types/inspectionQueryType.ts";

const initialState: InspectionQueryState = {
    inspectionQuery: null
}

const inspectionQueryReducer = (state = initialState, action: InspectionQueryAction): InspectionQueryState => {
    switch (action.type) {
        case InspectionQueryActionType.SET_PARAMS:
            return {...state, inspectionQuery: action.payload};
        default:
            return state;
    }
}

export default inspectionQueryReducer;