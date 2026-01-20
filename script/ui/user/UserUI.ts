import User from "../../models/user/User.js";
import ITask from "../../models/task/ITask.js";
import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import { createUserCard } from "./UserCardUI.js";
import { createSection } from "../dom/CreatePage.js";
import { searchUserByName } from "../gestUserTask/GestUserUI.js";
import { renderUserModal } from "./UserModalForm.js";

/* Container de utilizadores */
const usersContainer = createSection("usersContainer") as HTMLElement;

/* Função de renderização */
export default function renderUsers(usersList: User[]): HTMLElement {
  usersContainer.innerHTML = "";
  usersList.forEach((user) =>
    //Para cada utilizador, cria um cartão HTML.
    usersContainer.appendChild(createUserCard(user, usersList)),
  );
  // Aplicar cores aos cartões
  applyCardColors(usersContainer);
  return usersContainer;
}

/* Aplicar cores aos cartões */
function applyCardColors(usersContainer: HTMLElement): void {
  const cards = usersContainer.querySelectorAll(".card");
  for (const card of cards) {
    // Gerar uma cor aleatória suave
    const randomColor = `rgb(${Math.floor(Math.random() * 128)}, ${Math.floor(
      Math.random() * 128,
    )}, ${Math.floor(Math.random() * 128)})`;
    const title = card.querySelector(".title") as HTMLElement;
    if (title) {
      title.style.background = randomColor;
    }
    const contentA = card.querySelector(
      ".btnGroup button#toogleBtn",
    ) as HTMLElement;
    if (contentA) {
      contentA.style.background = randomColor;
    }
  }
}

/* Funções auxiliares para contadores (implementadas como stubs, pois não estavam definidas) */
function countAllTasks(selector: string, taskList: ITask[]): void {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.textContent = taskList.length.toString();
  }
}

function countCompletedUserTasks(selector: string, taskList: ITask[]): void {
  const completed = taskList.filter((task) => task.completed).length;
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.textContent = completed.toString();
  }
}

function countPendingUserTasks(selector: string, taskList: ITask[]): void {
  const pending = taskList.filter((task) => !task.completed).length;
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.textContent = pending.toString();
  }
}

function showUsersCounters(usersList: User[]): void {
  // Implementação básica, assumindo que você precisa contar usuários; ajuste conforme necessário
  const allUsersElement = document.querySelector("#allUsersCounter") as HTMLElement;
  if (allUsersElement) {
    allUsersElement.textContent = usersList.length.toString();
  }
}

export function showTasksCounters(taskList: ITask[]): void {
  countAllTasks("#allTasksCounter", taskList);
  countCompletedUserTasks("#completedTaskCounter", taskList);
  countPendingUserTasks("#pendingTasksCounter", taskList);
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
  }
  const addTaskUserBtn = document.querySelector("#addTaskUserBtn") as HTMLButtonElement;
  if (addTaskUserBtn) {
    addTaskUserBtn.addEventListener("click", () => {
      const modal = document.querySelector("#modalUserTaskForm") as HTMLElement;
      if (modal) {
        modal.style.display = "block";
      }
    });
  } else {
    console.warn("Elemento #addTaskUserBtn não foi renderizado no DOM.");
  }
  const addUserBtn = document.querySelector("#addUserBtn") as HTMLButtonElement;
  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      renderUserModal(gestUserTask);
    });
  } else {
    console.warn("Elemento #addUserBtn não foi renderizado no DOM.");
  }
  // ...existing code...
}
