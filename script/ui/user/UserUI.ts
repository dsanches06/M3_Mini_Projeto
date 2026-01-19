import User from "../../models/user/User.js";
import {
  countAtiveUsers,
  countUnableUsers,
  countUsers,
  countAtivePercentage,
} from "./UserCountersUI.js"
import { createUserCard } from "./UserCardUI.js";
import { createSection } from "../dom/CreatePage.js";
import { addElementInContainer } from "../dom/ContainerSection.js";

/* Container de utilizadores */


/* Função de renderização */
export default function renderUsers(usersList: User[]): HTMLElement {
 const usersContainer = createSection("usersContainer") as HTMLElement;
  //Limpa o contentor HTML.
  usersContainer.innerHTML = "";
  usersList.forEach((user) =>
    //Para cada utilizador, cria um cartão HTML.
    //createUserCard(user, usersList),
    console.log(user)
  );
  // Aplicar cores aos cartões
  //applyCardColors();
  return usersContainer;
}

/* */
export function showUsersCount(usersList: User[]): HTMLElement {
  //
  const allUsers = document.querySelector("#allUsers") as HTMLElement;
  allUsers.appendChild(countUsers(usersList));
  //
  const ativeUsers = document.querySelector("#ativeUsers") as HTMLElement;
  ativeUsers.appendChild(countAtiveUsers(usersList));
  //
  const unableUsers = document.querySelector("#unableUsers") as HTMLElement;
  unableUsers.appendChild(countUnableUsers(usersList));
  //
  const ativeUsersPercentageCount = document.querySelector(
    "#ativeUsersPercentageCount",
  ) as HTMLElement;
  ativeUsersPercentageCount.appendChild(countAtivePercentage(usersList));
  return ativeUsersPercentageCount;

  const usersCounters = document.querySelector("#userCounters") as HTMLElement;
  usersCounters.append(
    allUsers,
    ativeUsers,
    unableUsers,
    ativeUsersPercentageCount,
  );
}

/* Função para adicionar novo utilizador */
export function addNewUser(id: number): User {
  //Lê os valores dos inputs.
  const nameInput = document.querySelector("#nameInput") as HTMLInputElement;
  const name = nameInput.value;
  const emailInput = document.querySelector("#emailInput") as HTMLInputElement;
  const email = emailInput.value;
  //Limpa os valores dos inputs.
  nameInput.value = "";
  emailInput.value = "";
  //retorna um novo objeto do tipo UserClass
  return new User(id, name, email);
}

/* Alternar estado (ativo / inativo) */
export function toggleUserState(userID: number, userList: User[]): void {
  //encontra o utilizador pelo ID
  const user = userList.find((user) => user.id === userID);
  //se o utilizador for encontrado
  if (user) {
    //alternar o estado do utilizador
    user.toggleStates();
    //atualiza a exibição dos utilizadores
    renderUsers(userList);
  }
}

/* Remover utilizador */
export function removeUserByID(userID: number, userList: User[]): User[] {
  // Usa filter() para criar um novo array sem o utilizador com o ID especificado
  const updatedUserList = userList.filter((user) => user.id !== userID);
  //retorna a lista atualizada
  return updatedUserList as User[];
}

/* Aplicar cores aos cartões */
function applyCardColors(): void {
 /* const cards = usersContainer.querySelectorAll(".card");
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
  }*/
}
