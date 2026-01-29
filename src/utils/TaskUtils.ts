import { validTransitions } from "../utils/index.js";
import { ITask } from "../tasks/index.js";
import { NotificationService } from "../services/index.js";
import { SystemLogger } from "../logs/SystemLogger.js";
import { TaskStatus } from "../tasks/index.js";

// Função para processar uma tarefa com base no seu tipo
const taskStatusMap = new Map<number, TaskStatus>();

export function processTask(task: ITask) {
  const taskId = task.getId();
  const type = task.getType();
  const previousStatus = taskStatusMap.get(taskId) || TaskStatus.CREATED;

  switch (type) {
    case "Bugs":
      //bug → regras mais rígidas, mais validações, logs automáticos, mais notificações
      try {
        if (validTransitions(previousStatus, task.getStatus())) {
          SystemLogger.log(`Bug task ${taskId} processed`);
          NotificationService.notifyAdmins(`Bug task ${taskId} foi processada`);
          taskStatusMap.set(taskId, task.getStatus());
        }
      } catch (error) {
        SystemLogger.log(
          `Invalid status transition from ${previousStatus} to ${task.getStatus()} - ${error}`,
        );
      }

      break;
    case "Feature":
      //feature → regras mais flexíveis, menos validações
      SystemLogger.log(`Feature task ${taskId} processed`);
      taskStatusMap.set(taskId, task.getStatus());
      break;
    case "Task":
      //task → comportamento genérico
      SystemLogger.log(`Task ${taskId} processed`);
      taskStatusMap.set(taskId, task.getStatus());
      break;
    default:
      //colocar um banner
      console.warn("Tipo de tarefa desconhecido");
      break;
  }
}
