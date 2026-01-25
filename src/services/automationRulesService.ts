import { TaskStatus, ITask, BugTask } from "../tasks/index.js";
import { IUser, UserClass } from "../models/index.js";
import { HistoryLog } from "../logs/index.js";
import { NotificationService } from "../services/index.js";

export class AutomationRulesService {
  //construtor vazio
  constructor() {}

  //- Regras de automação relacionadas a tasks
  applyRules(task: ITask) {
    if (task.status === TaskStatus.COMPLETED) {
      const log = new HistoryLog();
      log.addLog(`Task ${task.id} completed on ${Date.now()}`);
    } //
    else if (task.status === TaskStatus.BLOCKED) {
      //  const assignedUsers: IUser[] = task.getUsersFromTask();
      //const usersId: number[] = assignedUsers.map((user) => user.getId());
      // const notification = new NotificationService(assignedUsers);
      // notification.notifyGroup(
      //usersId,
      // `Task ${task.id} is blocked. Please take action.`,
      // );
    }
    //- Se task expirar → mover para BLOCKED
    // if (task.dueDate && new Date(task.dueDate) < new Date()) {
    // task.status = TaskStatus.BLOCKED;
    // }
  }

  //- Se user ficar inactive → remover assignments
  applyUserRules(user: IUser) {
    //if (!user.isActive()) {
    //  user.getTasksFromUser().forEach((task) => {
    //  user.removeTask(task.id);
    ////});
    //}
  }
}
