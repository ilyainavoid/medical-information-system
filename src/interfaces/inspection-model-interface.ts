import {Conclusion} from "./conclusion-interface.ts";
import {DoctorModel} from "./doctor-model-interface.ts";
import {DiagnosisModel} from "./diagnosis-model-interface.ts";
import {InspectionConsultationModel} from "./inspection-consultation-model-interface.ts";
import {PatientModel} from "./patient-model-interface.ts";

export interface InspectionModel {
    id: string;
    createTime: string;
    date?: string;
    anamnesis?: string | null;
    complaints?: string | null;
    treatment?: string | null;
    conclusion?: Conclusion;
    nextVisitDate?: string | null;
    deathDate?: string | null;
    baseInspectionId?: string | null;
    previousInspectionId?: string | null;
    patient?: PatientModel;
    doctor?: DoctorModel;
    diagnoses?: DiagnosisModel[] | null;
    consultations?: InspectionConsultationModel[] | null;
}