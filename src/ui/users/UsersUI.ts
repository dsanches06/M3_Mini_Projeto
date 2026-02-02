import { IUser, UserClass } from "../../models/index.js";
import { createSection } from "../dom/index.js";
import {
  createUserCard,
  renderUserModal,
  showUsersCounters,
} from "./index.js";
import { searchUserByName } from "../gestUserTask/index.js";

/* Container de utilizadores */
const usersContainer = createSection("usersContainer") as HTMLElement;

/* Função de renderização */
export function renderUsers(users: IUser[]): HTMLElement {
  usersContainer.innerHTML = "";
  users.forEach((user) =>
    //Para cada utilizador, cria um cartão HTML.
    usersContainer.appendChild(createUserCard(user as UserClass)),
  );
  // Aplicar cores aos cartões
  applyCardColors(usersContainer);
  return usersContainer;
}

/* Aplicar cores aos cartões */
function applyCardColors(usersContainer: HTMLElement): void {
  const cards = Array.from(usersContainer.querySelectorAll(".card"));
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
      ".btnGroup span#toogleBtn",
    ) as HTMLElement;
    if (contentA) {
      contentA.style.color = randomColor;
    }
  }
}

export function loadUsersPage(): void {
  const searchUser = document.querySelector("#searchUser") as HTMLInputElement;
  if (searchUser) {
    searchUser.addEventListener("input", () => {
      const name = searchUser.value.toLowerCase();
      const filteredUsers = searchUserByName(name);
      renderUsers(filteredUsers);
      showUsersCounters(filteredUsers, "filterByName");
    });
  }
  const addTaskUserBtn = document.querySelector(
    "#addTaskUserBtn",
  ) as HTMLButtonElement;
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
      renderUserModal();
    });
  } else {
    console.warn("Elemento #addUserBtn não foi renderizado no DOM.");
  }
}
