import { BaseEntity, IUser } from "./index.js";
import { UserRole } from "../security/UserRole.js";
import { ITask } from "../tasks/index.js";

export class UserClass extends BaseEntity implements IUser {
  private name: string;
  private email: string;
  private active: boolean;
  private role?: UserRole;
  private tasks: ITask[];

  constructor(id: number, name: string, email: string, role?: UserRole) {
    super(id);
    this.name = name;
    this.email = email;
    this.active = true;
    this.role = role;
    this.tasks = [];
  }

  getName(): string {
    return this.name;
  }

  isActive(): boolean {
    return this.active;
  }

  toggleActive(): void {
    this.active = !this.active;
  }

  getRole(): UserRole {
    return this.role!;
  }

  getEmail(): string {
    return this.email;
  }

  createTask(task: ITask): void {
    this.tasks.push(task);
  }

  removeTask(id: number): void {
    const index = this.tasks.findIndex((task) => task.getId() === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  pendingTasks(): ITask[] {
    return this.tasks.filter((task) => !task.getCompleted());
  }

  completedTasks(): ITask[] {
    return this.tasks.filter((task) => task.getCompleted());
  }

  getTasks(): ITask[] {
    return this.tasks;
  }
}
