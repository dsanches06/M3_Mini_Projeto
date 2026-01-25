export class Attachment {
  private id: number;
  private taskId: number;
  private fileName: string;
  private size: number;
  private url: string;
  private uploadedAt: Date;
  private count: number = 0;

  constructor(
    id?: number,
    taskId?: number,
    fileName?: string,
    size?: number,
    url?: string,
    uploadedAt?: Date,
  ) {
    this.id = id || 0;
    this.taskId = taskId || 0;
    this.fileName = fileName || '';
    this.size = size || 0;
    this.url = url || '';
    this.uploadedAt = uploadedAt || new Date();
  }

  getId(): number {
    return this.id;
  }
  getTaskId(): number {
    return this.taskId;
  }
}
