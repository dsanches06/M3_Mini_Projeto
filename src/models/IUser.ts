import { UserRole } from "../security/index.js";
import { ITask } from "../tasks/index.js";

export interface IUser {
  getId(): number;
  getName(): string;
  isActive(): boolean;
  toggleActive(): void;
  getRole(): UserRole;
  getEmail(): string;
  createTask(task: ITask): void;
  removeTask(id: number): void;
  pendingTasks(): ITask[];
  completedTasks(): ITask[];
  getTasks(): ITask[];
}
