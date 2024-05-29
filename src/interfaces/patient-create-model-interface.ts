import {Gender} from "../enums/gender.ts";

export interface PatientCreateModel {
    name: string;
    birthday?: string;
    gender: Gender;
}