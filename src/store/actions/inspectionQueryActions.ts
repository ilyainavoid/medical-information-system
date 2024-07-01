import {InspectionsListQuery} from "../../interfaces/inspections-list-query.ts";
import {InspectionQueryAction, InspectionQueryActionType} from "../types/inspectionQueryType.ts";

export const setParams = (inspectionQuery: InspectionsListQuery): InspectionQueryAction => ({
    type: InspectionQueryActionType.SET_PARAMS,
    payload: inspectionQuery
})