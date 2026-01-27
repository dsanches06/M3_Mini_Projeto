import UserService from "../../services/userService.js";
import UserClass from "../../models/UserClass.js";
import { addElementInContainer } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import Task from "../../tasks/Task.js";
import showUserTask from "./UserTaskUI.js";
import createAndAppendTaskForm from "./UserTaskForm.js";
import { removeCompletedTasks } from "./UserTaskCRUD.js";
import {
  createStatisticsCounter,
  createSearchContainer,
} from "../dom/SectionCounter.js";
import {
  countAllTasks,
  countCompletedUserTasks,
  countPendingUserTasks,
} from "../task/TaskCountersUI.js";
import ITask from "tasks/ITask.js";

/* Lista de tarefas do utilizador */
export default function loadUserTaskPage(
  serviceUsers: UserService,
  user: UserClass,
): void {
  //
  addElementInContainer(
    createHeadingTitle("h2", `TAREFAS DE ${user.getName().toUpperCase()}`),
  );
  //
  const userTaskCounterSection = createUserTaskCounter("userTaskCounters");
  addElementInContainer(userTaskCounterSection);
  //
  showUserTaskCounters(user.getTasks());
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
    showUserTask(user, user.getTasks() as Task[]);
    showUserTaskCounters(user.getTasks() as Task[]);
  });

  pendingUserTaskBtn.addEventListener("click", () => {
    const pendingTasks = user.pendingTasks();
    showUserTask(user, pendingTasks as Task[]);
    showUserTaskCounters(pendingTasks as Task[]);
  });

  completedUserTaskBtn.addEventListener("click", () => {
    const completedTasks = user.completedTasks();
    showUserTask(user, completedTasks as Task[]);
    showUserTaskCounters(completedTasks as Task[]);
  });

  // Adicionar event listeners aos botões de busca
  const addUserTaskBtn = document.querySelector(
    "#addUserTaskBtn",
  ) as HTMLElement;
  if (addUserTaskBtn) {
    addUserTaskBtn.addEventListener("click", () => {
      // Abrir modal para adicionar tarefa
      createAndAppendTaskForm("containerSection", user, serviceUsers);
      const modal = document.getElementById("modalUserTaskForm") as HTMLElement;
      if (modal) modal.style.display = "block";
      // Atualizar a lista de tarefas para todos os utilizadores
      showUserTask(user, user.getTasks() as Task[]);
      showUserTaskCounters(user.getTasks() as Task[]);
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
      showUserTask(user, sortedTasks as Task[]);
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
      showUserTask(user, filteredTasks as Task[]);
      showUserTaskCounters(filteredTasks as Task[]);
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
    "./images/tarefa.png",
    "tarefas",
    "allUserTasksCounter",
  ) as HTMLElement;

  //
  const pendingUserTaskBtn = createStatisticsCounter(
    "pendingUserTaskSection",
    "pendingUserTaskBtn",
    "./images/pendente.png",
    "pendentes",
    "pendingUserTasksCounter",
  ) as HTMLElement;
  //
  const completedUserTaskBtn = createStatisticsCounter(
    "completedUserTaskSection",
    "completedUserTaskBtn",
    "./images/tarefa-concluida.png",
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

export function showUserTaskCounters(tasks: ITask[]): void {
  countAllTasks("#allUserTasksCounter", tasks);
  countCompletedUserTasks("#completedUserTaskCounter", tasks);
  countPendingUserTasks("#pendingUserTasksCounter", tasks);
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
