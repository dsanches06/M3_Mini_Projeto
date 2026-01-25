import { ITask } from "./ITask";
import { TaskStatus } from "./TaskStatus";
import { validTransitions } from "../utils/ValidTransitions";

export class Task implements ITask {
  id: number;
  title: string;
  completed: boolean;
  status: TaskStatus;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
    this.status = TaskStatus.CREATED;
  }

  getType(): string {
    return "task";
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
