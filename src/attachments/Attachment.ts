export class Attachment {
  private id: number;
  private taskId: number;
  private fileName: string;
  private size: number;
  private url: string;
  private uploadedAt: Date;
  private count: number = 0;

  constructor(
    id: number,
    taskId: number,
    fileName: string,
    size: number,
    url: string,
    uploadedAt: Date,
  ) {
    this.id = id;
    this.taskId = taskId;
    this.fileName = fileName;
    this.size = size;
    this.url = url;
    this.uploadedAt = uploadedAt;
  }

  getId(): number {
    return this.id;
  }
  getTaskId(): number {
    return this.taskId;
  }
}
