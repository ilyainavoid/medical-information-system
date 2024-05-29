import {InspectionPreviewModel} from "./inspection-preview-model-interface.ts";
import {PageInfoModel} from "./page-info-model-interface.ts";

export interface InspectionPagedListModel {
    inspections?: InspectionPreviewModel[] | null;
    pagination?: PageInfoModel;
}