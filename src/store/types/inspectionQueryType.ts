import {InspectionsListQuery} from "../../interfaces/inspections-list-query.ts";

export interface InspectionQueryState {
    inspectionQuery: InspectionsListQuery | null;
}

export enum InspectionQueryActionType {
    SET_PARAMS = 'SET_PARAMS'
}

interface SetInspectionQueryAction {
    type: InspectionQueryActionType.SET_PARAMS;
    payload: InspectionsListQuery;
}

export type InspectionQueryAction = SetInspectionQueryAction;