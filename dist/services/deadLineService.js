export default class DeadlineService {
    constructor() {
        this.deadlines = new Map();
    }
    setDeadline(taskId, date) {
        this.deadlines.set(taskId, date);
    }
    isExpired(taskId) {
        const deadline = this.deadlines.get(taskId);
        if (!deadline)
            return false;
        return deadline.getTime() < this.getCurrentTimestamp();
    }
    getExpiredTasks() {
        const now = this.getCurrentTimestamp();
        const expiredTasks = [];
        for (const [taskId, deadline] of this.deadlines.entries()) {
            if (deadline.getTime() < now) {
                expiredTasks.push(taskId);
            }
        }
        return expiredTasks;
    }
    getCurrentTimestamp() {
        return Date.now();
    }
}
