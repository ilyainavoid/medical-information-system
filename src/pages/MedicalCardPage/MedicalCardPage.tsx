import {Button, Flex, Pagination, Typography} from "antd";
import styles from './medicalcard.module.css'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {ManOutlined, WomanOutlined} from "@ant-design/icons";
import MedicalCardFilter from "../../components/MedicalCardFilters/MedicalCardFilter.tsx";
import {getPatientCard} from "../../api/patient/getPatientCard.ts";
import {AppDispatch} from "../../store/store.ts";
import {setPatient} from "../../store/actions/patientActions.ts";
import {useNotification} from "../../components/NotificationProvider/NotificationProvider.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import InspectionsList from "../../components/InspectionsList/InspectionsList.tsx";
import InspectionsTree from "../../components/InspectionsTree/InspectionsTree.tsx";
import {InspectionQueryParamsFull} from "../../interfaces/inspection-query-params-full.ts";
import {InspectionPagedListModel} from "../../interfaces/inspection-paged-list-model-interface.ts";
import {InspectionPreviewModel} from "../../interfaces/inspection-preview-model-interface.ts";
import {getPatientInspectionList} from "../../api/patient/getPatientInspectionList.ts";
import {routes} from "../../consts/routes.ts";

const {Title, Text} = Typography;

const MedicalCardPage: React.FC = () => {
    const patient = useSelector((state: RootState) => state.patient.patient);
    const dispatch: AppDispatch = useDispatch();
    const {notify} = useNotification();
    const [total, setTotal] = useState(1);
    const params = useParams();
    const [current, setCurrent] = useState<number>(1);
    const [inspectionsListPaged, setInspectionsListPaged] = useState<InspectionPagedListModel>();
    const [inspectionsList, setInspectionsList] = useState<InspectionPreviewModel[]>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useState<InspectionQueryParamsFull>({
        size: Number(searchParams.get('size')) || 4,
        grouped: searchParams.get('grouped') === 'true',
        icdRoots: searchParams.getAll('icdRoots'),
        page: Number(searchParams.get('page') || 1)
    });

    useEffect(() => {
        const fetchData = async (id: string | undefined) => {
            try {
                if (id) {
                    const response = await getPatientCard(id);
                    dispatch(setPatient(response));
                }
            }
            catch (error) {
                notify('error', 'Не удалось получить медицинскую карту пациента!');
            }
        }

        if (patient === null) {
            fetchData(params.id);
        }
    }, []);

    useEffect(() => {
        setQueryParams({
            size: Number(searchParams.get('size')) || 4,
            grouped: searchParams.get('grouped') === 'true',
            icdRoots: searchParams.getAll('icdRoots'),
            page: Number(searchParams.get('page') || 1)
        })
    }, [searchParams]);

    const prepareQuery = (queryParams: InspectionQueryParamsFull): Partial<InspectionQueryParamsFull> => {
        const updatedQueryParams: Partial<InspectionQueryParamsFull> = { ...queryParams };

        if (updatedQueryParams.grouped === false) {
            delete updatedQueryParams.grouped;
        }

        if (updatedQueryParams.icdRoots && updatedQueryParams.icdRoots.length === 0) {
            delete updatedQueryParams.icdRoots;
        }

        if (updatedQueryParams.icdRoots && updatedQueryParams.icdRoots.length === 1) {
            updatedQueryParams.icdRoots = updatedQueryParams.icdRoots[0].split(',');
        }

        return updatedQueryParams;
    }

    useEffect(() => {
        const searchParams = prepareQuery(queryParams);
        const fetchData = async () => {
            try {
                if (params.id) {
                    const response = await getPatientInspectionList({SearchParams: searchParams, id: params.id});
                    setInspectionsListPaged(response);
                }
            } catch (error) {
                notify('error', 'Произошла ошибка при получении списка осмотров')
            }
        }

        fetchData();
    }, [queryParams]);

    useEffect(() => {
        if (inspectionsListPaged?.pagination) {
            setCurrent(inspectionsListPaged.pagination.current);
            setTotal(inspectionsListPaged.pagination.count * inspectionsListPaged.pagination.size)
        }
        if (inspectionsListPaged?.inspections) {
            setInspectionsList(inspectionsListPaged.inspections);
        }
    }, [inspectionsListPaged]);

    const onPaginationChange = (page: number) => {
        setCurrent(page);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', page.toString());
            return newParams;
        });
        setQueryParams(prev => ({...prev, page}));
    };

    const handleMainCreateButtonClick = () => {
        navigate(routes.inspectionCreate())
    }

    return (
        <Flex className={styles.mainContainer} vertical>
            <Flex className={styles.topContent} align="center" justify="space-between">
                <Flex vertical>
                    <Title className={styles.heading}>Медицинская карта пациента</Title>
                    <Flex align="center" justify="flex-start">
                        <Title level={2}>{patient?.name}</Title>
                        {patient?.gender === 'Male' ? <ManOutlined className={styles.genderSign}/> : <WomanOutlined className={styles.genderSign}/>}
                    </Flex>
                </Flex>
                <Flex vertical>
                    <Button type={'primary'} className={styles.addInspection} onClick={handleMainCreateButtonClick}>
                        Добавить осмотр
                    </Button>
                    <Text className={styles.birthday}>Дата рождения: {formatDate(patient?.birthday)}</Text>
                </Flex>
            </Flex>
            <MedicalCardFilter/>
            {queryParams?.grouped ? <InspectionsTree inspections={inspectionsList ? inspectionsList : []}/> : <InspectionsList inspectionList={inspectionsList}/>}
            <Pagination showSizeChanger={false} pageSize={queryParams.size} current={current}
                        style={{margin: '0 auto', padding: '20px'}} onChange={onPaginationChange} total={total}/>
        </Flex>
    )
}

export default MedicalCardPage;