import UserClass from "../models/UserClass";
import ITask from "../tasks/ITask";
import { TaskStatus } from "../tasks/TaskStatus";

export class StatisticsService {
  private users: UserClass[];
  private tasks: ITask[];

  constructor(users: UserClass[], tasks: ITask[]) {
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
