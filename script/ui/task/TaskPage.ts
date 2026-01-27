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
import {
  allUsersTasks,
  pendingTasks,
  completedTasks,
  searchTasksByTitle,
  sortTasksByTitle,
  removeAllCompletedTask,
} from "../gestUserTask/GestTaskUI.js";
import { showInfoBanner } from "../../helpers/infoBanner.js";

/* Lista de tarefas de utilizadores */
export default function loadTasksPage(tasksList: ITask[]): void {
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

  const tasksContainer = renderAllTasks(tasksList as Task[]);
  addElementInContainer(tasksContainer);

  // Adicionar event listeners aos botões de contador para filtrar
  const allTasksBtn = taskCounterSection.querySelector(
    "#allTasksBtn",
  ) as HTMLElement;
  allTasksBtn.title = "Mostrar todas as tarefas";
  const pendingTaskBtn = taskCounterSection.querySelector(
    "#pendingTaskBtn",
  ) as HTMLElement;
  pendingTaskBtn.title = "Mostrar tarefas pendentes";
  const completedTaskBtn = taskCounterSection.querySelector(
    "#completedTaskBtn",
  ) as HTMLElement;
  completedTaskBtn.title = "Mostrar tarefas concluídas";

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

  const sortTasksBtn = document.querySelector("#sortTasksBtn") as HTMLElement;

  if (sortTasksBtn) {
    //Crie uma variável de controle de estado
    let isAscending = true;
    sortTasksBtn.addEventListener("click", () => {
      const sortedTasks = sortTasksByTitle(isAscending);
      //Inverta o estado para o próximo clique
      isAscending = !isAscending;
      // Mostrar as tarefas ordenadas
      renderAllTasks(sortedTasks as Task[]);
      showTasksCounters(sortedTasks as Task[]);
      // Atualize o texto ou ícone do botão
      sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
  } else {
    console.warn("Elemento #sortTasksBtn não foi renderizado no DOM.");
  }

  // Adicionar event listeners aos botões de busca
  const searchTaskInput = document.querySelector(
    "#searchTask",
  ) as HTMLInputElement;
  if (searchTaskInput) {
    searchTaskInput.addEventListener("input", () => {
      const searchTerm = searchTaskInput.value;
      const filteredTasks = searchTasksByTitle(searchTerm);
      renderAllTasks(filteredTasks as Task[]);
      showTasksCounters(filteredTasks as Task[]);
    });
  } else {
    console.warn("Elemento de busca de tarefas não encontrado.");
  }

  // Adicionar event listeners aos botões de busca
  const removeAllCompletedTaskBtn = document.querySelector(
    "#removeAllCompletedTaskBtn",
  ) as HTMLElement;
  if (removeAllCompletedTaskBtn) {
    removeAllCompletedTaskBtn.addEventListener("click", () => {
      const removedTasks = removeAllCompletedTask();
     
      if (removedTasks.length > 0) {
         const completedTaskCount = removedTasks.filter(
        (task) => task.completed,
      ).length;
        if (completedTaskCount <= 0) {
          showInfoBanner(
            "Não há tarefa concluída para remover.",
            "error-banner",
          );
        }
        renderAllTasks(removedTasks as Task[]);
        showTasksCounters(removedTasks as Task[]);
      } else {
        showInfoBanner("Não há tarefa concluída para remover.", "error-banner");
      }
    });
  }
}
/* */
function createTaskCounter(id: string): HTMLElement {
  //
  const allTasksBtn = createStatisticsCounter(
    "allTaskSection",
    "allTasksBtn",
    "./images/tarefa.png",
    "tarefas",
    "allTasksCounter",
  ) as HTMLElement;

  //
  const pendingTaskBtn = createStatisticsCounter(
    "pendingTaskSection",
    "pendingTaskBtn",
    "./images/pendente.png",
    "pendentes",
    "pendingTasksCounter",
  ) as HTMLElement;
  //
  const completedTaskBtn = createStatisticsCounter(
    "completedTaskSection",
    "completedTaskBtn",
    "./images/tarefa-concluida.png",
    "concluídos",
    "completedTaskCounter",
  ) as HTMLElement;
  //
  const sectionTasksCounter = createSection(`${id}`) as HTMLElement;
  sectionTasksCounter.classList.add("tasks-counters");
  sectionTasksCounter.append(allTasksBtn, pendingTaskBtn, completedTaskBtn);
  return sectionTasksCounter;
}

export function showTasksCounters(taskList: ITask[]): void {
  countAllTasks("#allTasksCounter", taskList);
  countCompletedUserTasks("#completedTaskCounter", taskList);
  countPendingUserTasks("#pendingTasksCounter", taskList);
}

/* */
function showSearchTaskContainer(): HTMLElement {
  const searchTaskContainer = createSearchContainer(
    "searchTaskContainer",
    { id: "searchTask", placeholder: "Procurar tarefa..." },
    [
      { id: "sortTasksBtn", text: "Ordenar A-Z" },
      { id: "removeAllCompletedTaskBtn", text: "Remover tarefas concluídas" },
    ],
  );
  searchTaskContainer.classList.add("search-add-container");
  return searchTaskContainer;
}
