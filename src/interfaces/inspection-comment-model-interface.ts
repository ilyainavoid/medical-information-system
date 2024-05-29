import {DoctorModel} from "./doctor-model-interface.ts";

export interface InspectionCommentModel {
    id: string;
    createTime: string;
    parentId?: string;
    content?: string | null;
    author?: DoctorModel;
    modifyTime?: string;
}