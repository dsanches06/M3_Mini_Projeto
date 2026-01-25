import { ITask } from "../tasks/index.js";

export class DeadlineService {
  //- Associar uma data limite a cada task
  private tasks: ITask[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }

  setDeadline(taskId: number, date: Date) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      //task.setDeadLine(date);
    }
  }

  isExpired(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      //return task.getTaskDeadLine().isExpired();
    }
    return false;
  }

  getExpiredTasks() {
    return this.tasks.filter((task) => this.isExpired(task.id));
  }
}
