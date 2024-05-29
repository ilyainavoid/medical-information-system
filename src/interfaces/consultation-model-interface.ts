import {SpecialityModel} from "./speciality-model-interface.ts";
import {CommentModel} from "./comment-model-interface.ts";

export interface ConsultationModel {
    id: string;
    createTime: string;
    inspectionId?: string;
    speciality?: SpecialityModel;
    comments?: CommentModel[] | null;
}