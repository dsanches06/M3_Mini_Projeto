import { addElementInContainer, } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import { menuSelected } from "../dom/MenuSelected.js";
import { createSearchContainer, createStatisticsCounter, } from "../dom/SectionCounter.js";
import { countCompletedUserTasks, countPendingUserTasks, countAllTasks, } from "./TaskCountersUI.js";
import renderAllTasks from "./TaskUI.js";
import { allUsersTasks, pendingTasks, completedTasks, searchTasksByTitle, sortTasksByTitle, removeAllCompletedTask, } from "../gestUserTask/GestTaskUI.js";
import { showInfoBanner } from "../../helpers/infoBanner.js";
/* Lista de tarefas de utilizadores */
export default function loadTasksPage(tasksList) {
    /* ativa o menu tarefas */
    menuSelected("#menuTasks");
    //
    addElementInContainer(createHeadingTitle("h2", "GESTÃO DE TAREFAS"));
    //
    const taskCounterSection = createTaskCounter("taskCounters");
    addElementInContainer(taskCounterSection);
    //
    showTasksCounters(tasksList);
    //
    const searchContainer = showSearchTaskContainer();
    addElementInContainer(searchContainer);
    //
    const tasksContainer = renderAllTasks(tasksList);
    addElementInContainer(tasksContainer);
    // Adicionar event listeners aos botões de contador para filtrar
    const allTasksBtn = taskCounterSection.querySelector("#allTasksBtn");
    allTasksBtn.title = "Mostrar todas as tarefas";
    const pendingTaskBtn = taskCounterSection.querySelector("#pendingTaskBtn");
    pendingTaskBtn.title = "Mostrar tarefas pendentes";
    const completedTaskBtn = taskCounterSection.querySelector("#completedTaskBtn");
    completedTaskBtn.title = "Mostrar tarefas concluídas";
    allTasksBtn.addEventListener("click", () => {
        const tasks = allUsersTasks();
        renderAllTasks(tasks);
        showTasksCounters(tasks);
    });
    pendingTaskBtn.addEventListener("click", () => {
        const tasks = pendingTasks();
        renderAllTasks(tasks);
        showTasksCounters(tasks);
    });
    completedTaskBtn.addEventListener("click", () => {
        const tasks = completedTasks();
        renderAllTasks(tasks);
        showTasksCounters(tasks);
    });
    const sortTasksBtn = document.querySelector("#sortTasksBtn");
    if (sortTasksBtn) {
        //Crie uma variável de controle de estado
        let isAscending = true;
        sortTasksBtn.addEventListener("click", () => {
            const sortedTasks = sortTasksByTitle(isAscending);
            //Inverta o estado para o próximo clique
            isAscending = !isAscending;
            // Mostrar as tarefas ordenadas
            renderAllTasks(sortedTasks);
            showTasksCounters(sortedTasks);
            // Atualize o texto ou ícone do botão
            sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
        });
    }
    else {
        console.warn("Elemento #sortTasksBtn não foi renderizado no DOM.");
    }
    // Adicionar event listeners aos botões de busca
    const searchTaskInput = document.querySelector("#searchTask");
    if (searchTaskInput) {
        searchTaskInput.addEventListener("input", () => {
            const searchTerm = searchTaskInput.value;
            const filteredTasks = searchTasksByTitle(searchTerm);
            renderAllTasks(filteredTasks);
            showTasksCounters(filteredTasks);
        });
    }
    else {
        console.warn("Elemento de busca de tarefas não encontrado.");
    }
    // Adicionar event listeners aos botões de busca
    const removeAllCompletedTaskBtn = document.querySelector("#removeAllCompletedTaskBtn");
    if (removeAllCompletedTaskBtn) {
        removeAllCompletedTaskBtn.addEventListener("click", () => {
            const removedTasks = removeAllCompletedTask();
            if (removedTasks.length > 0) {
                const completedTaskCount = removedTasks.filter((task) => task.completed).length;
                if (completedTaskCount <= 0) {
                    showInfoBanner("Não há tarefa concluída para remover.", "error-banner");
                }
                renderAllTasks(removedTasks);
                showTasksCounters(removedTasks);
            }
            else {
                showInfoBanner("Não há tarefa concluída para remover.", "error-banner");
            }
        });
    }
}
/* */
function createTaskCounter(id) {
    //
    const allTasksBtn = createStatisticsCounter("allTaskSection", "allTasksBtn", "./images/tarefa.png", "tarefas", "allTasksCounter");
    //
    const pendingTaskBtn = createStatisticsCounter("pendingTaskSection", "pendingTaskBtn", "./images/pendente.png", "pendentes", "pendingTasksCounter");
    //
    const completedTaskBtn = createStatisticsCounter("completedTaskSection", "completedTaskBtn", "./images/tarefa-concluida.png", "concluídos", "completedTaskCounter");
    //
    const sectionTasksCounter = createSection(`${id}`);
    sectionTasksCounter.classList.add("tasks-counters");
    sectionTasksCounter.append(allTasksBtn, pendingTaskBtn, completedTaskBtn);
    return sectionTasksCounter;
}
export function showTasksCounters(taskList) {
    countAllTasks("#allTasksCounter", taskList);
    countCompletedUserTasks("#completedTaskCounter", taskList);
    countPendingUserTasks("#pendingTasksCounter", taskList);
}
/* */
function showSearchTaskContainer() {
    const searchTaskContainer = createSearchContainer("searchTaskContainer", { id: "searchTask", placeholder: "Procurar tarefa..." }, [
        { id: "sortTasksBtn", text: "Ordenar A-Z" },
        { id: "removeAllCompletedTaskBtn", text: "Remover tarefas concluídas" },
    ]);
    searchTaskContainer.classList.add("search-add-container");
    return searchTaskContainer;
}
