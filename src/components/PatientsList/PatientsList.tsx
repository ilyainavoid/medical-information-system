import {PatientModel} from "../../interfaces/patient-model-interface.ts";
import {Col, Row} from "antd";
import PatientCard from "../PatientCard/PatientCard.tsx";

interface PatientListProps {
    patientsList: PatientModel[] | undefined
}

const PatientsList: React.FC<PatientListProps> = ({patientsList}) => {
    return (
        <Row gutter={[24, 0]}>
            {patientsList && patientsList.map((patient, index) => (
                <Col key={index} xs={24} sm={24} md={24} lg={12}>
                    <PatientCard patient={patient}/>
                </Col>
            ))}
        </Row>
    )
}

export default PatientsList;