export default class TagService {
    constructor() {
        this.tagsToTask = new Map();
    }
    addTag(taskId, tag) {
        if (!this.tagsToTask.has(taskId)) {
            this.tagsToTask.set(taskId, []);
        }
        const tags = this.tagsToTask.get(taskId) || [];
        tags.push(tag);
        this.tagsToTask.set(taskId, tags);
    }
    removeTag(taskId, tag) {
        const tags = this.tagsToTask.get(taskId);
        if (tags) {
            this.tagsToTask.set(taskId, tags.filter((t) => t !== tag));
        }
    }
    getTags(taskId) {
        return this.tagsToTask.get(taskId) || [];
    }
    getTasksByTag(tag) {
        const taskIds = [];
        for (const [taskId, tags] of this.tagsToTask.entries()) {
            if (tags.some((t) => t === tag)) {
                taskIds.push(taskId);
            }
        }
        return taskIds;
    }
}
