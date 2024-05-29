import {DiagnosisType} from "../enums/diagnosis-type.ts";

export interface DiagnosisModel {
    id: string;
    createTime: string;
    code: string;
    name: string;
    description?: string;
    type: DiagnosisType;
}