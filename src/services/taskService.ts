import { ITask, TaskStatus } from "../tasks/index.js";

export class TaskService {
  private tasks: Map<number, ITask>;

  constructor() {
    this.tasks = new Map<number, ITask>();
  }

  addTask(task: ITask): void {
    if (!this.tasks.has(task.getId())) {
      this.tasks.set(task.getId(), task);
    }
  }

  removeTask(id: number): boolean {
    return this.tasks.delete(id);
  }

  getCompletedTasks(): ITask[] {
    return Array.from(this.tasks.values()).filter((task) =>
      task.getCompleted(),
    );
  }

  getAllTasks(): ITask[] {
    return Array.from(this.tasks.values());
  }

  getTaskById(id: number): ITask | undefined {
    return this.tasks.get(id);
  }

  getTasksAssign(): ITask[] {
    return Array.from(this.tasks.values()).filter(
      (task) => task.getStatus() === TaskStatus.ASSIGNED,
    );
  }

  getTasksUnassign(): ITask[] {
    return Array.from(this.tasks.values()).filter(
      (task) => task.getStatus() === TaskStatus.CREATED,
    );
  }
}
