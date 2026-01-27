import Comment from "../comments/Comment.js";
export default class CommentService {
    constructor() {
        this.comments = [];
        this.count = 0;
    }
    addComment(taskId, userId, message) {
        this.comments.push(new Comment((this.count += 1), taskId, userId, message));
    }
    getComments(taskId) {
        return this.comments.filter((c) => c.getTaskId() === taskId);
    }
    deleteComment(commentId) {
        const commentIndex = this.comments.findIndex((c) => c.getId() === commentId);
        if (commentIndex !== -1) {
            this.comments.splice(commentIndex, 1);
        }
    }
}
