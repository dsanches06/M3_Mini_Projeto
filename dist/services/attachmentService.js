export default class AttachmentService {
    constructor() {
        this.attachments = new Map();
    }
    addAttachment(taskId, attachment) {
        var _a;
        if (!this.attachments.has(taskId)) {
            this.attachments.set(taskId, []);
        }
        (_a = this.attachments.get(taskId)) === null || _a === void 0 ? void 0 : _a.push(attachment);
    }
    getAttachments(taskId) {
        return this.attachments.get(taskId) || [];
    }
    removeAttachment(attachmentId) {
        for (const attachments of this.attachments.values()) {
            const index = attachments.findIndex((att) => att.getId() === attachmentId);
            if (index !== -1) {
                attachments.splice(index, 1);
            }
        }
    }
}
