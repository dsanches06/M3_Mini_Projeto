import { TaskStatus } from "../tasks/TaskStatus.js";

// - definir transições válidas
export function validTransitions(
  current: TaskStatus,
  next: TaskStatus,
): boolean {
  //usa um State Machine Pattern
  if (current === TaskStatus.COMPLETED && next !== TaskStatus.ARCHIVED)
    return false;
  return true;
}
