import ITask from "./ITask";
import { TaskStatus } from "./TaskStatus";
import { validTransitions } from "../utils/ValidTransitions";
import BaseEntity from "../models/BaseEntity";
import IUser from "../models/IUser";

export default class BugTask extends BaseEntity implements ITask {
  private title: string;
  private completed: boolean;
  private status: TaskStatus;
  private user: IUser | null;

  constructor(id: number, title: string) {
    super(id);
    this.title = title;
    this.completed = false;
    this.status = TaskStatus.CREATED;
    this.user = null;
  }

  getId(): number {
    return super.getId();
  }

  getCreatedAt(): Date {
    return super.getCreatedAt();
  }

  getTitle(): string {
    return this.title;
  }

  getCompleted(): boolean {
    return this.completed;
  }

  getStatus(): TaskStatus {
    return this.status;
  }

  getType(): string {
    return "bug";
  }

  getUser(): IUser | null {
    return this.user;
  }

  setUser(user: IUser | null): void {
    this.user = user;
  }

  moveTo(status: TaskStatus): void {
    // - validar transição
    if (validTransitions[this.status].includes(status)) {
      // - atualizar estado
      this.status = status;
      // - marcar completed se necessário
      if (this.status === TaskStatus.COMPLETED) {
        this.completed = true;
      }
    }
  }
}
