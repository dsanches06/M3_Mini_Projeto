import { TaskStatus } from "../tasks/TaskStatus.js";

/* Representação de transições de estado */
export class StateTransitions {
  private static readonly TRANSITIONS = new Map<TaskStatus, TaskStatus[]>([
    [TaskStatus.CREATED, [TaskStatus.ASSIGNED, TaskStatus.ARCHIVED]],
    [
      TaskStatus.ASSIGNED,
      [TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED, TaskStatus.ARCHIVED],
    ],
    [
      TaskStatus.IN_PROGRESS,
      [TaskStatus.COMPLETED, TaskStatus.BLOCKED, TaskStatus.ASSIGNED],
    ],
    [
      TaskStatus.BLOCKED,
      [
        TaskStatus.COMPLETED,
        TaskStatus.IN_PROGRESS,
        TaskStatus.ASSIGNED,
        TaskStatus.ARCHIVED,
      ],
    ],
    [TaskStatus.COMPLETED, [TaskStatus.ARCHIVED, TaskStatus.IN_PROGRESS]],
    [TaskStatus.ARCHIVED, []],
  ]);

  static validTransitions(current: TaskStatus, next: TaskStatus): boolean {
    const allowed = this.TRANSITIONS.get(current) || [];
    return allowed.includes(next);
  }
}
