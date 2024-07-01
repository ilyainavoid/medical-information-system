import {Card, Flex, Typography} from "antd";
import styles from './patientcard.module.css'
import {PatientModel} from "../../interfaces/patient-model-interface.ts";
import {formatDate} from "../../utils/formatDate.ts";

const {Text, Title} = Typography;

interface PatientCardProps {
    patient: PatientModel,
    onClick: (patient: any) => void
}

const PatientCard: React.FC<PatientCardProps> = ({patient, onClick}) => {

    return (
        <Card className={styles.patientCard} onClick={onClick}>
            <Flex vertical>
                <Title level={3}>{patient.name}</Title>
                <Text><span style={{opacity: '0.5'}}>Пол —</span> {patient.gender}</Text>
                <Text><span style={{opacity: '0.5'}}>Дата рождения —</span> {formatDate(patient.birthday)}</Text>
            </Flex>
        </Card>
    )
}
export default PatientCard;