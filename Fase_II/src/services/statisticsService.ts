import IUser from "../models/IUser.js";
import ITask from "../tasks/ITask.js";
import { TaskStatus } from "../tasks/TaskStatus.js";

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
