import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import ITask from "../../models/task/ITask.js";
import { getTasksByFilter } from "../../helpers/getTaskByFilter.js";
import { clearContainer } from "../dom/ContainerSection.js";
import Task from "../../models/task/Task.js";
import { searchUserByName } from "../gestUserTask/GestUserUI.js";
import renderAllTasks from "../task/TaskUI.js";
import { showTasksCounters } from "../task/TaskPage.js";
import renderUsers from "../user/UserUI.js";
import { showUsersCounters } from "../user/UserPage.js";

/* array global de utilizadores */
let users: User[];
// array global para armazenar tarefas filtradas
let tasksFiltered: Task[];

/* Função helper para filtrar tarefas de todos os usuários, evitando duplicação */
function filterTasksFromAllUsers(filterType: string, title?: string): Task[] {
  if (!users || users.length === 0) {
    console.warn("Nenhum usuário disponível para filtrar tarefas.");
    return [];
  }
  let filtered: Task[] = [];
  for (const user of users) {
    filtered = getTasksByFilter(user, filtered, filterType, title);
  }
  return filtered;
}

/* Função principal para mostrar as tarefas de todos os utilizadores */
export function loadAllUsersTask(gestUsersTask: GestUserTask): void {
  // atribuir o valor ao array global de utilizadores
  users = gestUsersTask.users as User[];
  // inicializa o array para evitar repetições de dados
  tasksFiltered = [];
  // filtra tarefas de todos os usuários
  tasksFiltered = filterTasksFromAllUsers("all");
  // Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadTasksPage(gestUsersTask, tasksFiltered);
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
  tasksFiltered = allUsersTasks() as Task[];
  let sortedTasks: Task[] = [];
  if (ascending) {
    sortedTasks = tasksFiltered.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sortedTasks = tasksFiltered.sort((a, b) => b.title.localeCompare(a.title));
  }
  return sortedTasks;
}

export function removeAllCompletedTask(): ITask[] {
  if (!users || users.length === 0) {
    console.warn("Nenhum usuário disponível para remover tarefas completas.");
    return [];
  }
  // inicializa o array para evitar repetições de dados
  tasksFiltered = [];
  const usersWithPendingTasks = new Set<User>(); // Usar Set para evitar duplicatas
  // por cada utilizador
  for (const user of users) {
    const tasks = user.tasks as Task[];
    if (tasks && tasks.length > 0) {
      // remover tarefas completas
      const pendingTasks = tasks.filter(task => !task.completed);
      // atualizar tarefas do usuário (assumindo que user.tasks é mutável)
      user.tasks = pendingTasks;
      // se houver tarefas pendentes, adicionar usuário ao set
      if (pendingTasks.length > 0) {
        usersWithPendingTasks.add(user);
      }
    }
  }
  // filtrar as tarefas não concluídas de todos os utilizadores
  for (const user of usersWithPendingTasks) {
    tasksFiltered = getTasksByFilter(user, tasksFiltered, "pending");
  }
  return tasksFiltered;
}

export function loadTasksPage(gestUserTask: GestUserTask, tasksList: ITask[]): void {
  // ...existing code...
  const searchTask = document.querySelector("#searchTask") as HTMLInputElement;
  if (searchTask) {
    searchTask.addEventListener("input", () => {
      const title = searchTask.value.toLowerCase();
      const filteredTasks = searchTasksByTitle(title);
      renderAllTasks(filteredTasks as Task[]);
      showTasksCounters(filteredTasks as Task[]);
    });
  } else {
    console.error("Elemento de busca de tarefas não encontrado.");
  }
  // ...existing code...
}

export function loadUsersPage(gestUserTask: GestUserTask): void {
  // ...existing code...
  const searchUser = document.querySelector("#searchUser") as HTMLInputElement;
  if (searchUser) {
    searchUser.addEventListener("input", () => {
      const name = searchUser.value.toLowerCase();
      const filteredUsers = searchUserByName(name);
      renderUsers(filteredUsers as User[]);
      showUsersCounters(filteredUsers as User[]);
    });
  } else {
    console.error("Elemento de busca de utilizadores não encontrado.");
  }
  // ...existing code...
}
