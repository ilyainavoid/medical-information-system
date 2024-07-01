import {Button, Card, ConfigProvider, DatePicker, Flex, Form, Input, Select, Typography} from "antd";
import {validationRules} from "../../consts/validationRules.ts";
import styles from "../RegistrationForm/registrationform.module.css";
import {useForm} from "antd/es/form/Form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer.ts";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import isEqual from 'lodash.isequal';
import {FormValues} from "../../interfaces/form-values.ts";
import {DoctorEditModel} from "../../interfaces/doctor-edit-model-interface.ts";
import {editDoctorProfile} from "../../api/doctor/editDoctorProfile.ts";
import {AppDispatch} from "../../store/store.ts";
import {useNotification} from "../NotificationProvider/NotificationProvider.tsx";
import {updateProfile} from "../../store/actions/profileActions.ts";
import {disabledDate} from "../../utils/disableDate.ts";

dayjs.extend(utc);

const {Title} = Typography;

const ProfileForm: React.FC = () => {
    const [form] = useForm()
    const profile = useSelector((state: RootState) => state.profile.profile);
    const [isOriginal, setIsOriginal] = useState<boolean>(true);
    const [initialValues, setInitialValues] = useState<FormValues>();
    const dispatch: AppDispatch = useDispatch();
    const {notify} = useNotification();
    const [loading, setLoading] = useState<boolean>(false);

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

    useEffect(() => {
        if (profile) {
            const gender = profile.gender === 'Male' ? 'Мужской' : 'Женский';
            const birthday = profile.birthday === null ? null : dayjs.utc(profile.birthday).local();
            const phone = profile.phone === null ? '' : profile.phone;

            let birthdayForInititalValues;
            if (birthday !== null) {
                birthdayForInititalValues = birthday.$d.toISOString()
            }

            const initialValues = {
                name: profile.name,
                email: profile.email,
                // @ts-ignore
                birthday: birthdayForInititalValues,
                gender: gender,
                phone: phone
            }

            // @ts-ignore
            setInitialValues(initialValues);

            form.setFieldsValue({
                name: profile.name,
                email: profile.email,
                gender: gender,
                phone: phone,
                birthday: birthday
            })
        }
    }, [profile]);

    const onValuesChange = (_: Partial<FormValues>, allValues: FormValues) => {
        allValues.gender = (allValues.gender === 'Male' || allValues.gender === 'Мужской') ? 'Мужской' : 'Женский';
        if (allValues.birthday !== null) {
            allValues.birthday = allValues.birthday.$d.toISOString();
        }
        if (isEqual(allValues, initialValues)) {
            setIsOriginal(true);
        } else {
            setIsOriginal(false);
        }
    };

    const submitForm = async (values: DoctorEditModel) => {
        if (values.birthday !== null) {
            values.birthday = values.birthday.$d.toISOString();
        }
        // @ts-ignore
        values.gender = (values.gender === 'Male' || values.gender === 'Мужской') ? 'Male' : 'Female';
        console.log(values);
        setLoading(true);
        try {
            const response = await editDoctorProfile({newProfileData: values});
            if (response) {
                notify('success', 'Данные обновлены успешно')
            }
            dispatch(updateProfile(values));
            setLoading(false);
            setIsOriginal(true);
        }
        catch (error) {
            notify('error', 'Произошла ошибка при обновлении данных пользователя');
            setLoading(false);
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
                <Form form={form} layout="vertical" name={"profileForm"} onValuesChange={onValuesChange} onFinish={submitForm}>
                    <Flex className={"title-container"}>
                        <Title style={{fontWeight: 700}}>Профиль</Title>
                    </Flex>
                    <Form.Item name={"name"} label={"Имя"} rules={validationRules.fullNameValidation()}>
                        <Input placeholder={"Иванов Иван Иванович"} className="input"/>
                    </Form.Item>
                    <Flex>
                        <Form.Item name={"gender"} label={"Пол"} className={styles.genderPickerItem} rules={validationRules.genderValidation()}>
                            <Select
                                placeholder={"Выберите пол"}
                                className="input"
                                options={genders}
                            />
                        </Form.Item>
                        <Form.Item name={"birthday"} label={"Дата рождения"} className={styles.datePickerItem}>
                            <DatePicker className={styles.datePicker} disabledDate={disabledDate} placeholder={"дд.мм.гггг"}/>
                        </Form.Item>
                    </Flex>
                    <Form.Item name={"phone"} label={"Номер телефона"} rules={validationRules.phoneValidation()}>
                        <Input placeholder={"+7 (xxx) xxx-xx-xx"} className="input"/>
                    </Form.Item>
                    <Form.Item name={"email"} label={"Эл. почта"} rules={validationRules.emailValidation()}>
                        <Input placeholder={"name@example.com"} className="input"/>
                    </Form.Item>
                    <Flex className={"button-container"}>
                        <Button type={'primary'} htmlType={'submit'} loading={loading} disabled={isOriginal} className={styles.button}>Сохранить изменения</Button>
                    </Flex>
                </Form>
            </ConfigProvider>
        </Card>
    )
}

export default ProfileForm