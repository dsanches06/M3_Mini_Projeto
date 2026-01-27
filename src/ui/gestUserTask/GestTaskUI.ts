import UserService from "../../services/userService.js";
import IUser from "../../models/IUser.js";
import ITask from "../../tasks/ITask.js";
import { showInfoBanner } from "../../helpers/infoBanner.js";
import { clearContainer } from "../dom/ContainerSection.js";
import { getTasksByFilter } from "../../helpers/getTaskByFilter.js";
import loadTasksPage from "../task/TaskPage.js";


/* array global de utilizadores */
let users: IUser[];
// array global para armazenar tarefas filtradas
let tasksFiltered: ITask[];

/* Função helper para filtrar tarefas de todos os usuários, evitando duplicação */
function filterTasksFromAllUsers(filterType: string, title?: string): ITask[] {
  if (!users || users.length === 0) {
    console.warn("Nenhum usuário disponível para filtrar tarefas.");
    return [];
  }
  let filtered: ITask[] = [];
  for (const user of users) {
    filtered = getTasksByFilter(user, filtered, filterType, title);
  }
  return filtered;
}

/* Função principal para mostrar as tarefas de todos os utilizadores */
export function loadAllUsersTask(servicesUser: UserService): void {
  // atribuir o valor ao array global de utilizadores
  users = servicesUser.getAllUsers();
  // inicializa o array para evitar repetições de dados
  tasksFiltered = [];
  // filtra tarefas de todos os usuários
  tasksFiltered = filterTasksFromAllUsers("all");
  // Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadTasksPage(tasksFiltered);
}

/* */
export function allUsersTasks(): ITask[] {
  tasksFiltered = filterTasksFromAllUsers("all");
  return tasksFiltered;
}

export function pendingTasks(): ITask[] {
  tasksFiltered = filterTasksFromAllUsers("pending");
  return tasksFiltered;
}

export function completedTasks(): ITask[] {
  tasksFiltered = filterTasksFromAllUsers("completed");
  return tasksFiltered;
}

export function searchTasksByTitle(title: string): ITask[] {
  tasksFiltered = filterTasksFromAllUsers("search", title);
  return tasksFiltered;
}

/* Ordenar utilizadores por nome */
export function sortTasksByTitle(ascending: boolean = true): ITask[] {
  tasksFiltered = allUsersTasks();
  let sortedTasks: ITask[] = [];
  if (ascending) {
    sortedTasks = tasksFiltered.sort((a, b) =>
      a.getTitle().localeCompare(b.getTitle()),
    );
  } else {
    sortedTasks = tasksFiltered.sort((a, b) =>
      b.getTitle().localeCompare(a.getTitle()),
    );
  }
  return sortedTasks;
}

export function removeAllCompletedTask(): ITask[] {
  if (!users || users.length === 0) {
    showInfoBanner(
      "Nenhum usuário disponível para remover tarefas completas.",
      "info-banner",
    );
    return [];
  }
  tasksFiltered = [];
  // Remove tarefas completas de todos os usuários e coleta as pendentes
  for (const user of users) {
    const tasks = user.getTasks();
    if (tasks && tasks.length > 0) {
     /*  user.getTasks() = tasks.filter((task) => !task.getCompleted());
      if (user.tasks.length > 0) {
        tasksFiltered = getTasksByFilter(user, tasksFiltered, "pending");
      } */
    }
  }
  return tasksFiltered;
}

/* Função para inicializar o array global de usuários */
export function initUsers(servicesUser: UserService): void {
  users = servicesUser.getAllUsers();
}
