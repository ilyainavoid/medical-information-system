import {createBrowserRouter} from "react-router-dom";
import {Layout} from "antd";
import {routes} from "./consts/routes.ts";

export const router = createBrowserRouter([
    {
        path: routes.root(),
        element: <Layout/>,
        children: []
    }
])