import {InspectionQueryParamsFull} from "../../interfaces/inspection-query-params-full.ts";
import axiosInstance from "../axiosInstance.ts";

export const getPatientInspectionList = async ({ SearchParams, id }: { SearchParams: Partial<InspectionQueryParamsFull>, id: string }) => {
    if (SearchParams.grouped) {
        try {
            const response = await axiosInstance.get(`/patient/${id}/inspections/search`, {
                params: SearchParams
            });
            console.log('Inspections list (only roots) was fetched successfully:', response);
            return response.data;
        }
        catch (error) {
            console.error('Error occurred while fetching inspections list:', error)
            throw error;
        }
    }
    else {
        try {
            const response = await axiosInstance.get(`/patient/${id}/inspections`, {
                params: SearchParams
            });
            console.log('Inspections list was fetched successfully:', response)
            return response.data;
        }
        catch (error) {
            console.error('Error occurred while fetching inspections list:', error)
            throw error;
        }
    }
}