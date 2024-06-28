import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.tsx";
import {Flex} from "antd";

const RegistrationPage: React.FC = () => {
    return (
        <Flex className="container">
            <RegistrationForm/>
        </Flex>
    )
}

export default RegistrationPage;