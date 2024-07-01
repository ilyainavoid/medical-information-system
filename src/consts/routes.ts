export const routes = {
    root: () => '/',
    registration: () => '/registration',
    login: () => '/login',
    profile: () => '/profile',
    patients: () => '/patients',
    patient: (id: string) => `/patient/${id || ':id'}`,
    inspection: (id: string) => `/inspection/${id || ':id'}`,
    inspectionCreate: () => '/inspection/create'
};

