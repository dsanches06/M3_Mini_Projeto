import { adicionarElementoNoContainer } from "../container/ContainerSection.js";
import { createHeadingTitle, createSection, createFigureWithImage, createInput, createButton, } from "../container/CreatePage.js";
export default function loadTaskPage() {
    const titleHeading = createHeadingTitle("GESTOR DE TAREFAS");
    titleHeading.classList.add("taskPageTitle");
    const sectionCounter = createSection("taskCounters");
    sectionCounter.classList.add("taskCounterSection");
    /* Seção do contador de todas as tarefas */
    const sectionAllTask = allTaskCounter("sectionAllTask");
    sectionAllTask.classList.add("statistics");
    /* Seção do contador de tarefas pendentes */
    const sectionPendingTask = pendingTaskCounter("sectionPendingTask");
    sectionPendingTask.classList.add("statistics");
    /* Seção do contador de tarefas concluídas */
    const sectionCompletedTask = completedTaskCounter("sectionCompletedTask");
    sectionCompletedTask.classList.add("statistics");
    sectionCounter.appendChild(sectionAllTask);
    sectionCounter.appendChild(sectionPendingTask);
    sectionCounter.appendChild(sectionCompletedTask);
    const taskContainer = createSection("taskContainer");
    taskContainer.classList.add("task-container");
    const sectionAddSearch = sectionAddContainer("sectionAddSearch");
    sectionAddSearch.classList.add("search-add-container");
    adicionarElementoNoContainer(titleHeading);
    adicionarElementoNoContainer(sectionCounter);
    adicionarElementoNoContainer(taskContainer);
    adicionarElementoNoContainer(sectionAddSearch);
}
/* Função para criar a seção do contador de todas as tarefas */
function allTaskCounter(id) {
    const figureAllTask = createFigureWithImage("allTaskBtn", "task icon", "../images/tarefa.png", "tarefas");
    const totalTasks = createSection("totalTasks");
    totalTasks.classList.add("counter-item");
    const sectionAllTask = createSection(id);
    sectionAllTask.appendChild(figureAllTask);
    sectionAllTask.appendChild(totalTasks);
    return sectionAllTask;
}
/* Função para criar a seção do contador de tarefas pendentes */
function pendingTaskCounter(id) {
    const figureAllTask = createFigureWithImage("taskPendingBtn", "task pending icon", "../images/pendente.png", "pendentes");
    const pendingTasks = createSection("pendingTasks");
    pendingTasks.classList.add("counter-item");
    const sectionPendingTask = createSection(id);
    sectionPendingTask.appendChild(figureAllTask);
    sectionPendingTask.appendChild(pendingTasks);
    return sectionPendingTask;
}
/* Função para criar a seção do contador de tarefas concluídas */
function completedTaskCounter(id) {
    const figureCompletedTask = createFigureWithImage("taskCompletedBtn", "task completed icon", "../images/tarefa-concluida.png", "concluídos");
    const completedTasks = createSection("completedTasks");
    completedTasks.classList.add("counter-item");
    const sectionCompletedTask = createSection(id);
    sectionCompletedTask.appendChild(figureCompletedTask);
    sectionCompletedTask.appendChild(completedTasks);
    return sectionCompletedTask;
}
function sectionAddContainer(id) {
    const inputSearch = createInput("searchTask", "text");
    inputSearch.placeholder = "Procurar tarefa por título...";
    const sectionGroup = createSection("sectionGroup");
    sectionGroup.classList.add("form-group");
    const btnSortTasks = createButton("sortTasksBtn", "Ordenar A-Z", "button");
    const removeAllCompletedTaskBtn = createButton("removeAllCompletedTaskBtn", "Remover Tarefas Concluídas", "button");
    sectionGroup.appendChild(btnSortTasks);
    sectionGroup.appendChild(removeAllCompletedTaskBtn);
    const sectionSearch = createSection(id);
    sectionSearch.appendChild(inputSearch);
    sectionSearch.appendChild(sectionGroup);
    return sectionSearch;
}
