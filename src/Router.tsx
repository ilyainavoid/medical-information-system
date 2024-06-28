import {createBrowserRouter, Outlet} from "react-router-dom";
import Layout from './components/Layout/Layout.tsx'
import {routes} from "./consts/routes.ts";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

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
                children: []
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