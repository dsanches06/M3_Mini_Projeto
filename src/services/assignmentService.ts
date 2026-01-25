import { ITask } from "../tasks/index.js";
import { IUser } from "../models/index.js";

export class AssignmentService {
  //Uma task pode ter vários users
  private users: IUser[];
  //Um user pode ter várias tasks
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  assignUser(taskId: number, userId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    // const user = this.users.find((u) => u.getId() === userId);
    //if (task && user) {
    // Lógica para associar usuário à tarefa
    //task.getUsersFromTask().push(user);
    //  user.getTasksFromUser().push(task);
    //}
  }

  // Remove a associação de um user a uma task
  unassignUser(taskId: number, userId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    // const user = this.users.find((u) => u.getId() === userId);
    //if (task && user) {
    // Lógica para desassociar usuário da tarefa
    // task.removeUserFromTask(userId);
    // user.removeTask(taskId);
    //}
  }

  // Retorna os users associados a uma task
  getUsersFromTask(taskId: number) {
    //usar filter e map
    //  return this.tasks
    //  .filter((t) => t.id === taskId)
    // .map((t) => t.getUsersFromTask());
  }

  // Retorna as tasks associadas a um user
  getTasksFromUser(userId: number) {
    //usar filter e map
    // return this.users
    // .filter((u) => u.getId() === userId)
    // .map((u) => u.getTasksFromUser());
  }
}
