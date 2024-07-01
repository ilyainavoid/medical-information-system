import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ConfigProvider, Row, Tree, Typography } from 'antd';
import { InspectionPreviewModel } from "../../interfaces/inspection-preview-model-interface.ts";
import { EditOutlined, MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from '../../components/InspectionCard/inspectioncard.module.css';
import { getConclusion } from "../../utils/getConclusion.ts";
import { getInspectionsChain } from "../../api/inspection/getInspectionsChain.ts";
import { useNotification } from "../NotificationProvider/NotificationProvider.tsx";
import { useNavigate } from "react-router-dom";
import { routes } from "../../consts/routes.ts";

const { TreeNode } = Tree;
const { Title, Text } = Typography;

interface CustomTreeNodeProps {
    inspection: InspectionPreviewModel;
    onClick: () => void;
}

const CustomTreeNode: React.FC<CustomTreeNodeProps> = ({ inspection, onClick }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [children, setChildren] = useState<InspectionPreviewModel[]>([]);
    const { notify } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChildren = async () => {
            if (inspection.hasChain && expanded) {
                try {
                    const response = await getInspectionsChain(inspection.id);
                    setChildren(response);
                } catch (error) {
                    notify('error', `Не удалось получить дочерние элементы осмотра с id=${inspection.id}`);
                }
            }
        };

        fetchChildren();
    }, [inspection.id, inspection.hasChain, expanded]);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const moveTo = (id: string) => {
        navigate(routes.inspection(id));
    };

    let cardStyles = styles.inspectionCard;
    if (inspection.conclusion === 'Death') {
        cardStyles = styles.death;
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        contentFontSize: 16,
                        defaultColor: "#5454f5",
                        defaultBg: "none",
                        defaultBorderColor: "none",
                        defaultHoverBg: "none",
                        defaultShadow: '0'
                    },
                },
            }}
        >
            <Card className={cardStyles} onClick={onClick}>
                <Row>
                    <Col span={6} style={{ textAlign: 'right' }}>
                        <Button icon={inspection.hasNested ? (expanded ? <MinusOutlined /> : <PlusOutlined />) : <></>} onClick={handleToggle} />
                    </Col>
                    <Col span={18}>
                        <Title level={4} className={styles.title}>
                            <Text className={styles.date}>25.06.2022</Text>
                            Амбулаторный осмотр
                        </Title>
                        <Text>Заключение: <b>{getConclusion(inspection.conclusion)}</b></Text>
                        <Text>Основной диагноз: <b>{inspection.diagnosis.name} ({inspection.diagnosis.code})</b></Text>
                        <Text style={{opacity: '0.5'}}>Медицинский работник: {inspection.doctor}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        {!inspection.hasNested ? (
                            <Button icon={<EditOutlined />}>Добавить осмотр</Button>
                        ) : null}
                        <Button icon={<SearchOutlined />}>Детали осмотра</Button>
                    </Col>
                </Row>
            </Card>
            {expanded && children.length > 0 && (
                <Tree>
                    {children.map((child) => (
                        <TreeNode
                            title={<CustomTreeNode inspection={child} onClick={() => moveTo(child.id)} />}
                            key={child.id}
                        />
                    ))}
                </Tree>
            )}
        </ConfigProvider>
    );
};

export default CustomTreeNode;
