import React, {ReactNode, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {getAccessToken} from "../../utils/authorizationHelpers.ts";
import {setAuth} from "../../store/actions/authActions.ts";
import {RootState} from "../../store/rootReducer.ts";
import NotAuthorizedPage from "../../pages/NotAuthorizedPage/NotAuthorizedPage.tsx";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const dispatch: AppDispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    useEffect(() => {
        if(getAccessToken() !== null) dispatch(setAuth(true))
    }, [dispatch]);


    return isAuth ?  <>{children}</> : <NotAuthorizedPage/>;
}

export default ProtectedRoute;