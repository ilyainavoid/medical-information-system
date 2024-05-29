import {Conclusion} from "./conclusion-interface.ts";
import {DiagnosisCreateModel} from "./diagnosis-create-model-interface.ts";

export interface InspectionEditModel {
    anamnesis?: string | null;
    complaints: string;
    treatment: string;
    conclusion: Conclusion;
    nextVisitDate?: string | null;
    deathDate?: string | null;
    diagnoses: DiagnosisCreateModel[];
}