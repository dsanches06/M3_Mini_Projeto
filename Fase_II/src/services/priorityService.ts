import { Priority } from "../utils/Priority.js";

export class PriorityService {
  private priorities: Map<number, Priority>;

  constructor() {
    this.priorities = new Map<number, Priority>();
  }

  setPriority(taskId: number, priority: Priority) {
    this.priorities.set(taskId, priority);
  }

  getPriority(taskId: number) {
    return this.priorities.get(taskId);
  }

  getHighPriorityTasks() {
    const highPriorityTasks: number[] = [];
    for (const [taskId, priority] of this.priorities.entries()) {
      if (priority === Priority.HIGH || priority === Priority.CRITICAL) {
        highPriorityTasks.push(taskId);
      }
    }
    return highPriorityTasks;
  }
}
