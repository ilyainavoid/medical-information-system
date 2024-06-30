import {Card, Flex, Typography} from "antd";
import styles from './patientcard.module.css'
import {PatientModel} from "../../interfaces/patient-model-interface.ts";

const {Text, Title} = Typography;

interface PatientCardProps {
    patient: PatientModel
}

const PatientCard: React.FC<PatientCardProps> = ({patient}) => {

    const formatDate = (inputDate: string | null | undefined): string => {
        if (!inputDate) {
            return '';
        }

        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    return (
        <Card className={styles.patientCard}>
            <Flex vertical>
                <Title level={3}>{patient.name}</Title>
                <Text><span style={{opacity: '0.5'}}>Пол —</span> {patient.gender}</Text>
                <Text><span style={{opacity: '0.5'}}>Дата рождения —</span> {formatDate(patient.birthday)}</Text>
            </Flex>
        </Card>
    )
}
export default PatientCard;