import axiosInstance from "../axiosInstance.ts";

export const getInspectionsChain = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/inspection/${id}/chain`);
        console.log('Получен ответ /inspection/{id}/chain', response);
        return response.data;
    }
    catch (error) {
        console.log('Ошибка /inspection/{id}/chain', error);
        throw error;
    }
}