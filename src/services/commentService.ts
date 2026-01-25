import { IUser } from "../models/index.js";
import { Comment } from "../comments/index.js";
import { ITask } from "../tasks/index.js";

export class CommentService {
  private users: IUser[];
  private tasks: ITask[];
  private comments: Comment[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
    this.comments = [];
  }

  addComment(taskId: number, userId: number, message: string) {
    this.comments.push(new Comment(taskId, userId, message));
  }

  getComments(taskId: number) {
    return this.comments.filter((c) => c.getTaskId() === taskId);
  }

  deleteComment(commentId: number) {
    const commentIndex = this.comments.findIndex(
      (c) => c.getId() === commentId,
    );
    if (commentIndex !== -1) this.comments.splice(commentIndex, 1);
  }
}
