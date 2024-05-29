import {Gender} from "../enums/gender.ts";

export interface PatientModel {
    id: string;
    createTime: string;
    name: string;
    birthday?: string | null;
    gender: Gender;
}