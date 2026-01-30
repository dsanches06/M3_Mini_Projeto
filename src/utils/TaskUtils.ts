import { ITask } from "../tasks/index.js";
import { NotificationService } from "../services/index.js";
import { SystemLogger } from "../logs/SystemLogger.js";
import { TaskStatus } from "../tasks/TaskStatus.js";
import { UserClass } from "../models/UserClass.js";
import { StateTransitions } from "./index.js";

const taskStatusMap = new Map<number, TaskStatus>();

/* Processa a tarefa com base no seu tipo e registra logs e notificações */
export function processTask(task: ITask) {
  const taskId = task.getId();
  const type = task.getType();
  const user = task.getUser() as UserClass;
  const previousStatus = taskStatusMap.get(taskId) || TaskStatus.CREATED;

  switch (type) {
    case "Bugs":
      //bug → regras mais rígidas, mais validações, logs automáticos, mais notificações
      try {
        if (
          StateTransitions.validTransitions(previousStatus, task.getStatus())
        ) {
          SystemLogger.log(
            `INFO: A tarefa ${task.getTitle()} do tipo ${type} atribuido ao ${user?.getName()} foi processado [${previousStatus.toString()} -> ${task.getStatus().toString()}].`,
          );
          NotificationService.notifyUser(
            user?.getId(),
            `A tarefa ${task.getTitle()} do tipo ${type} atribuido ao ${user?.getName()} foi processado [${previousStatus.toString()} -> ${task.getStatus().toString()}].`,
          );
          taskStatusMap.set(taskId, task.getStatus());
        } else {
          SystemLogger.log(
            `ERRO: Transição ${previousStatus} para ${task.getStatus()} não é permitida.`,
          );
        }
      } catch (error) {
        SystemLogger.log(
          `ERRO: Transição ${previousStatus} para ${task.getStatus()} não é permitida.`,
        );
      }

      break;
    case "Feature":
      //feature → regras mais flexíveis, menos validações
      SystemLogger.log(
        `INFO: A tarefa ${task.getTitle()} do tipo ${type} atribuido ao ${user?.getName()} foi processado [${previousStatus.toString()} -> ${task.getStatus().toString()}].`,
      );
      taskStatusMap.set(taskId, task.getStatus());
      break;
    case "Task":
      //task → comportamento genérico
      SystemLogger.log(
        `INFO: A tarefa ${task.getTitle()} do tipo ${type} atribuido ao ${user?.getName()} foi processado [${previousStatus.toString()} -> ${task.getStatus().toString()}].`,
      );
      taskStatusMap.set(taskId, task.getStatus());
      break;
    default:
      SystemLogger.log("ERRO: Tipo de tarefa desconhecido");
      break;
  }
}
