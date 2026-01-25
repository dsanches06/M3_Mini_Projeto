
import { Attachment } from "../attachments/index.js";
import { Priority } from "../utils/index.js";
import { IUser } from "../models/index.js";
import { ITask, TaskStatus } from "../tasks/index.js";
import { DeadLine } from "../deadlines/index.js";




export class FeatureTask implements ITask {
  id: number;
  title: string;
  completed: boolean;
  status: TaskStatus;
  private users: IUser[];
  private taskPriority: Priority;
  private tags: string[];
  private deadLine: DeadLine;
  private comments: Comment[];
  private attachements: Attachment[];

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
    this.status = TaskStatus.CREATED;
    this.users = [];
    this.taskPriority = Priority.LOW;
    this.tags = [];
    this.deadLine = new DeadLine(new Date());
    this.comments = [];
    this.attachements = [];
  }

  getUsersFromTask(): IUser[] {
    return this.users;
  }

  removeUserFromTask(userId: number): void {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  }

  getTags(): string[] {
    return this.tags;
  }

  removeTag(tag: string): void {
    const tagIndex = this.tags.indexOf(tag);
    if (tagIndex !== -1) {
      this.tags.splice(tagIndex, 1);
    }
  }

  getPriority(): Priority {
    return this.taskPriority;
  }

  setPriority(priority: Priority): void {
    this.taskPriority = priority;
  }

  getTaskDeadLine() {
    return this.deadLine;
  }

  setDeadLine(date: Date): void {
    this.deadLine.setDeadLineDate(date);
  }

  getComments(): Comment[] {
    return this.comments;
  }

  getAttachments(): Attachment[] {
    return this.attachements;
  }

  getType(): string {
    return "feature";
  }

  moveTo(status: TaskStatus): void {
    // - definir transições válidas
    const validTransitions: Record<TaskStatus, TaskStatus[]> = {
      [TaskStatus.CREATED]: [TaskStatus.ASSIGNED],
      [TaskStatus.ASSIGNED]: [TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED],
      [TaskStatus.IN_PROGRESS]: [TaskStatus.BLOCKED, TaskStatus.COMPLETED],
      [TaskStatus.BLOCKED]: [TaskStatus.ASSIGNED, TaskStatus.COMPLETED],
      [TaskStatus.COMPLETED]: [TaskStatus.ARCHIVED],
      [TaskStatus.ARCHIVED]: [],
    };
    // - validar transição
    //if (validTransitions[this.status]?.includes(status)) {
      // - atualizar estado
      this.status = status;
      // - marcar completed se necessário
      if (this.status === TaskStatus.COMPLETED) {
        this.completed = true;
      }
   // }
  }
}
