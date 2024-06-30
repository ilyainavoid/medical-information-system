import {Button, Card, Col, ConfigProvider, Flex, Form, Input, Row, Select, Switch, Typography} from "antd";
import styles from './filterandsortingpatientspanel.module.css';
import React, {useEffect, useState} from "react";
import {useForm} from "antd/es/form/Form";
import {useSearchParams} from "react-router-dom";
import {PatientSorting} from "../../enums/patient-sorting.ts";
import {ConclusionType} from "../../enums/conclusion-type.ts";
import {QueryParams} from "../../interfaces/patient-query-params.ts";

const {Title, Text} = Typography;
const FilterAndSortingPatientsPanel: React.FC = () => {
    const [form] = useForm();
    const [searchParams, setSearchParams] = useSearchParams();

    const patientSorting = [
        {value: 'NameAsc', label: 'По имени (А-Я)'},
        {value: 'NameDesc', label: 'По имени (Я-А)'},
        {value: 'CreateAsc', label: 'По дате создания (сначала старые)'},
        {value: 'CreateDesc', label: 'По дате создания (сначала новые)'},
        {value: 'InspectionAsc', label: 'По дате осмотра (сначала старые)'},
        {value: 'InspectionDesc', label: 'По дате осмотра (сначала новые)'},
    ]

    const conclusions = [
        {
            value: 'Disease',
            label: 'Болезнь'
        },
        {
            value: 'Recovery',
            label: 'Выздоровление'
        },
        {
            value: 'Death',
            label: 'Смерть'
        },
    ]

    const sizeOptions = Array.from({length: 10}, (_, i) => ({
        value: i + 1,
        label: (i+1).toString()
    }))

    const [queryParams, setQueryParams] = useState<QueryParams>({
        size: Number(searchParams.get('size')) || 4,
        name: searchParams.get('name') || '',
        conclusions: searchParams.getAll('conclusions') as ConclusionType[],
        scheduleVisits: searchParams.get('scheduleVisits') === 'true',
        onlyMine: searchParams.get('onlyMine') === 'true',
        sorting: searchParams.get('sorting') as PatientSorting,
    });

    useEffect(() => {
        form.setFieldsValue({
            name: queryParams.name,
            conclusions: queryParams.conclusions,
            scheduleVisits: queryParams.scheduleVisits,
            onlyMine: queryParams.onlyMine,
            sorting: queryParams.sorting,
            size: queryParams.size,
        })
    }, [queryParams]);

    const submitSearch = (values: any) => {
        setQueryParams(values);
        const filteredParams = Object.entries(values).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '' && value !== false && !(Array.isArray(value) && value.length === 0)) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);
        const params = new URLSearchParams(filteredParams).toString();
        setSearchParams(params);
    };

    return (
        <Card className={styles.panelCard}>
            <Flex vertical>
                <ConfigProvider
                    theme={{
                        components: {
                            Switch: {
                               handleSize: 26
                            },
                        },
                        token: {
                            borderRadius: 4
                        },
                    }}
                >
                    <Form form={form} layout="vertical" name="filterSortingForm" onFinish={submitSearch}>
                        <Title level={2}>Фильтры и сортировка</Title>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="name" label="Имя">
                                    <Input className="input"></Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="conclusions" label="Имеющиеся заключения">
                                    <Select className="input" mode={"multiple"} options={conclusions}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Flex align="center" justify="flex-start">
                                    <Form.Item name="scheduleVisits" label=" ">
                                        <Switch className={styles.switch}></Switch>
                                    </Form.Item>
                                    <Text className={styles.switchText}>Есть запланированные визиты</Text>
                                </Flex>
                            </Col>
                            <Col span={8}>
                                <Flex align="center" justify="flex-start">
                                    <Form.Item name="onlyMine" label=" ">
                                        <Switch className={styles.switch}></Switch>
                                    </Form.Item>
                                    <Text className={styles.switchText}>Мои пациенты</Text>
                                </Flex>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="sorting" label="Сортировка пациентов">
                                    <Select className="input" options={patientSorting}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="size" label="Число пациентов на странице" className={styles.size}>
                                    <Select className="input" options={sizeOptions}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Flex justify="flex-end" align="center">
                                    <Button type={'primary'} htmlType={'submit'} className={styles.button}>Поиск</Button>
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </ConfigProvider>
            </Flex>
        </Card>
    )
}
export default FilterAndSortingPatientsPanel;