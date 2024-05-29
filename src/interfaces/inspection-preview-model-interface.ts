import {Conclusion} from "./conclusion-interface.ts";
import {DiagnosisModel} from "./diagnosis-model-interface.ts";

export interface InspectionPreviewModel {
    id: string;
    createTime: string;
    previousId?: string | null;
    date: string;
    conclusion: Conclusion;
    doctorId: string;
    doctor: string;
    patientId: string;
    patient: string;
    diagnosis: DiagnosisModel;
    hasChain?: boolean;
    hasNested?: boolean;
}