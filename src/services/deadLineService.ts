export default class DeadlineService {
  //- Associar uma data limite a cada task
  private deadlines: Map<number, Date>;

  constructor() {
    this.deadlines = new Map<number, Date>();
  }

  setDeadline(taskId: number, date: Date) {
    this.deadlines.set(taskId, date);
  }

  isExpired(taskId: number) {
    const deadline = this.deadlines.get(taskId);
    if (!deadline) return false;
    return deadline.getTime() < this.getCurrentTimestamp();
  }

  getExpiredTasks() {
    const now = this.getCurrentTimestamp();
    const expiredTasks = [];
    for (const [taskId, deadline] of this.deadlines.entries()) {
      if (deadline.getTime() < now) {
        expiredTasks.push(taskId);
      }
    }
    return expiredTasks;
  }

  private getCurrentTimestamp() {
    return Date.now();
  }
}
