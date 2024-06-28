import {Flex, Typography} from "antd";
import skullSvg from '../../assets/svg/skull.svg';
import styles from './mainheaderlabel.module.css'

const { Text } = Typography;
const MainHeaderLabel: React.FC = () => {
    return (
        <Flex align="center">
            <img className={styles.icon} src={skullSvg} alt="skull"/>
            <Flex vertical className={styles.label}>
                <Text className={styles.text}>Try not to</Text>
                <Text className={`${styles.text} ${styles.strong}`}>DIE</Text>
            </Flex>
        </Flex>
    )
}

export default MainHeaderLabel;