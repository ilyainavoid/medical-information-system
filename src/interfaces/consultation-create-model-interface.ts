import {InspectionCommentCreateModel} from "./inspection-comment-create-model-interface.ts";

export interface ConsultationCreateModel {
    specialityId: string;
    comment: InspectionCommentCreateModel;
}