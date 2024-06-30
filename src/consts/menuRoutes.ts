import {routes} from "./routes.ts";

interface MenuRoutes {
    [key: string]: string;
}

export const menuRoutes: MenuRoutes = {
    homepage: routes.root(),
    login: routes.login(),
    profile: routes.profile(),
    patients: routes.patients()
};