import axiosInstance from "../axiosInstance.ts";
import {PatientCreateModel} from "../../interfaces/patient-create-model-interface.ts";

export const createPatient = async ({ CreateValues }: { CreateValues: PatientCreateModel }) => {
    try {
        const response = await axiosInstance.post('/patient', CreateValues);
        console.log('Ответ [POST] /api/patient', response);
        return response.data;
    }
    catch (error) {
        console.error('Возникла ошибка [POST] /api/patient', error);
        throw error;
    }
}