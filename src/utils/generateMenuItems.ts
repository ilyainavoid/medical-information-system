import {ReactElement} from "react";

interface MenuItem {
    key: string;
    label: string | ReactElement;
    style?: React.CSSProperties;
    isDropdown?: boolean;
    isMain? : boolean;
}

interface MenuItems {
    leftMenuItems: MenuItem[];
    rightMenuItems: MenuItem[];
}
export const generateMenuItems = (isAuthorized: boolean): MenuItems => {
    const leftMenuItems: MenuItem[] = [
        {key: 'homepage', label: '', isMain: true},
    ];

    const rightMenuItems: MenuItem[] = [];

    if (isAuthorized) {
        leftMenuItems.push(
            {key: 'patients', label: 'Пациенты'},
            {key: 'consultations', label: 'Консультации'},
            {key: 'reportandstatistics', label: 'Отчеты и статистика'}
        )
        rightMenuItems.push(
            {key: 'profile', label: "", isDropdown: true, style: {marginLeft: "auto"}}
        );
    } else {
        rightMenuItems.push(
            {key: 'login', label: 'Вход', style: {marginLeft: "auto"}}
        );
    }

    return {leftMenuItems, rightMenuItems};
}