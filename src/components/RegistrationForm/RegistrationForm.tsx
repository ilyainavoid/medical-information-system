import {Button, Card, ConfigProvider, DatePicker, Flex, Form, Input, Select, Typography} from "antd";
import { validationRules } from "../../consts/validationRules";
import styles from './registrationform.module.css';
import { getSpeciality } from "../../api/dictionary/getSpeciality";
import {useEffect, useState} from "react";
import {DoctorRegisterModel} from "../../interfaces/doctor-register-model-interface.ts";
import {useNotification} from "../NotificationProvider/NotificationProvider.tsx";
import {registerDoctor} from "../../api/doctor/registerDoctor.ts";
import {REGISTRATION_FAILED, REGISTRATION_SUCCESSED} from "../../consts/strings.ts";
import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {setAuth} from "../../store/actions/authActions.ts";
import {routes} from "../../consts/routes.ts";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs"
import {processFormValues} from "../../utils/processFormValues.ts";

const { Title } = Typography;
const { Option } = Select;

interface Speciality {
    name: string;
    id: string;
}

const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();
    const [specialitiesOptions, setSpecialtiesOptions] = useState<typeof Option[]>([]);
    const {notify} = useNotification()
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const specialties = await getSpeciality('', 1, 50);
                console.log(specialties)
                const formattedOptions = specialties.specialties.map((speciality: Speciality) => ({
                    value: speciality.id,
                    label: speciality.name
                }));
                setSpecialtiesOptions(formattedOptions);
                form.setFieldsValue({
                    gender: genders[0],
                    speciality: specialitiesOptions[0]
                })
            } catch (error) {
                console.error('Failed to fetch specialties', error);
            }
        };

        fetchSpecialties();
    }, []);

    useEffect(() => {
        if (specialitiesOptions.length > 0) {
            form.setFieldsValue({
                gender: genders[0],
                speciality: specialitiesOptions[0]
            });
        }
    }, [specialitiesOptions, form]);

    const genders = [
        {
            value: 'Male',
            label: 'Мужской'
        },
        {
            value: 'Female',
            label: 'Женский'
        }
    ];

    const disabledDate = (current: dayjs.ConfigType): boolean => {
        return dayjs(current).isAfter(dayjs(), 'day');
    };

    const submitForm = async (values: DoctorRegisterModel) => {
        if (values.birthday) {
            // @ts-ignore
            values.birthday = values.birthday.$d.toISOString();
        }
        values = processFormValues(values);
        console.log(values)
        try {
            const response = await registerDoctor({RegistrationValues : values});
            if (response) {
                notify('success', REGISTRATION_SUCCESSED)
                dispatch(setAuth(true));
                navigate(routes.root());
            }
        }
        catch (error) {
            notify('error', REGISTRATION_FAILED);
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
                <Form form={form} layout="vertical" name={"registrationForm"} onFinish={submitForm}>
                    <Flex className={"title-container"}>
                        <Title style={{fontWeight: 700}}>Регистрация</Title>
                    </Flex>
                    <Form.Item name={"name"} label={"Имя"} rules={validationRules.fullNameValidation()}>
                        <Input placeholder={"Иванов Иван Иванович"} className="input"/>
                    </Form.Item>
                    <Flex>
                        <Form.Item name={"gender"} label={"Пол"} className={styles.genderPickerItem} rules={validationRules.genderValidation()}>
                            <Select
                                placeholder={"Выберите пол"}
                                options={genders}
                                className="input"
                            />
                        </Form.Item>
                        <Form.Item name={"birthday"} label={"Дата рождения"} className={styles.datePickerItem}>
                            <DatePicker className={styles.datePicker} disabledDate={disabledDate} placeholder={"дд.мм.гггг"}/>
                        </Form.Item>
                    </Flex>
                    <Form.Item name={"phone"} label={"Номер телефона"} rules={validationRules.phoneValidation()}>
                        <Input placeholder={"+7 (xxx) xxx-xx-xx"} className="input"/>
                    </Form.Item>
                    <Form.Item name={"speciality"} label={"Специальность"} rules={validationRules.specialityValidation()}>
                        <Select
                            placeholder={"Выберите специальность"}
                            options={specialitiesOptions}
                            className="input"
                        />
                    </Form.Item>
                    <Form.Item name={"email"} label={"Эл. почта"} rules={validationRules.emailValidation()}>
                        <Input placeholder={"name@example.com"} className="input"/>
                    </Form.Item>
                    <Form.Item name={"password"} label={"Пароль"} rules={validationRules.passwordValidation()}>
                        <Input.Password className="input"/>
                    </Form.Item>
                    <Flex className={"button-container"}>
                        <Button type={'primary'} htmlType={'submit'} className={styles.button}>Зарегистрироваться</Button>
                    </Flex>
                </Form>
            </ConfigProvider>
        </Card>
    )
}

export default RegistrationForm;
