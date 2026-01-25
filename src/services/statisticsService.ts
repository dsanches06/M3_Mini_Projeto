import { IUser } from "../models/index.js";
import { ITask, TaskStatus } from "../tasks/index.js";

export class StatisticsService {
  private users: IUser[];
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  countUsers(): number {
    return this.users.length;
  }

  countTasks(): number {
    return this.tasks.length;
  }

  countCompletedTasks(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  countActiveTasks(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  tasksByStatus(status: TaskStatus): number {
    return this.tasks.filter((task) => task.status === status).length;
  }
}
