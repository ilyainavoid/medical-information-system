import {Flex, Typography} from "antd";

const { Text } = Typography;
const MainHeaderLabel: React.FC = () => {
    return (
        <Flex>
            <img src="../../assets/svg/skull.svg" alt="skull"/>
            <Flex vertical className="label">
                <Text>Try not to</Text>
                <Text strong>DIE</Text>
            </Flex>
        </Flex>
    )
}

export default MainHeaderLabel;