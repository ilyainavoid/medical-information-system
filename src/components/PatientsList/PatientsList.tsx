import {PatientModel} from "../../interfaces/patient-model-interface.ts";
import {Col, Row} from "antd";
import PatientCard from "../PatientCard/PatientCard.tsx";
import {routes} from "../../consts/routes.ts";
import {useNavigate} from "react-router-dom";
import styles from './patientslist.module.css'
import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {setPatient} from "../../store/actions/patientActions.ts";

interface PatientListProps {
    patientsList: PatientModel[] | undefined
}

const PatientsList: React.FC<PatientListProps> = ({patientsList}) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const onClick = (patient: any) => {
        navigate(routes.patient(patient.id));
        dispatch(setPatient(patient));
    }

    return (
        <Row gutter={[24, 0]}>
            {patientsList && patientsList.map((patient, index) => (
                <Col key={index} className={styles.pointer} xs={24} sm={24} md={24} lg={12}>
                    <PatientCard patient={patient} onClick={() => onClick(patient)}/>
                </Col>
            ))}
        </Row>
    )
}

export default PatientsList;