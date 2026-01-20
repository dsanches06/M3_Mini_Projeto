import { addElementInContainer, clearContainer, } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import { menuSelected } from "../dom/MenuSelected.js";
import { createSearchContainer, createStatisticsCounter, } from "../dom/SectionCounter.js";
import { countCompletedUserTasks, countPendingUserTasks, countAllTasks, } from "./TaskCountersUI.js";
import renderAllTasks from "./TaskUI.js";
import loadUsersPage from "../user/UserPage.js";
import { allUsersTasks, pendingTasks, completedTasks, sortTasksByTitle, removeAllCompletedTask, } from "../gestUserTask/GestTaskUI.js";
/* Lista de tarefas de utilizadores */
export default function loadTasksPage(gestUserTask, tasksList) {
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
    const TasksContainer = renderAllTasks(tasksList);
    addElementInContainer(TasksContainer);
    // Adicionar event listeners aos botões de contador para filtrar
    const allTasksBtn = taskCounterSection.querySelector("#allTasksBtn");
    const pendingTaskBtn = taskCounterSection.querySelector("#pendingTaskBtn");
    const completedTaskBtn = taskCounterSection.querySelector("#completedTaskBtn");
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
    // Adicionar event listeners aos botões de busca
    const addUserBtn = document.querySelector("#addUserBtn");
    if (addUserBtn) {
        addUserBtn.addEventListener("click", () => {
            // Lógica para adicionar usuário (ex.: abrir modal ou navegar)
            alert("Funcionalidade para adicionar usuário - implementar modal ou navegação.");
        });
    }
    const sortTasksBtn = document.querySelector("#sortTasksBtn");
    if (sortTasksBtn) {
        //Crie uma variável de controle de estado
        let isAscending = true;
        sortTasksBtn.addEventListener("click", () => {
            const sortedUsers = sortTasksByTitle(isAscending);
            //Inverta o estado para o próximo clique
            isAscending = !isAscending;
            // Mostrar os utilizadores ordenados
            renderAllTasks(sortedUsers);
            showTasksCounters(sortedUsers);
            // Atualize o texto ou ícone do botão
            sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
        });
    }
    else {
        console.warn("Elemento #sortTasksBtn não foi renderizado no DOM.");
    }
    //obter o menu task
    const menuUsers = document.querySelector("#menuUsers");
    menuUsers.addEventListener("click", () => {
        //Limpa o container antes de mostrar os utilizadores
        clearContainer();
        // carrega a pagina dinamica de utilizadores
        loadUsersPage(gestUserTask);
    });
}
// Adicionar event listeners aos botões de busca
const removeAllCompletedTaskBtn = document.querySelector("#removeAllCompletedTaskBtn");
removeAllCompletedTaskBtn.addEventListener("click", () => {
    const tasks = removeAllCompletedTask();
    renderAllTasks(tasks);
    showTasksCounters(tasks);
});
/* */
function createTaskCounter(id) {
    //
    const allTasksBtn = createStatisticsCounter("allTaskSection", "allTasksBtn", "../../../images/tarefa.png", "tarefas", "allTasksCounter");
    //
    const ativeTasksBtn = createStatisticsCounter("pendingTaskSection", "pendingTaskBtn", "../../../images/pendente.png", "pendentes", "pendingTasksCounter");
    //
    const unableTasksBtn = createStatisticsCounter("completedTaskSection", "completedTaskBtn", "../../../images/tarefa-concluida.png", "concluídos", "completedTaskCounter");
    //
    const sectionTasksCounter = createSection(`${id}`);
    sectionTasksCounter.classList.add("tasks-counters");
    sectionTasksCounter.append(allTasksBtn, ativeTasksBtn, unableTasksBtn);
    return sectionTasksCounter;
}
export function showTasksCounters(taskList) {
    countAllTasks("#countAllTasks", taskList);
    countCompletedUserTasks("#countCompletedUserTasks", taskList);
    countPendingUserTasks("#countPendingUserTasks", taskList);
}
/* */
function showSearchTaskContainer() {
    const searchTaskContainer = createSearchContainer("searchTaskContainer", { id: "searchTask", placeholder: "Procurar tarefa..." }, [
        { id: "addTaskBtn", text: "Adicionar tarefa" },
        { id: "sortTasksBtn", text: "Ordenar A-Z" },
        { id: "removeAllCompletedTaskBtn", text: "Remover tarefas concluidas" },
    ]);
    searchTaskContainer.classList.add("search-add-container");
    return searchTaskContainer;
}
