export interface CommentModel {
    id: string;
    createTime: string;
    modifiedDate?: string;
    content: string;
    authorId: string;
    author: string;
    parentId?: string;
}