import axiosInstance from "../axiosInstance.ts";

export const getInspection = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/inspection/${id}`);
        console.log('Успешно получена информация об осмотре', response)
        return response.data;
    }
    catch (error) {
        console.error('Произошла ошибка при получении информации об осмотре', error);
        throw error;
    }
}