import {Button, DatePicker, Flex, Form, Input, Radio, Select, Switch, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import styles from './inspectioncreate.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer.ts";
import {ManOutlined, PlusOutlined, WomanOutlined} from "@ant-design/icons";
import React from "react";
import {formatDate} from "../../utils/formatDate.ts";
import {disabledDate} from "../../utils/disableDate.ts";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const {Title, Text} = Typography;

const CreateInspectionPage: React.FC = () => {
    const [form] = useForm();
    const patient = useSelector((state: RootState) => state.patient.patient);

    return (
        <Flex className={styles.mainContainer} vertical>
            <Title>Создание осмотра</Title>
            <Form form={form} layout={"vertical"}>
                <Flex className={styles.section} vertical>
                    <Flex align="center" justify="space-between" className={styles.topContent}>
                        <Flex align="center" justify="flex-start">
                            <Title level={2}>{patient?.name}</Title>
                            {patient?.gender === 'Male' ? <ManOutlined className={styles.genderSign}/> : <WomanOutlined className={styles.genderSign}/>}
                        </Flex>
                        <Text className={styles.birthday}>Дата рождения: {formatDate(patient?.birthday)}</Text>
                    </Flex>
                    <Form.Item name="isFirst" style={{width: '100%'}}>
                        <Flex align="center" justify="space-between" className={styles.switchFirstInspection}>
                            <Text>Первичный осмотр</Text>
                            <Switch></Switch>
                            <Text>Повторный осмотр</Text>
                        </Flex>
                    </Form.Item>
                    <Form.Item name="date">
                        <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                        />
                    </Form.Item>
                </Flex>
                <Flex className={styles.section} vertical>
                    <Title level={2} className={styles.heading}>Жалобы</Title>
                    <Form.Item>
                        <TextArea rows={4}></TextArea>
                    </Form.Item>
                </Flex>
                <Flex className={styles.section} vertical>
                    <Title level={2} className={styles.heading}>Анамнез заболевания</Title>
                    <Form.Item>
                        <TextArea rows={4}></TextArea>
                    </Form.Item>
                </Flex>
                <Flex className={styles.section} vertical>
                    <Title level={2} className={styles.heading}>Консультация</Title>
                    <Flex align="center" justify="space-between">
                        <Form.Item style={{width: "25%"}}>
                            <Flex align="center" style={{width: '100%'}} justify="flex-start">
                                <Switch></Switch>
                                <Text className={styles.needConsultationText}>Требуется консультация</Text>
                            </Flex>
                        </Form.Item>
                        <Form.Item style={{width: "75%"}}>
                            <Select className={styles.select} placeholder="Специализация консультанта"/>
                        </Form.Item>
                    </Flex>
                    <Form.Item name="comment" label="Комментарий">
                        <TextArea rows={4}></TextArea>
                    </Form.Item>
                </Flex>
                <Flex className={styles.section} vertical>
                    <Title level={2} className={styles.heading}>Диагнозы</Title>
                    <Title level={4}>(М42) Остеохондроз позвоночника</Title>
                    <Text>Тип в осмотре: основной</Text>
                    <Text>Расшифровка Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolorum ex expedita facere fuga harum hic in laudantium numquam odio, quae quisquam recusandae, sapiente tempore voluptas! Asperiores deserunt quasi quibusdam.</Text>
                    <Form.Item name="diseases" label="болезни">
                        <Select className={styles.select}></Select>
                    </Form.Item>
                    <Form.Item>
                        <Input className={styles.input}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Radio.Group size="large">
                            <Radio style={{marginRight: '5px'}}>Основной</Radio>
                            <Radio style={{marginRight: '5px'}}>Сопутствующий</Radio>
                            <Radio>Осложнение</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Button type="primary" className={styles.addDiagnosisButton} icon={<PlusOutlined/>}>Добавить диагноз</Button>
                </Flex>
                <Flex className={styles.section} vertical>
                    <Title level={2}>Рекомендации по лечению</Title>
                    <TextArea rows={4}></TextArea>
                </Flex>
                <Flex className={styles.section} vertical>
                    <Title level={2}>Заключение</Title>
                    <Flex style={{width: '70%'}} align="center" justify="space-between">
                        <Form.Item name="conclusion" label="Заключение" style={{width: "70%"}}>
                            <Select className={styles.select}></Select>
                        </Form.Item>
                        <Form.Item name="nextVisit" label="Дата следующего визита">
                            <DatePicker
                                style={{width: '100%', height: '40px'}}
                                format="YYYY-MM-DD HH:mm:ss"
                                disabledDate={disabledDate}
                                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                            />
                        </Form.Item>
                    </Flex>
                </Flex>
                <Flex align="center" justify="center">
                    <Button className={styles.finalButton} type={"primary"}>Сохранить осмотр</Button>
                    <Button className={styles.finalButton} type={"primary"} disabled>Отмена</Button>
                </Flex>
            </Form>
        </Flex>
    )
}

export default CreateInspectionPage;