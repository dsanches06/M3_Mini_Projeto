export class Tag {
  private name: string;
  private taskId: number;

  constructor(name: string, taskId: number) {
    this.name = name;
    this.taskId = taskId;
  }

  getName() {
    return this.name;
  }
  getTaskId() {
    return this.taskId;
  }
}
