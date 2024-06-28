import {Button, Result} from "antd";
import {routes} from "../../consts/routes.ts";
import {useNavigate} from "react-router-dom";

const NotAuthorizedPage: React.FC = () => {
    const navigate = useNavigate()

    const buttons = [
        <Button key={'toRoot'} onClick={()=> navigate(routes.root())}>На главную</Button>,
        <Button key={'toLogin'} type="primary" onClick={()=> navigate(routes.login())}>Войти</Button>,
    ];

    return(
        <>
            <Result
                status="403"
                title="403"
                subTitle="Доступ к запрошенному ресурсу запрещен"
                extra={buttons}
            />
        </>
    );
}
export default NotAuthorizedPage;
