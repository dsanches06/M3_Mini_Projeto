import { IUser } from "../models/index.js";
import { TaskCategory } from "./TaskCategory.js";
import { TaskStatus } from "./TaskStatus.js";

export interface ITask {
  getId(): number;
  getCreatedAt(): Date;
  setTitle(title: string): void;
  getTitle(): string;
  getCompleted(): boolean;
  getStatus(): TaskStatus;
  setStatus(status: TaskStatus): void;
  getUser(): IUser | null;
  setUser(user: IUser | null): void;
  getType(): string;
  getCompletedDate(): Date;
  getTaskCategory(): TaskCategory;
  markCompleted(): void;
  moveTo(status: TaskStatus): void;
}
