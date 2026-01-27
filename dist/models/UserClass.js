import BaseEntity from "./BaseEntity.js";
export default class UserClass extends BaseEntity {
    constructor(id, name, email, role) {
        super(id);
        this.name = name;
        this.email = email;
        this.active = true;
        this.role = role;
        this.tasks = [];
    }
    getName() {
        return this.name;
    }
    isActive() {
        return this.active;
    }
    toggleActive() {
        this.active = !this.active;
    }
    getRole() {
        return this.role;
    }
    getEmail() {
        return this.email;
    }
    createTask(task) {
        this.tasks.push(task);
    }
    removeTask(id) {
        const index = this.tasks.findIndex((task) => task.getId() === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
    pendingTasks() {
        return this.tasks.filter((task) => !task.getCompleted());
    }
    completedTasks() {
        return this.tasks.filter((task) => task.getCompleted());
    }
    getTasks() {
        return this.tasks;
    }
}
