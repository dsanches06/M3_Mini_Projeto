import { UserClass } from "../../models/index.js";
import { UserService } from "../../services/index.js";
import {
  addElementInContainer,
  createSection,
  menuSelected,
  createHeadingTitle,
  createStatisticsCounter,
  createSearchContainer,
} from "../dom/index.js";
import {
  countAllUsers,
  renderUserModal,
  countAtiveUsers,
  countUnableUsers,
  countAtiveInativePercentage,
  renderUsers,
} from "../user/index.js";
import {
  allUsers,
  allUsersAtive,
  allInactiveUsers,
  sortUsersByName,
  searchUserByName,
} from "../gestUserTask/index.js";

/* Lista de utilizadores */
export function loadUsersPage(userServices: UserService): void {
  /* ativa o menu Users */
  menuSelected("#menuUsers");
  //
  addElementInContainer(createHeadingTitle("h2", "GESTÃO DE UTILIZADORES"));
  //
  const userCounterSection = createUserCounter("userCounters");
  addElementInContainer(userCounterSection);
  //
  showUsersCounters(userServices.getAllUsers() as UserClass[], "utilizadores");
  //
  const searchContainer = showSearchContainer();
  addElementInContainer(searchContainer);
  //

  const usersContainer = renderUsers(
    userServices,
    userServices.getAllUsers() as UserClass[],
  );
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
    renderUsers(userServices, users as UserClass[]);
    showUsersCounters(users as UserClass[], "utilizadores");
  });

  ativeUsersBtn.addEventListener("click", () => {
    const usersAtive = allUsersAtive();
    renderUsers(userServices, usersAtive as UserClass[]);
    showUsersCounters(usersAtive as UserClass[], "activos");
  });

  unableUsersBtn.addEventListener("click", () => {
    const usersInactive = allInactiveUsers();
    renderUsers(userServices, usersInactive as UserClass[]);
    showUsersCounters(usersInactive as UserClass[], "inactivos");
  });

  // Adicionar event listeners aos botões de busca
  const addUserBtn = document.querySelector("#addUserBtn") as HTMLElement;
  addUserBtn.addEventListener("click", () => {
    // Lógica para adicionar usuário (ex.: abrir modal ou navegar)
    renderUserModal(userServices);
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
      renderUsers(userServices, sortedUsers as UserClass[]);
      showUsersCounters(sortedUsers as UserClass[]);
      // Atualize o texto ou ícone do botão
      sortUsersBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
  } else {
    console.warn("Elemento #sortUsersBtn não foi renderizado no DOM.");
  }

  //
  const searchUser = document.querySelector("#searchUser") as HTMLInputElement;
  if (searchUser) {
    searchUser.addEventListener("input", () => {
      const name = searchUser.value.toLowerCase();
      const filteredUsers = searchUserByName(name);
      renderUsers(userServices, filteredUsers as UserClass[]);
      showUsersCounters(filteredUsers as UserClass[]);
    });
  } else {
    console.warn("Elemento de busca de utilizadores não encontrado.");
  }
}
/* */
function createUserCounter(id: string): HTMLElement {
  //
  const allUsersBtn = createStatisticsCounter(
    "allUserSection",
    "allUsersBtn",
    "/src/assets/users.png",
    "utilizadores",
    "allUsersCounter",
  ) as HTMLElement;

  //
  const ativeUsersBtn = createStatisticsCounter(
    "ativeUsers",
    "ativeUsersBtn",
    "/src/assets/active.png",
    "ativos",
    "ativeUsersCounter",
  ) as HTMLElement;
  //
  const unableUsersBtn = createStatisticsCounter(
    "unableUsers",
    "unableUsersBtn",
    "/src/assets/inactive.png",
    "inativos",
    "unableUsersCounter",
  ) as HTMLElement;

  const ativeUsersPercentageBtn = createStatisticsCounter(
    "ativeUserPercentage",
    "ativeUsersPercentageBtn",
    "/src/assets/percentagem.png",
    "ativos %",
    "ativeUsersPercentageCounter",
  ) as HTMLElement;
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

function showUsersCounters(userList: UserClass[], type?: string): void {
  countAllUsers("#allUsersCounter", userList);
  countAtiveUsers("#ativeUsersCounter", userList);
  countUnableUsers("#unableUsersCounter", userList);
  countAtiveInativePercentage("#ativeUsersPercentageCounter", userList, type);
}

/* */
export function showSearchContainer(): HTMLElement {
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
