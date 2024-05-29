import {SpecialityModel} from "./speciality-model-interface.ts";
import {PageInfoModel} from "./page-info-model-interface.ts";

export interface SpecialityPagedListModel {
    specialities?: SpecialityModel[] | null;
    pagination?: PageInfoModel;
}