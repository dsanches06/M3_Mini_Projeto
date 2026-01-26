export default class HistoryLog {

  private logs: string[] = [];

  addLog(message: string) {
    this.logs.push(message);
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}
