import { StateTransitions } from "../utils/index.js";
import { IUser, BaseEntity } from "../models/index.js";
import { ITask } from "./index.js";
import { TaskCategory } from "./TaskCategory.js";
import { TaskStatus } from "./TaskStatus.js";
import { SystemLogger } from "../logs/SystemLogger.js";

/* Implementação da tarefa do tipo Feature */
export class FeatureTask extends BaseEntity implements ITask {
  private title: string;
  private completed: boolean;
  private completeDate?: Date;
  private status: TaskStatus;
  private category: TaskCategory;
  private user: IUser | null;

  constructor(id: number, title: string, category: TaskCategory) {
    super(id);
    this.title = title;
    this.completed = false;
    this.status = TaskStatus.CREATED;
    this.category = category;
    this.user = null;
  }

  getCreatedAt(): Date {
    return super.getCreatedAt();
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getCompleted(): boolean {
    return this.completed;
  }

  getStatus(): TaskStatus {
    return this.status;
  }

  setStatus(status: TaskStatus): void {
    this.status = status;
  }

  getType(): string {
    return "Feature";
  }

  getUser(): IUser | null {
    return this.user;
  }

  setUser(user: IUser | null): void {
    this.user = user;
  }

  getTaskCategory(): TaskCategory {
    return this.category;
  }

  getCompletedDate(): Date {
    return this.completeDate!;
  }

  setCompletedDate(date: Date): void {
    this.completeDate = date;
  }

  markCompleted(): void {
    this.completed = true;
  }

  moveTo(status: TaskStatus): void {
    try {
      const canTransition = StateTransitions.validTransitions(
        this.getStatus(),
        status,
      );
      // Validar transição
      // (Ex: Não voltar de COMPLETED para CREATED)
      if (canTransition) {
        this.setStatus(status);
      }
    } catch (error) {
      SystemLogger.log(
        `Transição de ${TaskStatus[this.getStatus()]} para ${TaskStatus[status]} não é permitida. ${error}`,
      );
    } finally {
      if (status === TaskStatus.COMPLETED) {
        this.markCompleted();
        this.setCompletedDate(new Date());
      }
    }
  }
}
