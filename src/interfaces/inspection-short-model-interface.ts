import {DiagnosisModel} from "./diagnosis-model-interface.ts";

export interface InspectionShortModel {
    id: string;
    createTime: string;
    date: string;
    diagnosis: DiagnosisModel;
}