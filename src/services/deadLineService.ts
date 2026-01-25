import { ITask } from "../tasks/ITask";

export class DeadlineService {
  //- Associar uma data limite a cada task
  private tasks: ITask[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }

  setDeadline(taskId: number, date: Date) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      if (
        task.getType() === "bug" ||
        task.getType() === "feature" ||
        task.getType() === "task"
      ) {
        return date;
      }
    }
  }

  isExpired(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      const deadline = this.setDeadline(taskId, new Date());
      //verificar se a data limite ja passou
      return deadline && deadline < new Date() ? true : false;
    }
    return false;
  }

  getExpiredTasks() {
    return this.tasks.filter((task) => this.isExpired(task.id));
  }
}
