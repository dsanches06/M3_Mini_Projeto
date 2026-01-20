import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import Task from "../../models/task/Task.js";
import { addElementInContainer } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import {
  createSearchContainer,
  createStatisticsCounter,
} from "../dom/SectionCounter.js";
import {
  countCompletedUserTasks,
  countPendingUserTasks,
  countAllTasks,
} from "../task/TaskCountersUI.js";
import showUserTask from "./UserTaskUI.js";
import { removeCompletedTasks } from "./UserTaskCRUD.js";
import createAndAppendTaskForm from "./UserTaskForm.js";

/* Lista de tarefas do utilizador */
export default function loadUserTaskPage(
  gestUserTask: GestUserTask,
  user: User,
): void {
  //
  addElementInContainer(
    createHeadingTitle("h2", `TAREFAS DE ${user.name.toUpperCase()}`),
  );
  //
  const userTaskCounterSection = createUserTaskCounter("userTaskCounters");
  addElementInContainer(userTaskCounterSection);
  //
  showUserTaskCounters(user.tasks as Task[]);
  //
  const searchContainer = showUserTaskSearchContainer();
  addElementInContainer(searchContainer);
  //

  const userTasksContainer = createSection("usersTaskContainer");
  addElementInContainer(userTasksContainer);
  //

  showUserTask(user, user.tasks as Task[]);

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
    showUserTask(user, user.tasks as Task[]);
    showUserTaskCounters(user.tasks as Task[]);
  });

  pendingUserTaskBtn.addEventListener("click", () => {
    const pendingTasks = user.tasks.filter((task) => !task.completed);
    showUserTask(user, pendingTasks as Task[]);
    showUserTaskCounters(pendingTasks as Task[]);
  });

  completedUserTaskBtn.addEventListener("click", () => {
    const completedTasks = user.tasks.filter((task) => task.completed);
    showUserTask(user, completedTasks as Task[]);
    showUserTaskCounters(completedTasks as Task[]);
  });

  // Adicionar event listeners aos botões de busca
  const addUserTaskBtn = document.querySelector(
    "#addUserTaskBtn",
  ) as HTMLElement;
  addUserTaskBtn.addEventListener("click", () => {
    // Abrir modal para adicionar tarefa
    createAndAppendTaskForm("containerSection", user, gestUserTask);
    const modal = document.getElementById("modalUserTaskForm") as HTMLElement;
    if (modal) modal.style.display = "block";
  });

  const sortUserTasksBtn = document.querySelector(
    "#sortUserTasksBtn",
  ) as HTMLElement;

  if (sortUserTasksBtn) {
    //Crie uma variável de controle de estado
    let isAscending = true;
    sortUserTasksBtn.addEventListener("click", () => {
      const sortedTasks = [...user.tasks].sort((a, b) => {
        if (isAscending) {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
      //Inverta o estado para o próximo clique
      isAscending = !isAscending;
      // Mostrar as tarefas ordenadas
      showUserTask(user, sortedTasks as Task[]);
      showUserTaskCounters(sortedTasks as Task[]);
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
      const filteredTasks = user.tasks.filter((task) =>
        task.title.toLowerCase().includes(name),
      );
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
      showUserTaskCounters(user.tasks as Task[]);
    });
  }
}
/* */
function createUserTaskCounter(id: string): HTMLElement {
  //
  const allUserTasksBtn = createStatisticsCounter(
    "allUserTaskSection",
    "allUserTasksBtn",
    "../../../images/tarefa.png",
    "tarefas",
    "allUserTasksCounter",
  ) as HTMLElement;

  //
  const pendingUserTaskBtn = createStatisticsCounter(
    "pendingUserTaskSection",
    "pendingUserTaskBtn",
    "../../../images/pendente.png",
    "pendentes",
    "pendingUserTasksCounter",
  ) as HTMLElement;
  //
  const completedUserTaskBtn = createStatisticsCounter(
    "completedUserTaskSection",
    "completedUserTaskBtn",
    "../../../images/tarefa-concluida.png",
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

export function showUserTaskCounters(tasks: Task[]): void {
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
