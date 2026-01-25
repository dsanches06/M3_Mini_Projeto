import { UserClass } from "./../models/UserClass";
import { ITask } from "./../tasks/ITask";
import { Comment } from "../comments/Comment";

export class CommentService {
  private users: UserClass[];
  private tasks: ITask[];
  private comments: Comment[];
  private count: number;

  constructor(users: UserClass[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
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
