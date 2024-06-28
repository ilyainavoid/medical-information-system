import React from "react";
import {Button, Card, ConfigProvider, Flex, Form, Input, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {validationRules} from "../../consts/validationRules.ts";
import {routes} from "../../consts/routes.ts";
import {LoginCredentialsModel} from "../../interfaces/login-credentials-model-interface.ts";
import {loginDoctor} from "../../api/doctor/loginDoctor.ts";
import {useNotification} from "../NotificationProvider/NotificationProvider.tsx";
import {LOGIN_FAILED, LOGIN_SUCCESSED} from "../../consts/strings.ts";
import {setAuth} from "../../store/actions/authActions.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import styles from './loginform.module.css'

const {Title} = Typography

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const {notify} = useNotification();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = async (values: LoginCredentialsModel) => {
        try {
            const response = await loginDoctor({LoginValues: values});
            if (response) {
                notify('success', LOGIN_SUCCESSED);
                dispatch(setAuth(true));
                navigate(routes.root());
            }
        } catch (e) {
            notify("error", LOGIN_FAILED);
        }
    }

    return (
        <Card className={"form-card"}>
            <ConfigProvider
                theme={{
                    token: {
                        borderRadius: 4
                    },
                }}
            >
                <Form form={form} layout="vertical" name={"loginForm"} onFinish={submitForm}>
                    <Flex className={"title-container"}>
                        <Title style={{fontWeight: 700}}>Вход</Title>
                    </Flex>
                    <Form.Item name={"email"} label={"Email"} rules={validationRules.emailValidation()}>
                        <Input placeholder={"Введите email"} className={styles.input}/>
                    </Form.Item>
                    <Form.Item name={"password"} label={"Пароль"} rules={validationRules.passwordValidation()}>
                        <Input.Password placeholder={"Введите пароль"} className={styles.input}/>
                    </Form.Item>
                    <Flex className={"button-container"}>
                        <Button type={'primary'} htmlType={'submit'} className={styles.button}>Войти</Button>
                    </Flex>
                    <Flex className={`button-container ${styles.register}`}>
                        <Button type={'primary'} onClick={() => {navigate(routes.registration())}} className={styles.button}>Зарегистрироваться</Button>
                    </Flex>
                </Form>
            </ConfigProvider>
        </Card>
    )
}

export default LoginForm;
