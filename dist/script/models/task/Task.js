/* Task Class */
export default class Task {
    constructor(id, title, category, user) {
        this.id = id;
        this.title = title;
        this.completed = false;
        this.category = category;
        this.user = user;
    }
    markCompleted() {
        this.completed = true;
        this.completeDate = new Date();
    }
}
