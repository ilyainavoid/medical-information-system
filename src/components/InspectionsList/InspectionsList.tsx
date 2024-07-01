import {Col, Row} from "antd";
import React from "react";
import {InspectionPreviewModel} from "../../interfaces/inspection-preview-model-interface.ts";
import {useNavigate} from "react-router-dom";
import {routes} from "../../consts/routes.ts";
import InspectionCard from "../InspectionCard/InspectionCard.tsx";
import styles from './inspectionslist.module.css';

interface InspectionListProps {
    inspectionList: InspectionPreviewModel[] | undefined;
}

const InspectionsList: React.FC<InspectionListProps> = ({ inspectionList }) => {
    const navigate = useNavigate();
    const onClick = (inspection: any) => {
        navigate(routes.inspection(inspection.id));
    }

    return (
        <Row gutter={[24, 0]}>
            {inspectionList && inspectionList.map((inspection, index) => (
                <Col key={index} className={styles.pointer} xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                    <InspectionCard inspection={inspection} onClick={() => onClick(inspection)}/>
                </Col>
            ))}
        </Row>
    )
}

export default InspectionsList;
