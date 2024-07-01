import {QueryParamsPaged} from "../../interfaces/patient-query-params.ts";
import axiosInstance from "../axiosInstance.ts";


export const getPatientsList = async ({ SearchParams }: { SearchParams: Partial<QueryParamsPaged> }) => {
    console.log(SearchParams)
    try {
        const response = await axiosInstance.get('/patient', {
            params: SearchParams
        });
        console.log('Patients list was fetched successfully:', response)
        return response.data;
    }
    catch (error) {
        console.log('Error occurred while fetching patients list:', error)
        throw error;
    }
}