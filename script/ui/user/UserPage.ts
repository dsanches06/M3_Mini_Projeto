import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import {
  addElementInContainer,
  clearContainer,
} from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import { menuSelected } from "../dom/MenuSelected.js";
import {
  createSearchContainer,
  createStatisticsCounter,
} from "../dom/SectionCounter.js";
import {
  countAtivePercentage,
  countAtiveUsers,
  countUnableUsers,
  countAllUsers,
} from "./UserCountersUI.js";
import renderUsers from "./UserUI.js";
import {
  allUsers,
  sortUsersByName,
  allUsersAtive,
  allUsersUnable,
} from "../gestUserTask/GestUserUI.js";
import { getTasksByFilter } from "../../helpers/getTaskByFilter.js";
import Task from "../../models/task/Task.js";
import loadAllUsersTask from "../gestUserTask/GestUserUI.js";

let tasksFiltered: Task[];

/* Lista de utilizadores */
export default function loadUsersPage(gestUserTask: GestUserTask): void {
  /* ativa o menu Users */
  menuSelected("#menuUsers");
  //
  addElementInContainer(createHeadingTitle("h2", "GESTÃO DE UTILIZADORES"));
  //
  const userCounterSection = createUserCounter("userCounters");
  addElementInContainer(userCounterSection);
  //
  showUsersCounters(gestUserTask.users as User[]);
  //
  const searchContainer = showSearchContainer();
  addElementInContainer(searchContainer);
  //

  const usersContainer = renderUsers(gestUserTask.users as User[]);
  addElementInContainer(usersContainer);

  // Adicionar event listeners aos botões de contador para filtrar
  const allUsersBtn = userCounterSection.querySelector(
    "#allUsersBtn",
  ) as HTMLElement;
  allUsersBtn.title = "Mostrar todos os utilizadores";
  const ativeUsersBtn = userCounterSection.querySelector(
    "#ativeUsersBtn",
  ) as HTMLElement;
  ativeUsersBtn.title = "Mostrar todosos utilizadores ativos";
  const unableUsersBtn = userCounterSection.querySelector(
    "#unableUsersBtn",
  ) as HTMLElement;
  unableUsersBtn.title = "Mostrar todos os utilizadores inativos";

  allUsersBtn.addEventListener("click", () => {
    const users = allUsers();
    renderUsers(users as User[]);
    showUsersCounters(users as User[]);
  });

  ativeUsersBtn.addEventListener("click", () => {
    const usersAtive = allUsersAtive();
    renderUsers(usersAtive as User[]);
    showUsersCounters(usersAtive as User[]);
  });

  unableUsersBtn.addEventListener("click", () => {
    const usersUnable = allUsersUnable();
    renderUsers(usersUnable as User[]);
    showUsersCounters(usersUnable as User[]);
  });

  // Adicionar event listeners aos botões de busca
  const addUserBtn = document.querySelector("#addUserBtn") as HTMLElement;
  addUserBtn.addEventListener("click", () => {
    // Lógica para adicionar usuário (ex.: abrir modal ou navegar)
    alert(
      "Funcionalidade para adicionar usuário - implementar modal ou navegação.",
    );
  });

  const sortUsersBtn = document.querySelector("#sortUsersBtn") as HTMLElement;

  if (sortUsersBtn) {
    //Crie uma variável de controle de estado
    let isAscending = true;
    sortUsersBtn.addEventListener("click", () => {
      const sortedUsers = sortUsersByName(isAscending);
      //Inverta o estado para o próximo clique
      isAscending = !isAscending;
      // Mostrar os utilizadores ordenados
      renderUsers(sortedUsers as User[]);
      showUsersCounters(sortedUsers as User[]);
      // Atualize o texto ou ícone do botão
      sortUsersBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
  } else {
    console.warn("Elemento #sortUsersBtn não foi renderizado no DOM.");
  }

  //obter o menu task
  const menuTasks = document.querySelector("#menuTasks") as HTMLAnchorElement;
  menuTasks.addEventListener("click", () => {
    //limpa o container
    clearContainer();
    //mostrar todas as tarefas de todos os utilizadores
    loadAllUsersTask(gestUserTask);
  });
}

/* */
function createUserCounter(id: string): HTMLElement {
  //
  const allUsersBtn = createStatisticsCounter(
    "allUserSection",
    "allUsersBtn",
    "../../../images/users.png",
    "utilizadores",
    "allUsersCounter",
  ) as HTMLElement;

  //
  const ativeUsersBtn = createStatisticsCounter(
    "ativeUsers",
    "ativeUsersBtn",
    "../../../images/ative.png",
    "ativos",
    "ativeUsersCounter",
  ) as HTMLElement;
  //
  const unableUsersBtn = createStatisticsCounter(
    "unableUsers",
    "unableUsersBtn",
    "../../../images/unable.png",
    "Inativos",
    "unableUsersCounter",
  ) as HTMLElement;
  //
  const ativeUsersPercentageBtn = createStatisticsCounter(
    "ativeUserPercentage",
    "ativeUsersPercentageBtn",
    "../../../images/ative.png",
    "ativos (%)",
    "ativeUsersPercentageCounter",
  ) as HTMLElement;
  //
  const sectionUsersCounter = createSection(`${id}`) as HTMLElement;
  sectionUsersCounter.classList.add("users-counters");
  sectionUsersCounter.append(
    allUsersBtn,
    ativeUsersBtn,
    unableUsersBtn,
    ativeUsersPercentageBtn,
  );
  return sectionUsersCounter;
}

export function showUsersCounters(userList: User[]): void {
  countAllUsers("#allUsersCounter", userList);
  countAtiveUsers("#ativeUsersCounter", userList);
  countUnableUsers("#unableUsersCounter", userList);
  countAtivePercentage("#ativeUsersPercentageCounter", userList);
}

/* */
function showSearchContainer(): HTMLElement {
  const searchUserContainer = createSearchContainer(
    "searchUserContainer",
    { id: "searchUser", placeholder: "Procurar utilizador..." },
    [
      { id: "addUserBtn", text: "Adicionar utilizador" },
      { id: "sortUsersBtn", text: "Ordenar A-Z" },
    ],
  );
  searchUserContainer.classList.add("search-add-container");
  return searchUserContainer;
}
