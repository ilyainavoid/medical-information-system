import {Outlet} from "react-router-dom";
import {NotificationProvider} from "../NotificationProvider/NotificationProvider.tsx";
import React from "react";
import HeaderSection from "../HeaderSection/HeaderSection.tsx";

const Layout: React.FC = () => {
    return (
        <NotificationProvider>
            <HeaderSection/>
            <Outlet/>
        </NotificationProvider>
    )
}
export default Layout;