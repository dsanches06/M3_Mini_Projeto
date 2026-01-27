export default class BackupService {
    constructor(users, tasks) {
        this.users = users;
        this.tasks = tasks;
    }
    exportUsers() {
        return JSON.stringify(this.users);
    }
    exportTasks() {
        return JSON.stringify(this.tasks);
    }
    exportAssignments() {
        const assignments = this.tasks.map((task) => {
            var _a, _b;
            return ({
                taskId: task.getId(),
                assignedTo: (_b = (_a = task.getUser()) === null || _a === void 0 ? void 0 : _a.getId()) !== null && _b !== void 0 ? _b : null,
            });
        });
        return JSON.stringify(assignments);
    }
    exportAll() {
        return {
            users: this.exportUsers(),
            tasks: this.exportTasks(),
            assignments: this.exportAssignments(),
        };
    }
}
