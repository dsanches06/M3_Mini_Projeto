export default class TagService {
  private tagsToTask: Map<number, string[]>;

  constructor() {
    this.tagsToTask = new Map<number, string[]>();
  }

  addTag(taskId: number, tag: string) {
    if (!this.tagsToTask.has(taskId)) {
      this.tagsToTask.set(taskId, []);
    }
    const tags = this.tagsToTask.get(taskId) || [];
    tags.push(tag);
    this.tagsToTask.set(taskId, tags);
  }

  removeTag(taskId: number, tag: string) {
    const tags = this.tagsToTask.get(taskId);
    if (tags) {
      this.tagsToTask.set(
        taskId,
        tags.filter((t) => t !== tag),
      );
    }
  }

  getTags(taskId: number) {
    return this.tagsToTask.get(taskId) || [];
  }

  getTasksByTag(tag: string) {
    const taskIds: number[] = [];
    for (const [taskId, tags] of this.tagsToTask.entries()) {
      if (tags.some((t) => t === tag)) {
        taskIds.push(taskId);
      }
    }
    return taskIds;
  }
}
