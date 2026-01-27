import BaseEntity from "../models/BaseEntity.js";
export default class Comment extends BaseEntity {
    constructor(id, taskId, userId, message) {
        super(id);
        this.taskId = taskId;
        this.userId = userId;
        this.message = message;
    }
    getId() {
        return super.getId();
    }
    getTaskId() {
        return this.taskId;
    }
    getUserId() {
        return this.userId;
    }
    getMessage() {
        return this.message;
    }
    getCreatedAt() {
        return super.getCreatedAt();
    }
}
