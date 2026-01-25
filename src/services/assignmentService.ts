import { UserClass } from "./../models/UserClass";
import { ITask } from "../tasks/ITask";

export class AssignmentService {
  //Uma task pode ter vários users
  private users: UserClass[];
  //Um user pode ter várias tasks
  private tasks: ITask[];

  constructor(users: UserClass[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  assignUser(taskId: number, userId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    const user = this.users.find((u) => u.getId() === userId);
    if (task && user) {
      // Lógica para atribuir o usuário à tarefa
    }
  }

  unassignUser(taskId: number, userId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    const user = this.users.find((u) => u.getId() === userId);
    if (task && user) {
      // Lógica para desatribuir o usuário da tarefa
    }
  }

  getUsersFromTask(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      // Lógica para retornar os usuários atribuídos à tarefa
    }
  }

  getTasksFromUser(userId: number) {
    const user = this.users.find((u) => u.getId() === userId);
    if (user) {
      // Lógica para retornar as tarefas atribuídas ao usuário
    }
  }
}
