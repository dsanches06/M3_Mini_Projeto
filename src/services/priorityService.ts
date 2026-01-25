import { ITask } from "../tasks/ITask";
import { Priority } from "../utils/Priority";

export class PriorityService {
  private tasks: ITask[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }

  setPriority(taskId: number, priority: Priority) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      if (priority === Priority.LOW) {
      } else if (priority === Priority.MEDIUM) {
      } else if (priority === Priority.HIGH) {
      } else if (priority === Priority.CRITICAL) {
      }
    }
  }

  getPriority(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      //o que fazer aqui
    }
  }

  getHighPriorityTasks() {
    return [];
  }
}
