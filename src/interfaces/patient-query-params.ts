import {ConclusionType} from "../enums/conclusion-type.ts";
import {PatientSorting} from "../enums/patient-sorting.ts";

export interface QueryParams {
    size: number;
    name: string;
    conclusions: ConclusionType[];
    scheduleVisits: boolean;
    onlyMine: boolean;
    sorting?: PatientSorting;
}

export interface QueryParamsPaged {
    size: number;
    name: string;
    conclusions: ConclusionType[];
    scheduleVisits: boolean;
    onlyMine: boolean;
    sorting?: PatientSorting;
    page: number;
}