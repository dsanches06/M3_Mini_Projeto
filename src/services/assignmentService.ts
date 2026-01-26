import UserClass from "models/UserClass";
import IUser from "../models/IUser";
import ITask from "./../tasks/ITask";

export default class TaskAssignmentService {
  private users: IUser[];
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  assignUser(taskId: number, userId: number) {
    // Adicionar user à task
    const task = this.tasks.find((t) => t.getId() === taskId);
    const user = this.users.find((u) => u.getId() === userId);
    if (task && user) {
      // Implementar lógica de atribuição de usuário à tarefa
      user.getTasks().push(task);
      task.setUser(user);
    }
  }

  unassignUser(taskId: number, userId: number) {
    // Remover user da task
    const task = this.tasks.find((t) => t.getId() === taskId);
    const user = this.users.find((u) => u.getId() === userId);
    if (task && user) {
      // Implementar lógica de remoção de usuário da tarefa
      const taskIndex = user.getTasks().findIndex((t) => t.getId() === taskId);
      if (taskIndex !== -1) {
        user.getTasks().splice(taskIndex, 1);
        task.setUser(null);
      }
    }
  }

  getUserFromTask(taskId: number) {
    const task = this.tasks.find((t) => t.getId() === taskId);
    return task ? task.getUser() : null;
  }

  getTaskFromUser(userId: number) {
    const user = this.users.find((u) => u.getId() === userId);
    return user ? user.getTasks() : [];
  }
}
