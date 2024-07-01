import {createBrowserRouter, Outlet} from "react-router-dom";
import Layout from './components/Layout/Layout.tsx'
import {routes} from "./consts/routes.ts";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import PatientPage from "./pages/PatientPage/PatientPage.tsx";
import MedicalCardPage from "./pages/MedicalCardPage/MedicalCardPage.tsx";
import CreateInspectionPage from "./pages/CreateInspectionPage/CreateInspectionPage.tsx";
import InspectionDetailsPage from "./pages/InspectionDetailsPage/InspectionDetailsPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                element: (
                    <ProtectedRoute>
                        <Outlet/>
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: routes.profile(),
                        element: <ProfilePage/>
                    },
                    {
                        path: routes.patients(),
                        element: <PatientPage/>
                    },
                    {
                        path: routes.patient(),
                        element: <MedicalCardPage/>
                    },
                    {
                        path: routes.inspectionCreate(),
                        element: <CreateInspectionPage/>
                    },
                    {
                        path: routes.inspection(),
                        element: <InspectionDetailsPage/>
                    }
                ]
            },
            {
                path: routes.login(),
                element: <LoginPage />
            },
            {
                path: routes.registration(),
                element: <RegistrationPage />
            },
        ]
    }
])