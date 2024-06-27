import {Outlet} from "react-router-dom";
import {NotificationProvider} from "../NotificationProvider/NotificationProvider.tsx";

const Layout: React.FC = () => {
    return (
        <NotificationProvider>
            <Outlet/>
        </NotificationProvider>
    )
}
export default Layout;