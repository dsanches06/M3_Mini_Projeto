import {  TaskStatus } from "../tasks/TaskStatus.js";
import { UserService, TaskService } from "./index.js";

export class AssignmentService {
  static assignUser(taskId: number, userId: number) {
    const task = TaskService.getTaskById(taskId);
    const user = UserService.getUserById(userId);
    if (task && user) {
      user.getTasks().push(task);
      task.setUser(user);
      task.moveTo(TaskStatus.ASSIGNED);
    }
  }

  static unassignUser(taskId: number, userId: number) {
    const task = TaskService.getTaskById(taskId);
    const user = UserService.getUserById(userId);
    if (task && user) {
      const taskIndex = user.getTasks().findIndex((t) => t.getId() === taskId);
      if (taskIndex !== -1) {
        user.getTasks().splice(taskIndex, 1);
        task.setUser(null);
        task.moveTo(TaskStatus.ARCHIVED);
      }
    }
  }

  static getUserFromTask(taskId: number) {
    const task = TaskService.getTaskById(taskId);
    return task ? task.getUser() : null;
  }

  static getTasksFromUser(userId: number) {
    const user = UserService.getUserById(userId);
    return user ? user.getTasks() : [];
  }
}
