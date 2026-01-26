import Attachment from "../attachments/Attachment.js";

export class AttachmentService {
  private attachments: Map<number, Attachment[]>;

  constructor() {
    this.attachments = new Map<number, Attachment[]>();
  }

  addAttachment(taskId: number, attachment: Attachment) {
    if (!this.attachments.has(taskId)) {
      this.attachments.set(taskId, []);
    }
    this.attachments.get(taskId)?.push(attachment);
  }

  getAttachments(taskId: number) {
    return this.attachments.get(taskId) || [];
  }

  removeAttachment(attachmentId: number) {
    for (const attachments of this.attachments.values()) {
      const index = attachments.findIndex(
        (att) => att.getId() === attachmentId,
      );
      if (index !== -1) {
        attachments.splice(index, 1);
      }
    }
  }
}
