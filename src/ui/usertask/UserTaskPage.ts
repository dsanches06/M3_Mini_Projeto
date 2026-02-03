import { UserClass } from "../../models/index.js";
import { ITask } from "../../tasks/index.js";
import {
  dashBoard,
  removeCompletedTasks,
  renderModalUserAssignTask,
} from "./index.js";
import {
  addElementInContainer,
  createHeadingTitle,
  createSearchContainer,
  createSection,
  createStatisticsCounter,
} from "../dom/index.js";
import {
  countAllTasks,
  countCompletedTasks,
  countFilterTasks,
  countPendingTasks,
  renderTaskModal,
} from "../../ui/tasks/index.js";
import { showInfoBanner } from "../../helpers/infoBanner.js";
import { createNotificationsUI } from "../notifications/notificationsUI.js";

/* Lista de tarefas do utilizador */
export function loadUserTaskPage(user: UserClass): void {
  const notifications = createNotificationsUI();
  addElementInContainer(notifications);

  const headTitle = createHeadingTitle(
    "h2",
    `TAREFAS DE ${user.getName().toUpperCase()}`,
  );
  addElementInContainer(headTitle);
  //
  const userTaskCounterSection = createUserTaskCounter("userTaskCounters");
  addElementInContainer(userTaskCounterSection);
  //
  showUserTasksCounters(user.getTasks());
  //
  const searchContainer = showUserTaskSearchContainer();
  addElementInContainer(searchContainer);
  //
  const userTasksContainer = createSection("usersTaskContainer");
  addElementInContainer(userTasksContainer);
  //
  //showUserTask(user, user.getTasks());

  addElementInContainer(dashBoard(user));

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
  const filteredUserTaskBtn = userTaskCounterSection.querySelector(
    "#filteredUserTaskBtn",
  ) as HTMLElement;
  filteredUserTaskBtn.title = "Mostrar tarefas filtradas";

  allUserTasksBtn.addEventListener("click", () => {
    //showUserTask(user, user.getTasks());
    //   showUserTasksCounters(user.getTasks());
  });

  pendingUserTaskBtn.addEventListener("click", () => {
    //  const pendingTasks = user.pendingTasks();
    /// showUserTask(user, pendingTasks);
    // showUserTasksCounters(pendingTasks);
  });

  completedUserTaskBtn.addEventListener("click", () => {
    //const completedTasks = user.completedTasks();
    // showUserTask(user, completedTasks);
    // showUserTasksCounters(completedTasks);
  });

  // Adicionar event listeners aos botões de busca
  const addUserTaskBtn = document.querySelector(
    "#addUserTaskBtn",
  ) as HTMLElement;
  if (addUserTaskBtn) {
    addUserTaskBtn.addEventListener("click", () => {
      if (user.isActive()) {
        renderTaskModal(user);
      } else {
        showInfoBanner(
          `ERRO: ${user.getName()} está inativo e não pode criar tarefas.`,
          "error-banner",
        );
      }
    });
  } else {
    console.warn("Elemento #addUserTaskBtn não encontrado.");
  }

  // Adicionar event listeners aos botões de busca
  const assignUserTaskBtn = document.querySelector(
    "#assignUserTaskBtn",
  ) as HTMLElement;
  if (assignUserTaskBtn) {
    assignUserTaskBtn.addEventListener("click", () => {
      if (user.isActive()) {
        renderModalUserAssignTask(user);
      } else {
        showInfoBanner(
          `ERRO: ${user.getName()} está inativo e não pode ser atribuído a tarefas.`,
          "error-banner",
        );
      }
    });
  } else {
    console.warn("Elemento #assignUserTaskBtn não encontrado.");
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
      // showUserTask(user, sortedTasks);
      // showUserTasksCounters(sortedTasks, "filtered");
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
      // showUserTask(user, filteredTasks);
      // showUserTasksCounters(filteredTasks, "filtered");
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
      // showUserTask(user, user.getTasks());
      // showUserTasksCounters(user.getTasks());
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
  const filteredTaskBtn = createStatisticsCounter(
    "filterUserTasksSection",
    "filteredUserTaskBtn",
    "/src/assets/filtrar-tarefas.png",
    "filtrados",
    "filteredUserTasksCounter",
  ) as HTMLElement;
  //
  const sectionUserTasksCounter = createSection(`${id}`) as HTMLElement;
  sectionUserTasksCounter.classList.add("tasks-counters");
  sectionUserTasksCounter.append(
    allUserTasksBtn,
    pendingUserTaskBtn,
    completedUserTaskBtn,
    filteredTaskBtn,
  );
  return sectionUserTasksCounter;
}

/* */
function showUserTaskSearchContainer(): HTMLElement {
  const searchUserTaskContainer = createSearchContainer(
    "searchUserTaskContainer",
    { id: "searchUserTask", placeholder: "Procurar tarefa..." },
    [
      { id: "addUserTaskBtn", text: "Criar tarefa" },
      { id: "assignUserTaskBtn", text: "Atribuir tarefa" },
      { id: "sortUserTasksBtn", text: "Ordenar A-Z" },
      { id: "removeCompletedUserTaskBtn", text: "Remover concluídas" },
    ],
  );
  searchUserTaskContainer.classList.add("search-add-container");
  return searchUserTaskContainer;
}

export function showUserTasksCounters(
  filteredTask: ITask[],
  type?: string,
): void {
  countAllTasks("#allUserTasksCounter", filteredTask);
  countCompletedTasks("#completedUserTaskCounter", filteredTask);
  countPendingTasks("#pendingUserTasksCounter", filteredTask);
  countFilterTasks("#filteredUserTasksCounter", type!, filteredTask);
}
