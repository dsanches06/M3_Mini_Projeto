import BaseEntity from "../models/BaseEntity";

export default class Comment extends BaseEntity {
  private taskId: number;
  private userId: number;
  private message: string;

  constructor(id: number, taskId: number, userId: number, message: string) {
    super(id);
    this.taskId = taskId;
    this.userId = userId;
    this.message = message;
  }

  getId(): number {
    return super.getId();
  }

  getTaskId(): number {
    return this.taskId;
  }
  getUserId(): number {
    return this.userId;
  }
  getMessage(): string {
    return this.message;
  }
  getCreatedAt(): Date {
    return super.getCreatedAt();
  }
}
