import IUser from "../models/IUser.js";
import { TaskStatus } from "./TaskStatus.js";

export default interface ITask {
  getId(): number;
  getCreatedAt(): Date;
  getTitle(): string;
  getCompleted(): boolean;
  getStatus(): TaskStatus;
  getUser(): IUser | null;
  setUser(user: IUser | null): void;
  getType(): string;
  moveTo(status: TaskStatus): void;
}
