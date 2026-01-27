import ITask from "./ITask.js";
import { TaskStatus } from "./TaskStatus.js";
import { validTransitions } from "../utils/ValidTransitions.js";
import BaseEntity from "../models/BaseEntity.js";
import IUser from "../models/IUser.js";
import { TaskCategory } from "./TaskCategory.js";

export default class Task extends BaseEntity implements ITask {
  private title: string;
  private completed: boolean;
  private completeDate?: Date;
  private status: TaskStatus;
  private category: TaskCategory;
  private user: IUser | null;

  constructor(id: number, title: string, category: TaskCategory) {
    super(id);
    this.title = title;
    this.completed = false;
    this.status = TaskStatus.CREATED;
    this.category = category;
    this.user = null;
  }

  getCreatedAt(): Date {
    return super.getCreatedAt();
  }

  getTitle(): string {
    return this.title;
  }

  getCompleted(): boolean {
    return this.completed;
  }

  getStatus(): TaskStatus {
    return this.status;
  }

  getType(): string {
    return "task";
  }

  getUser(): IUser | null {
    return this.user;
  }

  setUser(user: IUser | null): void {
    this.user = user;
  }

  getTaskCategory(): TaskCategory {
    return this.category;
  }

  getCompletedDate(): Date {
    return this.completeDate!;
  }

  setCompletedDate(date: Date): void {
    this.completeDate = date;
  }

  moveTo(status: TaskStatus): void {
    if (validTransitions[this.status].indexOf(status) !== -1) {
      this.status = status;
      if (this.status === TaskStatus.COMPLETED) {
        this.completed = true;
        this.setCompletedDate(new Date());
      }
    }
  }
}
