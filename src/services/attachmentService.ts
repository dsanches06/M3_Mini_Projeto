import { Attachment } from "../attachments/index.js";
import { ITask } from "../tasks/index.js";

export class AttachmentService {
  private tasks: ITask[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }

  // Funções para gerenciar attachments relacionados a tasks
  addAttachment(taskId: number, attachment: Attachment) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      //task.getAttachments().push(attachment);
    }
  }

  // Retorna todos os attachments de uma task específica
  getAttachments(taskId: number): Attachment[] {
    const task = this.tasks.find((t) => t.id === taskId);
    // return task.getAttachments();
    return [];
  }

  // Remove um attachment específico
  removeAttachment(attachmentId: number) {
    const attachment = this.getAttachments(attachmentId);
    if (attachment) {
      const index = attachment.findIndex((a) => a.getId() === attachmentId);
      if (index !== -1) {
        attachment.splice(index, 1);
      }
    }
  }
}
