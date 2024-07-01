import {InspectionCommentModel} from "../../interfaces/inspection-comment-model-interface.ts";
import {Flex, Typography} from "antd";

const {Title} = Typography;

interface CommentCardProps {
    comment: InspectionCommentModel;
    isRoot: boolean;
    childrenCount?: number;
}
const CommentCard: React.FC<CommentCardProps> = ({comment}) => {

    return(
        <Flex>
            <Title level={5}></Title>
        </Flex>
    )
}

export default CommentCard