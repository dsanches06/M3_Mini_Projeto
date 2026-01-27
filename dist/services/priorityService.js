import { Priority } from "../utils/Priority.js";
export default class PriorityService {
    constructor() {
        this.priorities = new Map();
    }
    setPriority(taskId, priority) {
        this.priorities.set(taskId, priority);
    }
    getPriority(taskId) {
        return this.priorities.get(taskId);
    }
    getHighPriorityTasks() {
        const highPriorityTasks = [];
        for (const [taskId, priority] of this.priorities.entries()) {
            if (priority === Priority.HIGH || priority === Priority.CRITICAL) {
                highPriorityTasks.push(taskId);
            }
        }
        return highPriorityTasks;
    }
}
