import {PatientModel} from "./patient-model-interface.ts";
import {PageInfoModel} from "./page-info-model-interface.ts";

export interface PatientPagedListModel {
    patients?: PatientModel[] | null;
    pagination: PageInfoModel;
}