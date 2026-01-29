import { SystemLogger } from "../logs/SystemLogger.js";
import { ITask } from "../tasks/index.js";
import { TaskStatus } from "../tasks/TaskStatus.js";
import { IUser } from "../models/index.js";
import {
  DeadlineService,
  AssignmentService,
  NotificationService,
} from "./index.js";

export class AutomationRulesService {
  static applyRules(task: ITask) {
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
    } else if (DeadlineService.isExpired(task.getId())) {
      task.moveTo(TaskStatus.BLOCKED);
    }
  }

  static applyUserRules(user: IUser) {
    if (!user.isActive()) {
      const tasks = AssignmentService.getTasksFromUser(user.getId());
      tasks.forEach((task: ITask) => {
        AssignmentService.unassignUser(task.getId(), user.getId());
      });
    }
  }
}
