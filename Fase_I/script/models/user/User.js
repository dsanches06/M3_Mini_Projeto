/*  Classe Utilizador */
export default class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isAtive = true;
        this.tasks = [];
    }
    unable() {
        this.isAtive = false;
    }
    toggleStates() {
        this.isAtive = !this.isAtive;
    }
    createTask(task) {
        this.tasks.push(task);
    }
    removeTask(id) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
    pendingTasks() {
        return this.tasks.filter((task) => !task.completed);
    }
    completedTasks() {
        return this.tasks.filter((task) => task.completed);
    }
    allTasks() {
        return this.tasks;
    }
}
