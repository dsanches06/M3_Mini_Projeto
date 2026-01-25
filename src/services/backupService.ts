import { UserClass } from "./../models/UserClass";
import { ITask } from "../tasks/ITask";
//- Exportar dados em objetos JSON

export class BackupService {
  private users: UserClass[];
  private tasks: ITask[];

  constructor(users: UserClass[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  exportUsers() {
    return JSON.stringify(this.users);
  }
  exportTasks() {
    return JSON.stringify(this.tasks);
  }

  exportAssignments() {
    // Supondo que cada task tenha um método getUsersFromTask()
  }

  exportAll() {
    return {
      users: this.exportUsers(),
      tasks: this.exportTasks(),
      assignments: this.exportAssignments(),
    };
  }
}
