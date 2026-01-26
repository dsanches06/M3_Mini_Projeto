import { NotificationService } from "./notificationService";
import  ITask  from "./../tasks/ITask";
import  IUser  from "../models/UserClass";
import { TaskStatus } from "../tasks/TaskStatus";
import { HistoryLog } from "../logs/HistoryLog";

export class AutomationRulesService {
  /**
   * Regras:
- Se task ficar COMPLETED → criar log automático
- Se task ficar BLOCKED → notificar
- Se user ficar inactive → remover assignments
- Se task expirar → mover para BLOCKED
   */

  private users: IUser[];

  constructor(users: IUser[]) {
    this.users = users;
  }

  applyRules(task: ITask) {
    if (task.getStatus() === TaskStatus.COMPLETED) {
      const log = new HistoryLog();
      log.addLog(`Task ${task.getId()} completed on ${Date.now()}`);
    }
    //Se task expirar → mover para BLOCKED
    else if (task.getStatus() === TaskStatus.BLOCKED) {
      //criar notificação
      const notificationService = new NotificationService(this.users);
      //enviar notificação a quem

    
    }
    //Se task expirar - ver isso
    else if (task) {
      // → mover para BLOCKED
      task.moveTo(TaskStatus.BLOCKED);
    }
  }

  applyUserRules(user: IUser) {
    if (!user.isActive()) {
      // remover assignments ver isso
    }
  }
}
