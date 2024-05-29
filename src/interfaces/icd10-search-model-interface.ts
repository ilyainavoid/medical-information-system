import {Icd10RecordModel} from "./icd10-record-model-interface.ts";
import {PageInfoModel} from "./page-info-model-interface.ts";

export interface Icd10SearchModel {
    records?: Icd10RecordModel | null;
    pagination?: PageInfoModel;
}