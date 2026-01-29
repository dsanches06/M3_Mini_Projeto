import { ITask, TaskStatus } from "../tasks/index.js";

export class TaskService {
  private static tasks = new Map<number, ITask>();

  static addTask(task: ITask): void {
    if (!this.tasks.has(task.getId())) {
      this.tasks.set(task.getId(), task);
    }
  }

  static removeTask(id: number): boolean {
    return this.tasks.delete(id);
  }

  static getCompletedTasks(): ITask[] {
    return Array.from(this.tasks.values()).filter((task) =>
      task.getCompleted(),
    );
  }

  static getAllTasks(): ITask[] {
    return Array.from(this.tasks.values());
  }

  static getTaskById(id: number): ITask | undefined {
    return this.tasks.get(id);
  }

  static getTasksAssign(): ITask[] {
    return Array.from(this.tasks.values()).filter(
      (task) => task.getStatus() === TaskStatus.ASSIGNED,
    );
  }

  static getTasksUnassign(): ITask[] {
    return Array.from(this.tasks.values()).filter(
      (task) => task.getStatus() === TaskStatus.CREATED,
    );
  }
}
