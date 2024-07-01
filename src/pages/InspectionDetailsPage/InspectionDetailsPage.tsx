import {Flex, Typography} from "antd";
import styles from './inspectiondetailspage.module.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {InspectionModel} from "../../interfaces/inspection-model-interface.ts";
import {getInspection} from "../../api/inspection/getInspection.ts";
import {useNotification} from "../../components/NotificationProvider/NotificationProvider.tsx";
import {formatDate, formatDateTime} from "../../utils/formatDate.ts";
const {Title, Text}  = Typography;

const InspectionDetailsPage: React.FC = () => {
    const params = useParams();
    const [inspection, setInspection] = useState<InspectionModel>();
    const {notify} = useNotification();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.id) {
                    const response = await getInspection(params.id);
                    setInspection(response);
                }
            }
            catch (error) {
                notify('error', 'Произошла ошибка при получении информации об осмотре')
            }
        }

        fetchData();
    }, []);

    return (
        <Flex className={styles.mainContainer} vertical>
            <Flex className={styles.section} vertical>
                <Title level={1}>Амбулаторный осмотр от 06.06.2022 - 10:29</Title>
                <Title level={3}>Пациент: {inspection?.patient?.name}</Title>
                <Text>Пол: {inspection?.patient?.gender === 'Male' ? 'Мужской' : 'Женский'}</Text>
                <Text>Дата рождения: {formatDate(inspection?.patient?.birthday)}</Text>
                <Text>Медицинский работник: {inspection?.doctor?.name}</Text>
            </Flex>
            <Flex className={styles.section} vertical>
                <Title level={2}>Жалобы</Title>
                <Text>{inspection?.complaints}</Text>
            </Flex>
            <Flex className={styles.section} vertical>
                <Title level={2}>Анаинез заболевания</Title>
                <Text>{inspection?.anamnesis}</Text>
            </Flex>
            <Flex className={styles.section} vertical>
                <Title level={2}>Консультация</Title>
            </Flex>
            <Flex className={styles.section} vertical>
                <Title level={2}>Диагнозы</Title>
            </Flex>
            <Flex className={styles.section} vertical>
                <Title level={2}>Рекомендации по лечению</Title>
            </Flex>
            <Flex className={styles.section} vertical>
                <Title level={2}>Заключение</Title>
            </Flex>
        </Flex>
    );
}

export default InspectionDetailsPage;