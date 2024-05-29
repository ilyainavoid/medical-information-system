import {SpecialityModel} from "./speciality-model-interface.ts";
import {InspectionCommentModel} from "./inspection-comment-model-interface.ts";

export interface InspectionConsultationModel {
    id: string;
    createTime: string;
    inspectionId?: string;
    speciality?: SpecialityModel;
    rootComment?: InspectionCommentModel;
    commentsNumber: number;
}
