import {Dropdown, MenuProps, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {logoutDoctor} from "../../api/doctor/logoutDoctor.ts";
import {routes} from "../../consts/routes.ts";
import {DownOutlined} from "@ant-design/icons";

interface DropdownProfileProps {
    name?: string;
}

const DropdownProfile: React.FC<DropdownProfileProps> = ({name}) => {
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const response = await logoutDoctor();
            if (response && response.status === 200) {
                setTimeout(() => {
                    navigate(routes.login());
                }, 200);
            }
        }
        catch (error) {
            console.log("Logout failed", error)
        }
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Профиль',
            onClick: () => {
                navigate(routes.profile());
            },
        },
        {
            key: '2',
            danger: true,
            label: 'Выход',
            onClick: () => logout(),
        },
    ];

    const formatName = (name: string | undefined): string => {
        if (name) {
            if (name.length > 30) {
                const fullNameArray = name.split(' ');
                return `${fullNameArray[1]} ${fullNameArray[0]} ...`
            }
            return name;
        }
        return "Surname Name"
    }

    return (
        <Dropdown menu={{items}}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <DownOutlined/>
                    {formatName(name)}
                </Space>
            </a>
        </Dropdown>
    )
}

export default DropdownProfile;