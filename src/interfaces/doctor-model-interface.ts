import {Gender} from "../enums/gender.ts";

export interface DoctorModel {
    id: string;
    createTime: string;
    name: string;
    birthday?: string;
    gender: Gender;
    email: string;
    phone?: string;
}