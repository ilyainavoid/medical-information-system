import {Gender} from "../enums/gender.ts";

export interface DoctorRegisterModel {
    name: string;
    password: string;
    email: string;
    birthday?: string;
    gender: Gender;
    phone?: string;
    speciality: string;
}