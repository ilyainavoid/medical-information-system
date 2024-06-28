import {Flex} from "antd";
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm.tsx";

const LoginPage: React.FC = () => {

    return (
        <Flex className="container">
            <LoginForm/>
        </Flex>
    )
}

export default LoginPage;