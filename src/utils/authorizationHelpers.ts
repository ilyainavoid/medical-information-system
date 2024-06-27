export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const setToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
};

export const removeToken = () => {
    localStorage.removeItem('accessToken');
}
