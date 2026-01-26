import IUser from "../models/IUser";
import { TaskStatus } from "./TaskStatus";

export default interface ITask {
  getId(): number;
  getCreatedAt(): Date;
  getTitle(): string;
  getCompleted(): boolean;
  getStatus(): TaskStatus;
  getUser(): IUser | null;
  setUser(user: IUser | null): void;
  getId(): number;
  getType(): string;
  moveTo(status: TaskStatus): void;
}
