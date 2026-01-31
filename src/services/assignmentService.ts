import { TaskStatus } from "../tasks/TaskStatus.js";
import { UserService, TaskService } from "./index.js";

/* Serviço para gerir a atribuição de tarefas a utilizadores */
export class AssignmentService {
  static assignUser(taskId: number, userId: number) {
    const task = TaskService.getTaskById(taskId);
    const user = UserService.getUserById(userId);
    if (task && user) {
      // Remove assignment from previous user if exists
      const prevUser = task.getUser();
      if (prevUser && prevUser.getId() !== user.getId()) {
        const idx = prevUser.getTasks().findIndex((t) => t.getId() === taskId);
        if (idx !== -1) prevUser.getTasks().splice(idx, 1);
      }

      // Assign to new user (avoid duplicates)
      const alreadyAssigned = user.getTasks().find((t) => t.getId() === taskId);
      if (!alreadyAssigned) user.getTasks().push(task);

      // Set the owner but defer the status transition to be executed after all assignments
      task.setUser(user);
    }
  }

  /* Finaliza a atribuição de tarefas  CREATED -> ASSIGNED */
  static finalizeAssignments() {
    const tasks = TaskService.getAllTasks();
    for (const task of tasks) {
      if (task.getUser() && task.getStatus() === TaskStatus.CREATED) {
        task.moveTo(TaskStatus.ASSIGNED);
      }
    }
  }

  /* Remove a atribuição de uma tarefa a um utilizador */
  static unassignUser(taskId: number, userId: number) {
    const task = TaskService.getTaskById(taskId);
    const user = UserService.getUserById(userId);
    if (task && user) {
      const taskIndex = user.getTasks().findIndex((t) => t.getId() === taskId);
      if (taskIndex !== -1) {
        user.getTasks().splice(taskIndex, 1);
        task.setUser(undefined);
        // Archive even if state machine doesn't allow direct transition
        task.setStatus(TaskStatus.ARCHIVED);
      }
    }
  }

  /* Obtém o utilizador atribuído a uma tarefa específica */
  static getUserFromTask(taskId: number) {
    const task = TaskService.getTaskById(taskId);
    return task ? task.getUser() : null;
  }

  /* Obtém todas as tarefas atribuídas a um utilizador específico */
  static getTasksFromUser(userId: number) {
    const user = UserService.getUserById(userId);
    return user ? user.getTasks() : [];
  }
}
