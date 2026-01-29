export class DeadlineService {
  //- Associar uma data limite a cada task
  private static deadlines = new Map<number, Date>();

  static setDeadline(taskId: number, date: Date) {
    this.deadlines.set(taskId, date);
  }

  static isExpired(taskId: number) {
    const deadline = this.deadlines.get(taskId);
    if (!deadline) return false;
    return deadline.getTime() < this.getCurrentTimestamp();
  }

  static getExpiredTasks() {
    const now = this.getCurrentTimestamp();
    const expiredTasks = [];
    for (const [taskId, deadline] of this.deadlines.entries()) {
      if (deadline.getTime() < now) {
        expiredTasks.push(taskId);
      }
    }
    return expiredTasks;
  }

  private static getCurrentTimestamp() {
    return Date.now();
  }
}
