import { Attachment } from "../attachments/Attachment";
import { ITask } from "../tasks/ITask";

export class AttachmentService {
  private tasks: ITask[];
  private attachments: Attachment[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
    this.attachments = [];
  }

  addAttachment(taskId: number, attachment: Attachment) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.attachments.push(attachment);
    }
  }

  getAttachments(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      return this.attachments.filter((a) => a.getTaskId() === taskId);
    }
  }

  removeAttachment(attachmentId: number) {
    const index = this.attachments.findIndex((a) => a.getId() === attachmentId);
    if (index !== -1) {
      this.attachments.splice(index, 1);
    }
  }
}
