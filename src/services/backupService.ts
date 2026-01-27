import { IUser } from "../models/index.js";
import { ITask } from "../tasks/index.js";

export class BackupService {
  private users: IUser[];
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
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
    const assignments = this.tasks.map((task) => ({
      taskId: task.getId(),
      assignedTo: task.getUser()?.getId() ?? null,
    }));
    return JSON.stringify(assignments);
  }

  exportAll() {
    return {
      users: this.exportUsers(),
      tasks: this.exportTasks(),
      assignments: this.exportAssignments(),
    };
  }
}
