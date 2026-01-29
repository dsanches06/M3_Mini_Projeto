import { showInfoBanner } from "../../helpers/index.js";
import { showTasksCounters, renderAllTasks } from "./index.js";
import {
  allTasks,
  completedTasks,
  pendingTasks,
  removeAllCompletedTask,
  searchTasksByTitle,
  sortTasksByTitle,
} from "../gestUserTask/index.js";
import {
  addElementInContainer,
  createSection,
  menuSelected,
  createHeadingTitle,
  createStatisticsCounter,
  createSearchContainer,
  clearContainer,
} from "../dom/index.js";
import { ITask } from "../../tasks/index.js";

/* Lista de tarefas  */
export function loadTasksPage(tasksList: ITask[]): void {
  /* ativa o menu tarefas */
  menuSelected("#menuTasks");

  clearContainer();
  addElementInContainer(createHeadingTitle("h2", "GESTÃO DE TAREFAS"));

  const taskCounterSection = createTaskCounter("taskCounters") as HTMLElement;
  addElementInContainer(taskCounterSection);

  showTasksCounters("all", tasksList);

  const searchContainer = showSearchTaskContainer();
  addElementInContainer(searchContainer);

  const tasksContainer = renderAllTasks(tasksList);
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
    const tasks = allTasks(tasksList);
    loadTasksPage(tasks);
    renderAllTasks(tasks);
    showTasksCounters("all", tasks);
  });

  pendingTaskBtn.addEventListener("click", () => {
    const tasks = pendingTasks(tasksList);
    loadTasksPage(tasks);
    renderAllTasks(tasks);
    showTasksCounters("pending", tasks);
  });

  completedTaskBtn.addEventListener("click", () => {
    const tasks = completedTasks(tasksList);
    loadTasksPage(tasks);
    renderAllTasks(tasks);
    showTasksCounters("completed", tasks);
  });

  const sortTasksBtn = document.querySelector("#sortTasksBtn") as HTMLElement;
  if (sortTasksBtn) {
    //Crie uma variável de controle de estado
    let isAscending = true;
    sortTasksBtn.addEventListener("click", () => {
      const sortedTasks = sortTasksByTitle(tasksList, isAscending);
      //Inverta o estado para o próximo clique
      isAscending = !isAscending;
      // Mostrar as tarefas ordenadas
      loadTasksPage(sortedTasks);
      renderAllTasks(sortedTasks);
      showTasksCounters("filtrados", sortedTasks);
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
      const filteredTasks = searchTasksByTitle(tasksList, searchTerm);
      loadTasksPage(filteredTasks);
      renderAllTasks(filteredTasks);
      showTasksCounters("filtrados", filteredTasks);
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
      const removedTasks = removeAllCompletedTask(tasksList);

      if (removedTasks.length > 0) {
        const completedTaskCount = removedTasks.filter((task) =>
          task.getCompleted(),
        ).length;
        if (completedTaskCount <= 0) {
          showInfoBanner(
            "Não há tarefa concluída para remover.",
            "error-banner",
          );
        }
        renderAllTasks(removedTasks);
        showTasksCounters("all", removedTasks);
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
    "/src/assets/tarefa.png",
    "tarefas",
    "allTasksCounter",
  ) as HTMLElement;

  //
  const pendingTaskBtn = createStatisticsCounter(
    "pendingTaskSection",
    "pendingTaskBtn",
    "/src/assets/pendente.png",
    "pendentes",
    "pendingTasksCounter",
  ) as HTMLElement;
  //
  const completedTaskBtn = createStatisticsCounter(
    "completedTaskSection",
    "completedTaskBtn",
    "/src/assets/tarefa-concluida.png",
    "concluídos",
    "completedTaskCounter",
  ) as HTMLElement;

  const filteredTaskBtn = createStatisticsCounter(
    "filterTasksSection",
    "filterTasksCounter",
    "/src/assets/tarefa-concluida.png",
    "filtrados",
    "filterTasksCounter",
  ) as HTMLElement;

  //
  const sectionTasksCounter = createSection(`${id}`) as HTMLElement;
  sectionTasksCounter.classList.add("tasks-counters");
  sectionTasksCounter.append(allTasksBtn, pendingTaskBtn, completedTaskBtn);
  return sectionTasksCounter;
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
