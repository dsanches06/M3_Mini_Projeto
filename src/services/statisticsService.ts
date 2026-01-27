import { IUser } from "../models/index.js";
import { ITask, TaskStatus } from "../tasks/index.js";

export class StatisticsService {
  private users: IUser[];
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  countUsers() {
    return this.users.length;
  }

  countTasks() {
    return this.tasks.length;
  }

  countCompletedTasks() {
    return this.tasks.filter((task) => task.getCompleted()).length;
  }

  countActiveTasks() {
    return this.tasks.filter((task) => !task.getCompleted()).length;
  }

  tasksByStatus(status: TaskStatus) {
    return this.tasks.filter((task) => task.getStatus() === status).length;
  }
}
