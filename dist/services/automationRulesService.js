import NotificationService from "./notificationService.js";
import { TaskStatus } from "../tasks/TaskStatus.js";
import HistoryLog from "../logs/HistoryLog.js";
import DeadlineService from "./deadLineService.js";
import AssignmentService from "./assignmentService.js";
export default class AutomationRulesService {
    constructor(users, tasks) {
        this.users = users;
        this.tasks = tasks;
        this.deadlineService = new DeadlineService();
        this.assignmentService = new AssignmentService(this.users, this.tasks);
    }
    applyRules(task) {
        if (task.getStatus() === TaskStatus.COMPLETED) {
            const log = new HistoryLog();
            log.addLog(`Task ${task.getId()} completed on ${Date.now()}`);
        }
        else if (task.getStatus() === TaskStatus.BLOCKED) {
            const notificationService = new NotificationService(this.users);
            const assignedUser = task.getUser();
            if (assignedUser) {
                notificationService.notifyUser(assignedUser.getId(), `Task ${task.getId()} is blocked.`);
            }
        }
        else if (this.deadlineService.isExpired(task.getId())) {
            task.moveTo(TaskStatus.BLOCKED);
        }
    }
    applyUserRules(user) {
        if (!user.isActive()) {
            const assignedTasks = this.assignmentService.getTasksFromUser(user.getId());
            assignedTasks.forEach((task) => {
                this.assignmentService.unassignUser(task.getId(), user.getId());
            });
        }
    }
}
