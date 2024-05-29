import {DiagnosisType} from "../enums/diagnosis-type.ts";

export interface DiagnosisCreateModel {
    icdDiagnosisId: string;
    description?: string;
    type: DiagnosisType;
}