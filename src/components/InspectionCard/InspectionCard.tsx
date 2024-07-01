import {InspectionPreviewModel} from "../../interfaces/inspection-preview-model-interface.ts";
import {Button, Card, Col, ConfigProvider, Flex, Row, Typography} from "antd";
import styles from './inspectioncard.module.css';
import {EditOutlined, SearchOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;

interface InspectionCardProps {
    inspection: InspectionPreviewModel;
    onClick: (inspection: any) => void
}


const InspectionCard: React.FC<InspectionCardProps> = ({inspection, onClick}) => {

    let cardStyles = styles.inspectionCard
    const getConclusion = (conclusionType: string): string => {
        switch (conclusionType) {
            case 'Disease':
                return 'Болезнь'
            case 'Death':
                return 'Смерть'
            case 'Recovery':
                return 'Выздоровление'
            default:
                return '';
        }
    }

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
                <Flex vertical>
                    <Row>
                        <Col span={12}>
                            <Flex vertical>
                                <Title level={4} className={styles.title}>
                                    <Text className={styles.date}>25.06.2022</Text>
                                    Амбулаторный осмотр
                                </Title>
                                <Text>Заключение: <b>{getConclusion(inspection.conclusion)}</b></Text>
                                <Text>Основной диагноз: <b>{inspection.diagnosis.name} ({inspection.diagnosis.code})</b></Text>
                                <Text style={{opacity: '0.5'}}>Медициский работник: {inspection.doctor}</Text>
                            </Flex>
                        </Col>
                        <Col span={12}>
                            <Flex align="center" justify="center" className={styles.buttonContainer}>
                                {!inspection.hasNested ? <Button className={styles.button} icon={<EditOutlined/>}>Добавить осмотр</Button> : <></>}
                                <Button className={styles.button} icon={<SearchOutlined/>}>Детали осмотра</Button>
                            </Flex>
                        </Col>
                    </Row>
                </Flex>
            </Card>
        </ConfigProvider>
    )
}

export default InspectionCard