import axiosInstance from "../axiosInstance.ts";

export const getSpeciality = async (name: string, page: number, size: number) => {
    try {
        const response = await axiosInstance.get('/dictionary/speciality', {
            params: {
                name: encodeURIComponent(name),
                page: page,
                size: size,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};