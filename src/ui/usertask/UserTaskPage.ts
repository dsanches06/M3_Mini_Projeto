import { UserClass } from "../../models/index.js";
import { removeCompletedTasks } from "./index.js";
import { showUserTask } from "../usertask/index.js";
import {
  addElementInContainer,
  createHeadingTitle,
  createSearchContainer,
  createSection,
  createStatisticsCounter,
} from "../dom/index.js";
import { showTasksCounters } from "../task/index.js";
import { renderModal } from "../../ui/task/index.js";

/* Lista de tarefas do utilizador */
export function loadUserTaskPage(user: UserClass): void {
  const headTitle = createHeadingTitle(
    "h2",
    `TAREFAS DE ${user.getName().toUpperCase()}`,
  );
  addElementInContainer(headTitle);
  //
  const userTaskCounterSection = createUserTaskCounter("userTaskCounters");
  addElementInContainer(userTaskCounterSection);
  //
  showTasksCounters("all", user.getTasks());
  //
  const searchContainer = showUserTaskSearchContainer();
  addElementInContainer(searchContainer);
  //

  const userTasksContainer = createSection("usersTaskContainer");
  addElementInContainer(userTasksContainer);
  //

  showUserTask(user, user.getTasks());

  // Adicionar event listeners aos botões de contador para filtrar
  const allUserTasksBtn = userTaskCounterSection.querySelector(
    "#allUserTasksBtn",
  ) as HTMLElement;
  allUserTasksBtn.title = "Mostrar todas as tarefas";
  const pendingUserTaskBtn = userTaskCounterSection.querySelector(
    "#pendingUserTaskBtn",
  ) as HTMLElement;
  pendingUserTaskBtn.title = "Mostrar tarefas pendentes";
  const completedUserTaskBtn = userTaskCounterSection.querySelector(
    "#completedUserTaskBtn",
  ) as HTMLElement;
  completedUserTaskBtn.title = "Mostrar tarefas concluídas";

  allUserTasksBtn.addEventListener("click", () => {
    showUserTask(user, user.getTasks());
    showTasksCounters("all", user.getTasks());
  });

  pendingUserTaskBtn.addEventListener("click", () => {
    const pendingTasks = user.pendingTasks();
    showUserTask(user, pendingTasks);
    showTasksCounters("pending", pendingTasks);
  });

  completedUserTaskBtn.addEventListener("click", () => {
    const completedTasks = user.completedTasks();
    showUserTask(user, completedTasks);
    showTasksCounters("completed", completedTasks);
  });

  // Adicionar event listeners aos botões de busca
  const addUserTaskBtn = document.querySelector(
    "#addUserTaskBtn",
  ) as HTMLElement;
  if (addUserTaskBtn) {
    addUserTaskBtn.addEventListener("click", () => {
      renderModal(user);
      showUserTask(user, user.getTasks());
      showTasksCounters("all", user.getTasks());
    });
  } else {
    console.warn("Elemento #addUserTaskBtn não encontrado.");
  }

  const sortUserTasksBtn = document.querySelector(
    "#sortUserTasksBtn",
  ) as HTMLElement;

  if (sortUserTasksBtn) {
    //Crie uma variável de controle de estado
    let isAscending = true;
    sortUserTasksBtn.addEventListener("click", () => {
      const sortedTasks = [...user.getTasks()].sort((a, b) => {
        if (isAscending) {
          return a.getTitle().localeCompare(b.getTitle());
        } else {
          return b.getTitle().localeCompare(a.getTitle());
        }
      });
      //Inverta o estado para o próximo clique
      isAscending = !isAscending;
      // Mostrar as tarefas ordenadas
      showUserTask(user, sortedTasks);
      showTasksCounters("filtered", sortedTasks);
      // Atualize o texto ou ícone do botão
      sortUserTasksBtn.textContent = isAscending
        ? "Ordenar A-Z"
        : "Ordenar Z-A";
    });
  } else {
    console.warn("Elemento #sortUserTasksBtn não foi renderizado no DOM.");
  }

  const searchUserTask = document.querySelector(
    "#searchUserTask",
  ) as HTMLInputElement;
  if (searchUserTask) {
    searchUserTask.addEventListener("input", () => {
      const name = searchUserTask.value.toLowerCase();
      const filteredTasks = user
        .getTasks()
        .filter((task) => task.getTitle().toLowerCase().includes(name));
      showUserTask(user, filteredTasks);
      showTasksCounters("filtered", filteredTasks);
    });
  } else {
    console.warn("Elemento de busca de tarefas do utilizador não encontrado.");
  }

  // Adicionar event listeners aos botões de busca
  const removeCompletedUserTaskBtn = document.querySelector(
    "#removeCompletedUserTaskBtn",
  ) as HTMLElement;
  if (removeCompletedUserTaskBtn) {
    removeCompletedUserTaskBtn.addEventListener("click", () => {
      removeCompletedTasks(user);
    });
  }
}
/* */
function createUserTaskCounter(id: string): HTMLElement {
  //
  const allUserTasksBtn = createStatisticsCounter(
    "allUserTaskSection",
    "allUserTasksBtn",
    "/src/assets/tarefa.png",
    "tarefas",
    "allUserTasksCounter",
  ) as HTMLElement;

  //
  const pendingUserTaskBtn = createStatisticsCounter(
    "pendingUserTaskSection",
    "pendingUserTaskBtn",
    "/src/assets/pendente.png",
    "pendentes",
    "pendingUserTasksCounter",
  ) as HTMLElement;
  //
  const completedUserTaskBtn = createStatisticsCounter(
    "completedUserTaskSection",
    "completedUserTaskBtn",
    "/src/assets/tarefa-concluida.png",
    "concluídos",
    "completedUserTaskCounter",
  ) as HTMLElement;
  //
  const sectionUserTasksCounter = createSection(`${id}`) as HTMLElement;
  sectionUserTasksCounter.classList.add("tasks-counters");
  sectionUserTasksCounter.append(
    allUserTasksBtn,
    pendingUserTaskBtn,
    completedUserTaskBtn,
  );
  return sectionUserTasksCounter;
}

/* */
function showUserTaskSearchContainer(): HTMLElement {
  const searchUserTaskContainer = createSearchContainer(
    "searchUserTaskContainer",
    { id: "searchUserTask", placeholder: "Procurar tarefa..." },
    [
      { id: "addUserTaskBtn", text: "Adicionar tarefa" },
      { id: "sortUserTasksBtn", text: "Ordenar A-Z" },
      { id: "removeCompletedUserTaskBtn", text: "Remover tarefas concluídas" },
    ],
  );
  searchUserTaskContainer.classList.add("search-add-container");
  return searchUserTaskContainer;
}
