import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import ITask from "../../models/task/ITask.js";
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
  countCompletedUserTasks,
  countPendingUserTasks,
  countAllTasks,
} from "./TaskCountersUI.js";
import renderAllTasks from "./TaskUI.js";
import Task from "../../models/task/Task.js";
import loadUsersPage from "../user/UserPage.js";
import {
  allUsersTasks,
  pendingTasks,
  completedTasks,
  searchTasksByTitle,
  sortTasksByTitle,
  removeAllCompletedTask,
} from "../gestUserTask/GestTaskUI.js";

/* Lista de tarefas de utilizadores */
export default function loadTasksPage(
  gestUserTask: GestUserTask,
  tasksList: ITask[],
): void {
  /* ativa o menu tarefas */
  menuSelected("#menuTasks");
  //
  addElementInContainer(createHeadingTitle("h2", "GESTÃO DE TAREFAS"));
  //
  const taskCounterSection = createTaskCounter("taskCounters") as HTMLElement;
  addElementInContainer(taskCounterSection);
  //
  showTasksCounters(tasksList);
  //
  const searchContainer = showSearchTaskContainer();
  addElementInContainer(searchContainer);
  //

  const TasksContainer = renderAllTasks(tasksList as Task[]);
  addElementInContainer(TasksContainer);

  // Adicionar event listeners aos botões de contador para filtrar
  const allTasksBtn = taskCounterSection.querySelector(
    "#allTasksBtn",
  ) as HTMLElement;
  const pendingTaskBtn = taskCounterSection.querySelector(
    "#pendingTaskBtn",
  ) as HTMLElement;
  const completedTaskBtn = taskCounterSection.querySelector(
    "#completedTaskBtn",
  ) as HTMLElement;

  allTasksBtn.addEventListener("click", () => {
    const tasks = allUsersTasks();
    renderAllTasks(tasks as Task[]);
    showTasksCounters(tasks as Task[]);
  });

  pendingTaskBtn.addEventListener("click", () => {
    const tasks = pendingTasks();
    renderAllTasks(tasks as Task[]);
    showTasksCounters(tasks as Task[]);
  });

  completedTaskBtn.addEventListener("click", () => {
    const tasks = completedTasks();
    renderAllTasks(tasks as Task[]);
    showTasksCounters(tasks as Task[]);
  });

  // Adicionar event listeners aos botões de busca
  const addUserBtn = document.querySelector("#addUserBtn") as HTMLElement;

  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      // Lógica para adicionar usuário (ex.: abrir modal ou navegar)
      alert(
        "Funcionalidade para adicionar usuário - implementar modal ou navegação.",
      );
    });
  }

  const sortTasksBtn = document.querySelector("#sortTasksBtn") as HTMLElement;

  if (sortTasksBtn) {
    //Crie uma variável de controle de estado
    let isAscending = true;
    sortTasksBtn.addEventListener("click", () => {
      const sortedUsers = sortTasksByTitle(isAscending);
      //Inverta o estado para o próximo clique
      isAscending = !isAscending;
      // Mostrar os utilizadores ordenados
      renderAllTasks(sortedUsers as Task[]);
      showTasksCounters(sortedUsers as Task[]);
      // Atualize o texto ou ícone do botão
      sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
  } else {
    console.warn("Elemento #sortTasksBtn não foi renderizado no DOM.");
  }

  //obter o menu task
  const menuUsers = document.querySelector("#menuUsers") as HTMLAnchorElement;
  menuUsers.addEventListener("click", () => {
    //Limpa o container antes de mostrar os utilizadores
    clearContainer();
    // carrega a pagina dinamica de utilizadores
    loadUsersPage(gestUserTask);
  });
}

// Adicionar event listeners aos botões de busca
const removeAllCompletedTaskBtn = document.querySelector(
  "#removeAllCompletedTaskBtn",
) as HTMLElement;
if (removeAllCompletedTaskBtn) {
  removeAllCompletedTaskBtn.addEventListener("click", () => {
    const tasks = removeAllCompletedTask();
    renderAllTasks(tasks as Task[]);
    showTasksCounters(tasks as Task[]);
  });
}
/* */
function createTaskCounter(id: string): HTMLElement {
  //
  const allTasksBtn = createStatisticsCounter(
    "allTaskSection",
    "allTasksBtn",
    "../../../images/tarefa.png",
    "tarefas",
    "allTasksCounter",
  ) as HTMLElement;

  //
  const ativeTasksBtn = createStatisticsCounter(
    "pendingTaskSection",
    "pendingTaskBtn",
    "../../../images/pendente.png",
    "pendentes",
    "pendingTasksCounter",
  ) as HTMLElement;
  //
  const unableTasksBtn = createStatisticsCounter(
    "completedTaskSection",
    "completedTaskBtn",
    "../../../images/tarefa-concluida.png",
    "concluídos",
    "completedTaskCounter",
  ) as HTMLElement;
  //
  const sectionTasksCounter = createSection(`${id}`) as HTMLElement;
  sectionTasksCounter.classList.add("tasks-counters");
  sectionTasksCounter.append(allTasksBtn, ativeTasksBtn, unableTasksBtn);
  return sectionTasksCounter;
}

export function showTasksCounters(taskList: ITask[]): void {
  countAllTasks("#countAllTasks", taskList);
  countCompletedUserTasks("#countCompletedUserTasks", taskList);
  countPendingUserTasks("#countPendingUserTasks", taskList);
}

/* */
function showSearchTaskContainer(): HTMLElement {
  const searchTaskContainer = createSearchContainer(
    "searchTaskContainer",
    { id: "searchTask", placeholder: "Procurar tarefa..." },
    [
      { id: "addTaskBtn", text: "Adicionar tarefa" },
      { id: "sortTasksBtn", text: "Ordenar A-Z" },
      { id: "removeAllCompletedTaskBtn", text: "Remover tarefas concluidas" },
    ],
  );
  searchTaskContainer.classList.add("search-add-container");
  return searchTaskContainer;
}
