import { SystemLogger } from "../logs/SystemLogger.js";
import { ITask, TaskStatus } from "../tasks/index.js";
import { IUser } from "../models/index.js";
import {
  DeadlineService,
  AssignmentService,
  NotificationService,
} from "./index.js";

export class AutomationRulesService {
  private deadlineService: DeadlineService;

  constructor() {
    this.deadlineService = new DeadlineService();
  }

  applyRules(task: ITask) {
    if (task.getStatus() === TaskStatus.COMPLETED) {
      SystemLogger.log(`Task ${task.getId()} completed on ${Date.now()}`);
    } else if (task.getStatus() === TaskStatus.BLOCKED) {
      const assignedUser = task.getUser();
      if (assignedUser) {
        NotificationService.notifyUser(
          assignedUser.getId(),
          `Task ${task.getId()} is blocked.`,
        );
      }
    } else if (this.deadlineService.isExpired(task.getId())) {
      task.moveTo(TaskStatus.BLOCKED);
    }
  }

  applyUserRules(user: IUser) {
    if (!user.isActive()) {
      const tasks = AssignmentService.getTasksFromUser(user.getId());
      tasks.forEach((task: ITask) => {
        AssignmentService.unassignUser(task.getId(), user.getId());
      });
    }
  }
}
