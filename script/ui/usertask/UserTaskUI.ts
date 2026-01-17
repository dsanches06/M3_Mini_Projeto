import Task from "../../models/task/Task.js";
import User from "../../models/user/User.js";
import {
  countAllUserTasks,
  countCompletedUserTasks,
  countPendingUserTasks,
} from "../task/TaskCounters.js";

/* Container de tarefas do utilizador */
const usersTaskContainer = document.querySelector(
  "#usersTaskContainer",
) as HTMLDivElement;

/* Mostrar tarefas */
export default function showUserTask(user: User, tasks: Task[]): void {
  showUserNameHeader(user);
  renderUserTask(tasks as Task[]);
  countAllUserTasks(tasks as Task[]);
  countPendingUserTasks(tasks as Task[]);
  countCompletedUserTasks(tasks as Task[]);
}

/* Função de renderizar apenas as tarefas do utilizador */
function renderUserTask(taskList: Task[]) {
  if (usersTaskContainer) {
    //Limpa o contentor HTML.
    usersTaskContainer.innerHTML = "";
  } else {
    console.warn("Elemento #usersTaskContainer não foi renderizado no DOM.");
  }
}

/* Função para mostrar o nome de utilizador no cabeçalho */
function showUserNameHeader(user: User): void {
  const userNameTaskHeader = document.querySelector(
    "#userNameTaskHeader",
  ) as HTMLSpanElement;
  if (userNameTaskHeader) {
    if (user) {
      userNameTaskHeader.textContent = user.name;
    } else {
      userNameTaskHeader.textContent = "Utilizador Desconhecido";
    }
  } else {
    console.warn("Elemento #userNameTaskHeader não foi renderizado no DOM.");
  }
}
