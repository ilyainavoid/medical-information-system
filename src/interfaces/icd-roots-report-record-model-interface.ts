import {Gender} from "../enums/gender.ts";

export interface IcdRootsReportRecordModel {
    patientName?: string | null;
    patientBirthdate: string;
    gender: Gender;
    visitsByRoot?: Record<string, number> | null;
}