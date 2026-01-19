import { addElementInContainer } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection, createInput, createButton, } from "../dom/CreatePage.js";
import { createStatisticsCounter } from "../dom/SectionCounter.js";
export default function loadTaskPage(testUserTask, user) {
    const titleHeading = createHeadingTitle("GESTOR DE TAREFAS");
    titleHeading.classList.add("taskPageTitle");
    /* Secção do contador de todas as tarefas */
    const sectionCounter = createTaskCounter("taskCounters");
    sectionCounter.classList.add("taskCounterSection");
    const taskContainer = createSection("taskContainer");
    taskContainer.classList.add("task-container");
    const sectionAddSearch = sectionSearchTask("sectionAddSearch");
    sectionAddSearch.classList.add("search-add-container");
    addElementInContainer(titleHeading);
    addElementInContainer(sectionCounter);
    addElementInContainer(taskContainer);
    addElementInContainer(sectionAddSearch);
}
/* */
function createTaskCounter(id) {
    // Para Todas as Tarefas:
    const allTasks = createStatisticsCounter("allTask", "allTaskBtn", "../images/tarefa.png", "tarefas", "totalTasks");
    // Para Tarefas Pendentes:
    const pendingTasks = createStatisticsCounter("taskPending", "taskPendingBtn", "../images/pendente.png", "pendentes", "pendingTasks");
    // Para Tarefas  Concluídas:
    const completed = createStatisticsCounter("taskCompleted", "taskCompletedBtn", "concluídos", "tarefa-concluida.png", "completedTasks");
    const sectionCounter = createSection(`${id}`);
    sectionCounter.append(allTasks, pendingTasks, completed);
    return sectionCounter;
}
/* */
function sectionSearchTask(id) {
    const inputSearch = createInput("searchTask", "text");
    inputSearch.placeholder = "Procurar tarefa por título...";
    const btnSort = createButton("sortTasksBtn", "Ordenar A-Z", "button");
    const btnRemove = createButton("removeAllCompletedTaskBtn", "Remover Tarefas Concluídas", "button");
    const sectionGroup = createSection("sectionGroup");
    sectionGroup.classList.add("form-group");
    sectionGroup.append(btnSort, btnRemove);
    const mainSection = createSection(id);
    mainSection.append(inputSearch, sectionGroup);
    return mainSection;
}
