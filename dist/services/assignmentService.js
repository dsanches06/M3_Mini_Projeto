import { TaskStatus } from "../tasks/TaskStatus.js";
export default class AssignmentService {
    constructor(users, tasks) {
        this.users = users;
        this.tasks = tasks;
    }
    assignUser(taskId, userId) {
        const task = this.tasks.find((t) => t.getId() === taskId);
        const user = this.users.find((u) => u.getId() === userId);
        if (task && user) {
            user.getTasks().push(task);
            task.setUser(user);
            task.moveTo(TaskStatus.ASSIGNED);
        }
    }
    unassignUser(taskId, userId) {
        const task = this.tasks.find((t) => t.getId() === taskId);
        const user = this.users.find((u) => u.getId() === userId);
        if (task && user) {
            const taskIndex = user.getTasks().findIndex((t) => t.getId() === taskId);
            if (taskIndex !== -1) {
                user.getTasks().splice(taskIndex, 1);
                task.setUser(null);
                task.moveTo(TaskStatus.ARCHIVED);
            }
        }
    }
    getUserFromTask(taskId) {
        const task = this.tasks.find((t) => t.getId() === taskId);
        return task ? task.getUser() : null;
    }
    getTasksFromUser(userId) {
        const user = this.users.find((u) => u.getId() === userId);
        return user ? user.getTasks() : [];
    }
}
