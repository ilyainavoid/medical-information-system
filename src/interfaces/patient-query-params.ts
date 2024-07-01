import {PatientSorting} from "../enums/patient-sorting.ts";

export interface QueryParams {
    size: number;
    name: string;
    conclusions?: string[];
    scheduleVisits: boolean;
    onlyMine: boolean;
    sorting?: PatientSorting;
}

export interface QueryParamsPaged {
    size: number;
    name: string;
    conclusions?: string[];
    scheduleVisits: boolean;
    onlyMine: boolean;
    sorting?: PatientSorting;
    page: number;
}