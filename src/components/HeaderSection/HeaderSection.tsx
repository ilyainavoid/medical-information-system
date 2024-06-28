import { Layout, Menu} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer.ts";
import {AppDispatch} from "../../store/store.ts";
import {generateMenuItems} from "../../utils/generateMenuItems.ts";
import {useEffect} from "react";
import {getDoctorProfile} from "../../api/doctor/getDoctorProfile.ts";
import {setProfile} from "../../store/actions/profileActions.ts";
import {useLocation, useNavigate} from "react-router-dom";
import MainHeaderLabel from "../MainHeaderLabel/MainHeaderLabel.tsx";
import DropdownProfile from "../DropdownProfile/DropdownProfile.tsx";
import {menuRoutes} from "../../consts/menuRoutes.ts";
import styles from './headersection.module.css'

const {Header} = Layout;

const HeaderSection: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuth);
    const location = useLocation();
    const navigate = useNavigate();
    const profile = useSelector((state: RootState) => state.profile.profile);

    const {leftMenuItems, rightMenuItems} = generateMenuItems(isAuthorized);

    useEffect(() => {
        const fetchData = async () => {
            const profileInfo = await getDoctorProfile();
            dispatch(setProfile(profileInfo));
        };

        if (isAuthorized) {
            fetchData();
        }
    }, [location, dispatch, isAuthorized]);

    const pathToKey: { [path: string]: string } = Object.keys(menuRoutes).reduce((acc, key) => {
        const path = menuRoutes[key];
        acc[path] = key;
        return acc;
    }, {} as { [path: string]: string });

    const currentKey = pathToKey[location.pathname];

    const handleMenuClick = (e: { key: string }) => {
        const path = menuRoutes[e.key]
        navigate(path)
    }

    const transformedLeftMenuItems = leftMenuItems.map(item => {
        if (item.isMain) {
            return {
                key: item.key,
                label: <MainHeaderLabel/>,
                style: item.style,
            }
        }
        return {
            key: item.key,
            label: item.label,
            style: item.style,
        };
    });

    const transformedRightMenuItems = rightMenuItems.map(item => {
        if (item.isDropdown) {
            return {
                key: item.key,
                label: <DropdownProfile name={profile?.name}/>,
                style: item.style,
            }
        }
        return {
            key: item.key,
            label: item.label,
            style: item.style,
        }
    })


    return (
        <Header className={styles.layoutHeader}>
            <Menu
                className={styles.menu}
                theme="dark"
                mode="horizontal"
                selectedKeys={[currentKey]}
                items={transformedLeftMenuItems}
                onClick={handleMenuClick}
                style={{width: "50%", paddingLeft: '3vw'}}
            />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[currentKey]}
                items={transformedRightMenuItems}
                onClick={handleMenuClick}
                style={{width: "50%", paddingRight: '3vw'}}
            />
        </Header>
    )
}

export default HeaderSection;