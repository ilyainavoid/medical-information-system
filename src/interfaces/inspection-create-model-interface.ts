import {Conclusion} from "./conclusion-interface.ts";
import {DiagnosisCreateModel} from "./diagnosis-create-model-interface.ts";
import {ConsultationCreateModel} from "./consultation-create-model-interface.ts";

export interface InspectionCreateModel {
    date: string;
    anamnesis: string;
    complaints: string;
    treatment: string;
    conclusion: Conclusion;
    nextVisitDate?: string | null;
    deathDate?: string | null;
    previousInspectionId?: string | null;
    diagnoses: DiagnosisCreateModel[];
    consultations?: ConsultationCreateModel[] | null;
}