export default class HistoryLog {
    constructor() {
        this.logs = [];
    }
    addLog(message) {
        this.logs.push(message);
    }
    getLogs() {
        return this.logs;
    }
    clearLogs() {
        this.logs = [];
    }
}
