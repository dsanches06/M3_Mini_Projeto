import User from "../../models/user/User.js";
import { addElementInContainer } from "../dom/ContainerSection.js";
import {
  createHeadingTitle,
  createSection,
  createFigureWithImage,
  createInput,
  createButton,
} from "../dom/CreatePage.js";
import { createStatisticsCounter } from "../dom/SectionCounter.js";
import GestUserTask from "./../../models/gestUserTask/gestUserTask.js";

export default function loadTaskPage(
  testUserTask: GestUserTask,
  user?: User,
): void {
  const titleHeading = createHeadingTitle(
    "GESTOR DE TAREFAS",
  ) as HTMLHeadingElement;
  titleHeading.classList.add("taskPageTitle");

  /* Secção do contador de todas as tarefas */
  const sectionCounter = createTaskCounter("taskCounters") as HTMLElement;
  sectionCounter.classList.add("taskCounterSection");

  const taskContainer = createSection("taskContainer") as HTMLElement;
  taskContainer.classList.add("task-container");

  const sectionAddSearch = sectionSearchTask("sectionAddSearch");
  sectionAddSearch.classList.add("search-add-container");

  addElementInContainer(titleHeading);
  addElementInContainer(sectionCounter);
  addElementInContainer(taskContainer);
  addElementInContainer(sectionAddSearch);
}

/* */
function createTaskCounter(id: string): HTMLElement {
  // Para Todas as Tarefas:
  const allTasks = createStatisticsCounter(
    "allTask",
    "allTaskBtn",
    "../images/tarefa.png",
    "tarefas",
    "totalTasks",
  ) as HTMLElement;
  // Para Tarefas Pendentes:
  const pendingTasks = createStatisticsCounter(
    "taskPending",
    "taskPendingBtn",
    "../images/pendente.png",
    "pendentes",
    "pendingTasks",
  ) as HTMLElement;
  // Para Tarefas  Concluídas:
  const completed = createStatisticsCounter(
    "taskCompleted",
    "taskCompletedBtn",
    "concluídos",
    "tarefa-concluida.png",
    "completedTasks",
  );
  const sectionCounter = createSection(`${id}`) as HTMLElement;
  sectionCounter.append(allTasks, pendingTasks, completed);
  return sectionCounter;
}

/* */
function sectionSearchTask(id: string): HTMLElement {
  const inputSearch = createInput("searchTask", "text") as HTMLInputElement;
  inputSearch.placeholder = "Procurar tarefa por título...";

  const btnSort = createButton("sortTasksBtn", "Ordenar A-Z", "button");
  const btnRemove = createButton(
    "removeAllCompletedTaskBtn",
    "Remover Tarefas Concluídas",
    "button",
  );

  const sectionGroup = createSection("sectionGroup") as HTMLElement;
  sectionGroup.classList.add("form-group");
  sectionGroup.append(btnSort, btnRemove);

  const mainSection = createSection(id) as HTMLElement;
  mainSection.append(inputSearch, sectionGroup);

  return mainSection;
}
