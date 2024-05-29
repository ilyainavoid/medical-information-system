import {Gender} from "../enums/gender.ts";

export interface DoctorEditModel {
    email: string;
    name: string;
    birthday?: string;
    gender: Gender;
    phone?: string;
}