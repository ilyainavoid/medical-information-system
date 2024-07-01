import {Button, Card, Col, ConfigProvider, Flex, Form, Radio, Row, Select, SelectProps, Space} from "antd";
import React, {useEffect, useState} from "react";
import {useForm} from "antd/es/form/Form";
import styles from './medicalcardfilter.module.css'
import {useSearchParams} from "react-router-dom";
import {InspectionsListQuery} from "../../interfaces/inspections-list-query.ts";
import {icd10roots} from "../../consts/icd10roots.ts";
import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {setParams} from "../../store/actions/inspectionQueryActions.ts";

const MedicalCardFilter: React.FC = () => {
    const [form] = useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const [queryParams, setQueryParams] = useState<InspectionsListQuery>({
        size: Number(searchParams.get('size')) || 4,
        grouped: searchParams.get('grouped') === 'true',
        icdRoots: searchParams.getAll('icdRoots')
    });
    const dispatch: AppDispatch = useDispatch();

    const options = icd10roots.map(item => ({
        value: item.id,
        label: item.code,
        desc: item.name
    }));

    const sizeOptions = Array.from({length: 10}, (_, i) => ({
        value: i + 1,
        label: (i+1).toString()
    }))

    useEffect(() => {
        dispatch(setParams(queryParams));
        let selectedRoots = [];
        if (queryParams.icdRoots.length == 1) {
            const icdRootsArray = queryParams.icdRoots[0].split(',');
            selectedRoots = icdRootsArray.map(icdRoot => {
                const found = options.find(option => option.value === icdRoot);
                return found ? found : icdRoot
            })
        }

        form.setFieldsValue({
            icdRoots: selectedRoots,
            size: queryParams.size,
            grouped: queryParams.grouped ? 'grouped' : 'showAll'
        });
    }, [queryParams]);

    const onFinish = (values: any) => {
        values.grouped = values.grouped !== 'showAll';
        const filteredParams = Object.entries(values).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '' && value !== false && !(Array.isArray(value) && value.length === 0)) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);
        const params = new URLSearchParams(filteredParams).toString();
        setSearchParams(params);
    }

    return (
        <Card className={styles.panelCard}>
            <Flex vertical>
                <ConfigProvider
                    theme={{
                        components: {
                            Switch: {
                                handleSize: 26
                            },
                            Radio: {
                                radioSize: 26,
                                dotSize: 16
                            },
                        },
                        token: {
                            borderRadius: 4
                        },
                    }}
                >
                    <Form form={form} layout="vertical" name="filterSortingForm" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Flex align="center" justify="flex-start">
                                    <Form.Item name="icdRoots" label="МКБ-10" className={styles.selectItem}>
                                        <Select
                                            className="input"
                                            options={options}
                                            mode={"multiple"}
                                            optionRender={(option) => (
                                                <Space>
                                                    {option.data.desc}
                                                </Space>
                                            )}
                                        />
                                    </Form.Item>
                                </Flex>
                            </Col>
                            <Col span={12}>
                                <Flex align="end" className={styles.radioGroupContainer}>
                                    <Form.Item name="grouped">
                                        <Radio.Group size="large">
                                            <Radio value="grouped" style={{fontSize: '20px', marginRight: '5vw'}}>Сгруппировать по повторным</Radio>
                                            <Radio value="showAll" style={{fontSize: '20px'}}>Показать все</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Flex>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="size" label="Число осмотров на странице" className={styles.pageSize}>
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

export default MedicalCardFilter;
