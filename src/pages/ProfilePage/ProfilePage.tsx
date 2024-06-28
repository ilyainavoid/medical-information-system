import {Flex} from "antd";
import ProfileForm from "../../components/ProfileForm/ProfileForm.tsx";

const ProfilePage: React.FC = () => {
    return (
        <Flex className="container">
            <ProfileForm/>
        </Flex>
    )
}

export default ProfilePage;