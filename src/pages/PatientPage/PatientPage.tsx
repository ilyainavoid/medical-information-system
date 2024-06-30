import {Button, ConfigProvider, DatePicker, Flex, Form, Input, Modal, Pagination, Select, Typography} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import styles from './patientpage.module.css'
import FilterAndSortingPatientsPanel
    from "../../components/FilterAndSortingPatientsPanel/FilterAndSortingPatientsPanel.tsx";
import PatientsList from "../../components/PatientsList/PatientsList.tsx";
import React, {useEffect, useState} from "react";
import {PatientPagedListModel} from "../../interfaces/patient-paged-list-model-interface.ts";
import {useSearchParams} from "react-router-dom";
import {QueryParamsPaged} from "../../interfaces/patient-query-params.ts";
import {ConclusionType} from "../../enums/conclusion-type.ts";
import {PatientSorting} from "../../enums/patient-sorting.ts";
import {getPatientsList} from "../../api/patient/getPatientsList.ts";
import {useNotification} from "../../components/NotificationProvider/NotificationProvider.tsx";
import {PatientModel} from "../../interfaces/patient-model-interface.ts";
import {useForm} from "antd/es/form/Form";
import {validationRules} from "../../consts/validationRules.ts";
import dayjs from "dayjs";
import {createPatient} from "../../api/patient/createPatient.ts";

const {Title} = Typography;

const PatientPage: React.FC = () => {

    const [patientsListPaged, setPatientsListPaged] = useState<PatientPagedListModel>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(1);
    const [patientsList, setPatientsList] = useState<PatientModel[]>();
    const {notify} = useNotification();
    const [visible, setVisible] = useState<boolean>(false);
    const [form] = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [queryParams, setQueryParams] = useState<QueryParamsPaged>({
        size: Number(searchParams.get('size')) || 4,
        name: searchParams.get('name') || '',
        conclusions: searchParams.getAll('conclusions') as ConclusionType[],
        scheduleVisits: searchParams.get('scheduleVisits') === 'true',
        onlyMine: searchParams.get('onlyMine') === 'true',
        sorting: searchParams.get('sorting') as PatientSorting,
        page: Number(searchParams.get('page') || 1)
    });

    useEffect(() => {
        setQueryParams({
            size: Number(searchParams.get('size')) || 4,
            name: searchParams.get('name') || '',
            conclusions: searchParams.getAll('conclusions') as ConclusionType[],
            scheduleVisits: searchParams.get('scheduleVisits') === 'true',
            onlyMine: searchParams.get('onlyMine') === 'true',
            sorting: searchParams.get('sorting') as PatientSorting,
            page: Number(searchParams.get('page') || 1)
        })
    }, [searchParams]);

    const onPaginationChange = (page: number) => {
        setCurrent(page);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', page.toString());
            return newParams;
        });
        setQueryParams(prev => ({...prev, page}));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPatientsList({SearchParams: queryParams});
                setPatientsListPaged(response);
            } catch {
                notify('error', 'Произошла ошибка при получении списка пациентов')
            }
        }

        fetchData();
    }, [queryParams]);

    useEffect(() => {
        if (patientsListPaged) {
            setCurrent(patientsListPaged.pagination.current);
            setTotal(patientsListPaged.pagination.count * patientsListPaged.pagination.size)
        }
        if (patientsListPaged?.patients) {
            setPatientsList(patientsListPaged.patients);
        }
    }, [patientsListPaged]);

    const onFinish = async (values: any) => {
        setLoading(true);
        if (values.birthday) {
            values.birthday = values.birthday.$d.toISOString();
        }
        if (values.gender) {
            values.gender = (values.gender === 'Мужской' || values.gender === 'Male') ? 'Male' : 'Female';
        }

        try {
            await createPatient({CreateValues: values});
            notify('success', 'Пациент успешно зарегистрирован');
            setVisible(false);
            setLoading(false);
        }
        catch (error) {
            notify('error', 'Возникла ошибка при регистрации пациента');
            setVisible(false);
            setLoading(false);
        }
    }

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

    const handleCreatePatientButton = () => {
        setVisible(true);
        form.setFieldsValue({
            gender: 'Мужской'
        })
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        borderRadius: 4
                    },
                    components: {
                        Modal: {
                            contentBg: '#f8f4fc'
                        },
                    },
                }}
            >
                <Flex vertical className={styles.mainContainer}>
                    <Flex className={styles.headingAndCreateButtonContainer} align="center" justify="space-between">
                        <Title className={styles.heading}>Пациенты</Title>
                        <Button type={'primary'} icon={<UserAddOutlined/>} onClick={handleCreatePatientButton} className={styles.createPatientButton}>Регистрация
                            нового пациента</Button>
                    </Flex>
                    <FilterAndSortingPatientsPanel/>
                    <PatientsList patientsList={patientsList}/>
                    <Pagination showSizeChanger={false} pageSize={queryParams.size} current={current}
                                style={{margin: '0 auto', padding: '20px'}} onChange={onPaginationChange} total={total}/>
                </Flex>
                <Modal width={700} footer={null} open={visible} onCancel={() => setVisible(false)}>
                    <Flex vertical className={styles.modalContainer}>
                        <Form form={form} layout="vertical" name={"CreatePatient"} onFinish={onFinish}>
                            <Title>Регистрация пациента</Title>
                            <Form.Item name="name" label="ФИО" rules={validationRules.fullNameValidation()}>
                                <Input className={styles.input}></Input>
                            </Form.Item>
                            <Flex align="center" justify="space-between">
                                <Form.Item className={styles.genderContainer} name="gender" label="Пол" rules={validationRules.genderValidation()}>
                                    <Select className={styles.genderPicker} options={genders}></Select>
                                </Form.Item>
                                <Form.Item className={styles.datepickerContainer} name="birthday" label="Дата рождения">
                                    <DatePicker className={styles.datePicker} disabledDate={disabledDate} placeholder="дд.мм.гггг"></DatePicker>
                                </Form.Item>
                            </Flex>
                            <Button type={'primary'} htmlType={'submit'} loading={loading} className={styles.button}>Зарегистрировать</Button>
                        </Form>
                    </Flex>
                </Modal>
            </ConfigProvider>
        </>
    )
}

export default PatientPage;