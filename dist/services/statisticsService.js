export default class StatisticsService {
    constructor(users, tasks) {
        this.users = users;
        this.tasks = tasks;
    }
    countUsers() {
        return this.users.length;
    }
    countTasks() {
        return this.tasks.length;
    }
    countCompletedTasks() {
        return this.tasks.filter((task) => task.getCompleted()).length;
    }
    countActiveTasks() {
        return this.tasks.filter((task) => !task.getCompleted()).length;
    }
    tasksByStatus(status) {
        return this.tasks.filter((task) => task.getStatus() === status).length;
    }
}
