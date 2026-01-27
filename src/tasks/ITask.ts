import { IUser } from "../models/index.js";
import { TaskCategory, TaskStatus } from "./index.js";

export interface ITask {
  getId(): number;
  getCreatedAt(): Date;
  setTitle(title: string): void;
  getTitle(): string;
  getCompleted(): boolean;
  getStatus(): TaskStatus;
  getUser(): IUser | null;
  setUser(user: IUser | null): void;
  getType(): string;
  getCompletedDate(): Date;
  getTaskCategory(): TaskCategory;
  markCompleted(): void;
  moveTo(status: TaskStatus): void;
}
