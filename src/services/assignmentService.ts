import { IUser } from "../models/index.js";
import { ITask, TaskStatus } from "../tasks/index.js";

export class AssignmentService {
  private users: IUser[];
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  assignUser(taskId: number, userId: number) {
    const task = this.tasks.find((t) => t.getId() === taskId);
    const user = this.users.find((u) => u.getId() === userId);
    if (task && user) {
      user.getTasks().push(task);
      task.setUser(user);
      task.moveTo(TaskStatus.ASSIGNED);
    }
  }

  unassignUser(taskId: number, userId: number) {
    const task = this.tasks.find((t) => t.getId() === taskId);
    const user = this.users.find((u) => u.getId() === userId);
    if (task && user) {
      const taskIndex = user.getTasks().findIndex((t) => t.getId() === taskId);
      if (taskIndex !== -1) {
        user.getTasks().splice(taskIndex, 1);
        task.setUser(null);
        task.moveTo(TaskStatus.ARCHIVED);
      }
    }
  }

  getUserFromTask(taskId: number) {
    const task = this.tasks.find((t) => t.getId() === taskId);
    return task ? task.getUser() : null;
  }

  getTasksFromUser(userId: number) {
    const user = this.users.find((u) => u.getId() === userId);
    return user ? user.getTasks() : [];
  }
}
