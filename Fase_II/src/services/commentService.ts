import Comment from "../comments/Comment.js";

export default class CommentService {
  private comments: Comment[];
  private count: number;

  constructor() {
    this.comments = [];
    this.count = 0;
  }

  addComment(taskId: number, userId: number, message: string) {
    this.comments.push(new Comment((this.count += 1), taskId, userId, message));
  }

  getComments(taskId: number) {
    return this.comments.filter((c) => c.getTaskId() === taskId);
  }

  deleteComment(commentId: number) {
    const commentIndex = this.comments.findIndex(
      (c) => c.getId() === commentId,
    );
    if (commentIndex !== -1) {
      this.comments.splice(commentIndex, 1);
    }
  }
}
