import axiosInstance from "../axiosInstance.ts";

export const getPatientCard = async (id: string)=> {
    try {
        const response = await axiosInstance.get(`/patient/${id}`);
        console.log('[GET] /patient/id fulfilled:', response);
        return response.data
    }
    catch (error) {
        console.error('Error in [GET] /patient/id', error);
        throw error;
    }
}