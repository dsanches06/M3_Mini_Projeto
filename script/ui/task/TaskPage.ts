import { adicionarElementoNoContainer } from "../container/ContainerSection.js";
import {
  createHeadingTitle,
  createSection,
  createFigureWithImage,
  createInput,
  createButton,
} from "../container/CreatePage.js";
import GestUserTask from "./../../models/gestUserTask/gestUserTask.js";

export default function loadTaskPage(): void {
  const titleHeading = createHeadingTitle(
    "GESTOR DE TAREFAS"
  ) as HTMLHeadingElement;
  titleHeading.classList.add("taskPageTitle");

  const sectionCounter = createSection("taskCounters") as HTMLElement;
  sectionCounter.classList.add("taskCounterSection");

  /* Seção do contador de todas as tarefas */
  const sectionAllTask = allTaskCounter("sectionAllTask") as HTMLElement;
  sectionAllTask.classList.add("statistics");

  /* Seção do contador de tarefas pendentes */
  const sectionPendingTask = pendingTaskCounter(
    "sectionPendingTask"
  ) as HTMLElement;
  sectionPendingTask.classList.add("statistics");

  /* Seção do contador de tarefas concluídas */
  const sectionCompletedTask = completedTaskCounter(
    "sectionCompletedTask"
  ) as HTMLElement;
  sectionCompletedTask.classList.add("statistics");

  sectionCounter.appendChild(sectionAllTask);
  sectionCounter.appendChild(sectionPendingTask);
  sectionCounter.appendChild(sectionCompletedTask);

  const taskContainer = createSection("taskContainer") as HTMLElement;
  taskContainer.classList.add("task-container");

  const sectionAddSearch = sectionAddContainer("sectionAddSearch");
  sectionAddSearch.classList.add("search-add-container");

  adicionarElementoNoContainer(titleHeading);
  adicionarElementoNoContainer(sectionCounter);
  adicionarElementoNoContainer(taskContainer);
  adicionarElementoNoContainer(sectionAddSearch);
}

/* Função para criar a seção do contador de todas as tarefas */
function allTaskCounter(id: string): HTMLElement {
  const figureAllTask = createFigureWithImage(
    "allTaskBtn",
    "task icon",
    "../images/tarefa.png",
    "tarefas"
  ) as HTMLElement;
  const totalTasks = createSection("totalTasks") as HTMLElement;
  totalTasks.classList.add("counter-item");

  const sectionAllTask = createSection(id) as HTMLElement;
  sectionAllTask.appendChild(figureAllTask);
  sectionAllTask.appendChild(totalTasks);
  return sectionAllTask;
}

/* Função para criar a seção do contador de tarefas pendentes */
function pendingTaskCounter(id: string): HTMLElement {
  const figureAllTask = createFigureWithImage(
    "taskPendingBtn",
    "task pending icon",
    "../images/pendente.png",
    "pendentes"
  ) as HTMLElement;
  const pendingTasks = createSection("pendingTasks") as HTMLElement;
  pendingTasks.classList.add("counter-item");

  const sectionPendingTask = createSection(id) as HTMLElement;
  sectionPendingTask.appendChild(figureAllTask);
  sectionPendingTask.appendChild(pendingTasks);
  return sectionPendingTask;
}

/* Função para criar a seção do contador de tarefas concluídas */
function completedTaskCounter(id: string): HTMLElement {
  const figureCompletedTask = createFigureWithImage(
    "taskCompletedBtn",
    "task completed icon",
    "../images/tarefa-concluida.png",
    "concluídos"
  ) as HTMLElement;
  const completedTasks = createSection("completedTasks") as HTMLElement;
  completedTasks.classList.add("counter-item");

  const sectionCompletedTask = createSection(id) as HTMLElement;
  sectionCompletedTask.appendChild(figureCompletedTask);
  sectionCompletedTask.appendChild(completedTasks);

  return sectionCompletedTask;
}

function sectionAddContainer(id: string): HTMLElement {
  const inputSearch = createInput("searchTask", "text") as HTMLInputElement;
  inputSearch.placeholder = "Procurar tarefa por título...";

  const sectionGroup = createSection("sectionGroup") as HTMLElement;
  sectionGroup.classList.add("form-group");

  const btnSortTasks = createButton(
    "sortTasksBtn",
    "Ordenar A-Z",
    "button"
  ) as HTMLButtonElement;

  const removeAllCompletedTaskBtn = createButton(
    "removeAllCompletedTaskBtn",
    "Remover Tarefas Concluídas",
    "button"
  ) as HTMLButtonElement;
  sectionGroup.appendChild(btnSortTasks);
  sectionGroup.appendChild(removeAllCompletedTaskBtn);

  const sectionSearch = createSection(id) as HTMLElement;
  sectionSearch.appendChild(inputSearch);
  sectionSearch.appendChild(sectionGroup);
  return sectionSearch;
}
