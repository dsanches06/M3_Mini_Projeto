import { ITask } from "../../tasks/index.js";
import { UserService, TaskService } from "../../services/index.js";
import { clearContainer } from "../dom/index.js";
import { showInfoBanner } from "../../helpers/index.js";
import { loadTasksPage } from "../task/index.js";

// array global para armazenar tarefas filtradas
let tasksFiltered: ITask[];

/* Função principal para mostrar as tarefas de todos os utilizadores */
export function loadAllTasks(tasksList: ITask[]): void {
  // Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadTasksPage(tasksList);
}

export function allTasks(tasksList: ITask[]): ITask[] {
  tasksFiltered = [...tasksList];
  return tasksFiltered;
}

/* Filtrar tarefas pendentes */
export function pendingTasks(tasksList: ITask[]): ITask[] {
  tasksFiltered = tasksList.filter((task) => !task.getCompleted());
  return tasksFiltered;
}

/* Filtrar tarefas concluídas */
export function completedTasks(tasksList: ITask[]): ITask[] {
  tasksFiltered = tasksList.filter((task) => task.getCompleted());
  return tasksFiltered;
}

/* Ordenar utilizadores por nome */
export function sortTasksByTitle(
  tasksList: ITask[],
  ascending: boolean = true,
): ITask[] {
  let sortedTasks: ITask[] = [];
  if (ascending) {
    sortedTasks = tasksList.sort((a, b) =>
      a.getTitle().localeCompare(b.getTitle()),
    );
  } else {
    sortedTasks = tasksList.sort((a, b) =>
      b.getTitle().localeCompare(a.getTitle()),
    );
  }
  return sortedTasks;
}

export function searchTasksByTitle(
  tasksList: ITask[],
  searchTerm: string,
): ITask[] {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  tasksFiltered = tasksList.filter((task) =>
    task.getTitle().toLowerCase().includes(lowerCaseSearchTerm),
  );
  return tasksFiltered;
}

export function removeAllCompletedTask(taskList: ITask[]): ITask[] {
  if (!taskList || taskList.length === 0) {
    showInfoBanner("Não existe tarefas para remover.", "info-banner");
    return [];
  }
  tasksFiltered = [];
  for (const task of taskList) {
    if (task.getCompleted()) {
      UserService.getUserByTaskId(task.getId())?.removeTask(task.getId());
      TaskService.removeTask(task.getId());
    } else {
      tasksFiltered.push(task);
    }
  }
  return tasksFiltered;
}
