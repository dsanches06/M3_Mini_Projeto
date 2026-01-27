import { validTransitions } from "../utils/index.js";
import { ITask } from "../tasks/index.js";
import { UserService, NotificationService } from "../services/index.js";
import { HistoryLog } from "../logs/HistoryLog.js";
import { TaskStatus } from "../tasks/index.js";
import { showInfoBanner } from "../helpers/index.js";

// Função para processar uma tarefa com base no seu tipo
let notificationService: NotificationService | null = null;
const historyLog = new HistoryLog();
const taskStatusMap = new Map<number, TaskStatus>();

// Lazy load do NotificationService para evitar dependências circulares
function getNotificationService(): NotificationService {
  if (!notificationService) {
    notificationService = new NotificationService(
      new UserService().getAllUsers(),
    );
  }
  return notificationService;
}

export function processTask(task: ITask) {
  const taskId = task.getId();
  const type = task.getType();
  const previousStatus = taskStatusMap.get(taskId) || TaskStatus.CREATED;

  switch (type) {
    case "bug":
      //bug → regras mais rígidas, mais validações, logs automáticos, mais notificações
      try {
        if (validTransitions(previousStatus, task.getStatus())) {
          historyLog.addLog(`Bug task ${taskId} processed`);
          getNotificationService().notifyAdmins(`Bug task ${taskId} foi processada`);
          taskStatusMap.set(taskId, task.getStatus());
        }
      } catch (error) {
        showInfoBanner(
          `Invalid status transition from ${previousStatus} to ${task.getStatus()} - ${error}`,
          "error-banner",
        );
      }

      break;
    case "feature":
      //feature → regras mais flexíveis, menos validações
      historyLog.addLog(`Feature task ${taskId} processed`);
      taskStatusMap.set(taskId, task.getStatus());
      break;
    case "task":
      //task → comportamento genérico
      historyLog.addLog(`Task ${taskId} processed`);
      taskStatusMap.set(taskId, task.getStatus());
      break;
    default:
      //colocar um banner
      console.warn("Tipo de tarefa desconhecido");
      break;
  }
}
