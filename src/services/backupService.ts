import { ITask } from "../tasks/index.js";
import { IUser } from "../models/index.js";

//- Exportar dados em objetos JSON

export class BackupService {
  private users: IUser[];
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  exportUsers() {}
  exportTasks() {}
  exportAssignments() {}
  exportAll() {}
}
