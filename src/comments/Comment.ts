export class Comment {
  private id: number;
  private taskId: number;
  private userId: number;
  private message: string;
  private createdAt: Date;

  constructor(id: number, taskId: number, userId: number, message: string) {
    this.id = id;
    this.taskId = taskId;
    this.userId = userId;
    this.message = message;
    this.createdAt = new Date();
  }

  getId(): number {
    return this.id;
  }
  getTaskId(): number {
    return this.taskId;
  }
  getUserId(): number {
    return this.userId;
  }
}
