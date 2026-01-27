import { TaskStatus } from "./TaskStatus.js";
import { validTransitions } from "../utils/ValidTransitions.js";
import BaseEntity from "../models/BaseEntity.js";
export default class Task extends BaseEntity {
    constructor(id, title, category) {
        super(id);
        this.title = title;
        this.completed = false;
        this.status = TaskStatus.CREATED;
        this.category = category;
        this.user = null;
    }
    getCreatedAt() {
        return super.getCreatedAt();
    }
    getTitle() {
        return this.title;
    }
    getCompleted() {
        return this.completed;
    }
    getStatus() {
        return this.status;
    }
    getType() {
        return "task";
    }
    getUser() {
        return this.user;
    }
    setUser(user) {
        this.user = user;
    }
    getTaskCategory() {
        return this.category;
    }
    getCompletedDate() {
        return this.completeDate;
    }
    setCompletedDate(date) {
        this.completeDate = date;
    }
    moveTo(status) {
        if (validTransitions[this.status].indexOf(status) !== -1) {
            this.status = status;
            if (this.status === TaskStatus.COMPLETED) {
                this.completed = true;
                this.setCompletedDate(new Date());
            }
        }
    }
}
