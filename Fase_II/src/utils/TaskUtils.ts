import ITask from "../tasks/ITask.js";
import NotificationService from "../services/notificationService.js";
import HistoryLog from "../logs/HistoryLog.js";
import { validTransitions } from "./ValidTransitions.js";
import { TaskStatus } from "../tasks/TaskStatus.js";
import { UserService } from "../services/userService.js";

// Função para processar uma tarefa com base no seu tipo

const notificationService = new NotificationService(
  new UserService().getAllUsers(),
);
const historyLog = new HistoryLog();
let previousStatus: TaskStatus = TaskStatus.CREATED;

export function processTask(task: ITask) {
  const type = task.getType();
  switch (type) {
    case "bug":
      //bug → regras mais rígidas, mais validações, logs automáticos, mais notificações
      try {
        if (validTransitions[previousStatus].indexOf(task.getStatus()) !== -1) {
          historyLog.addLog(`Bug task ${task.getId()} processed`);
          notificationService.notifyAdmins(
            `Bug task ${task.getId()} foi processada`,
          );
          previousStatus = task.getStatus();
        }
      } catch (error) {
        console.error(
          `Invalid status transition from ${previousStatus} to ${task.getStatus()}`,
        );
      }

      break;
    case "feature":
      //feature → regras mais flexíveis, menos validações
      historyLog.addLog(`Feature task ${task.getId()} processed`);
      break;
    case "task":
      //task → comportamento genérico
      historyLog.addLog(`Task ${task.getId()} processed`);
      break;
    default:
      //colocar um banner
      console.warn("Tipo de tarefa desconhecido");
      break;
  }
}
