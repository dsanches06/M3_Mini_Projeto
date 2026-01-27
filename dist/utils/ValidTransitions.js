import { TaskStatus } from "../tasks/TaskStatus";
// - definir transições válidas
export const validTransitions = {
    [TaskStatus.CREATED]: [TaskStatus.ASSIGNED],
    [TaskStatus.ASSIGNED]: [TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED],
    [TaskStatus.IN_PROGRESS]: [TaskStatus.BLOCKED, TaskStatus.COMPLETED],
    [TaskStatus.BLOCKED]: [TaskStatus.ASSIGNED, TaskStatus.COMPLETED],
    [TaskStatus.COMPLETED]: [TaskStatus.ARCHIVED],
    [TaskStatus.ARCHIVED]: [],
};
