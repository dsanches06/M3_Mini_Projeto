export class DeadLine {
  private deadLineDate: Date;

  constructor(deadLineDate: Date) {
    this.deadLineDate = deadLineDate;
  }

  getDeadLineDate(): Date {
    return this.deadLineDate;
  }
  setDeadLineDate(deadLineDate: Date): void {
    this.deadLineDate = deadLineDate;
  }

  isExpired(): boolean {
    const currentDate = new Date();
    return this.deadLineDate < currentDate;
  }
}
