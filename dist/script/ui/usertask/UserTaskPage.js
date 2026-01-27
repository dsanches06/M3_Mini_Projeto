import { addElementInContainer, } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import { createSearchContainer, createStatisticsCounter, } from "../dom/SectionCounter.js";
import { countCompletedUserTasks, countPendingUserTasks, countAllTasks, } from "../task/TaskCountersUI.js";
import showUserTask from "./UserTaskUI.js";
import { removeCompletedTasks } from "./UserTaskCRUD.js";
import createAndAppendTaskForm from "./UserTaskForm.js";
/* Lista de tarefas do utilizador */
export default function loadUserTaskPage(gestUserTask, user) {
    //
    addElementInContainer(createHeadingTitle("h2", `TAREFAS DE ${user.name.toUpperCase()}`));
    //
    const userTaskCounterSection = createUserTaskCounter("userTaskCounters");
    addElementInContainer(userTaskCounterSection);
    //
    showUserTaskCounters(user.allTasks());
    //
    const searchContainer = showUserTaskSearchContainer();
    addElementInContainer(searchContainer);
    //
    const userTasksContainer = createSection("usersTaskContainer");
    addElementInContainer(userTasksContainer);
    //
    showUserTask(user, user.allTasks());
    // Adicionar event listeners aos botões de contador para filtrar
    const allUserTasksBtn = userTaskCounterSection.querySelector("#allUserTasksBtn");
    allUserTasksBtn.title = "Mostrar todas as tarefas";
    const pendingUserTaskBtn = userTaskCounterSection.querySelector("#pendingUserTaskBtn");
    pendingUserTaskBtn.title = "Mostrar tarefas pendentes";
    const completedUserTaskBtn = userTaskCounterSection.querySelector("#completedUserTaskBtn");
    completedUserTaskBtn.title = "Mostrar tarefas concluídas";
    allUserTasksBtn.addEventListener("click", () => {
        showUserTask(user, user.allTasks());
        showUserTaskCounters(user.allTasks());
    });
    pendingUserTaskBtn.addEventListener("click", () => {
        const pendingTasks = user.pendingTasks();
        showUserTask(user, pendingTasks);
        showUserTaskCounters(pendingTasks);
    });
    completedUserTaskBtn.addEventListener("click", () => {
        const completedTasks = user.completedTasks();
        showUserTask(user, completedTasks);
        showUserTaskCounters(completedTasks);
    });
    // Adicionar event listeners aos botões de busca
    const addUserTaskBtn = document.querySelector("#addUserTaskBtn");
    if (addUserTaskBtn) {
        addUserTaskBtn.addEventListener("click", () => {
            // Abrir modal para adicionar tarefa
            createAndAppendTaskForm("containerSection", user, gestUserTask);
            const modal = document.getElementById("modalUserTaskForm");
            if (modal)
                modal.style.display = "block";
            // Atualizar a lista de tarefas para todos os utilizadores
            showUserTask(user, user.allTasks());
            showUserTaskCounters(user.allTasks());
        });
    }
    else {
        console.warn("Elemento #addUserTaskBtn não encontrado.");
    }
    const sortUserTasksBtn = document.querySelector("#sortUserTasksBtn");
    if (sortUserTasksBtn) {
        //Crie uma variável de controle de estado
        let isAscending = true;
        sortUserTasksBtn.addEventListener("click", () => {
            const sortedTasks = [...user.allTasks()].sort((a, b) => {
                if (isAscending) {
                    return a.title.localeCompare(b.title);
                }
                else {
                    return b.title.localeCompare(a.title);
                }
            });
            //Inverta o estado para o próximo clique
            isAscending = !isAscending;
            // Mostrar as tarefas ordenadas
            showUserTask(user, sortedTasks);
            // Atualize o texto ou ícone do botão
            sortUserTasksBtn.textContent = isAscending
                ? "Ordenar A-Z"
                : "Ordenar Z-A";
        });
    }
    else {
        console.warn("Elemento #sortUserTasksBtn não foi renderizado no DOM.");
    }
    const searchUserTask = document.querySelector("#searchUserTask");
    if (searchUserTask) {
        searchUserTask.addEventListener("input", () => {
            const name = searchUserTask.value.toLowerCase();
            const filteredTasks = user
                .allTasks()
                .filter((task) => task.title.toLowerCase().includes(name));
            showUserTask(user, filteredTasks);
            showUserTaskCounters(filteredTasks);
        });
    }
    else {
        console.warn("Elemento de busca de tarefas do utilizador não encontrado.");
    }
    // Adicionar event listeners aos botões de busca
    const removeCompletedUserTaskBtn = document.querySelector("#removeCompletedUserTaskBtn");
    if (removeCompletedUserTaskBtn) {
        removeCompletedUserTaskBtn.addEventListener("click", () => {
            removeCompletedTasks(user);
        });
    }
}
/* */
function createUserTaskCounter(id) {
    //
    const allUserTasksBtn = createStatisticsCounter("allUserTaskSection", "allUserTasksBtn", "./images/tarefa.png", "tarefas", "allUserTasksCounter");
    //
    const pendingUserTaskBtn = createStatisticsCounter("pendingUserTaskSection", "pendingUserTaskBtn", "./images/pendente.png", "pendentes", "pendingUserTasksCounter");
    //
    const completedUserTaskBtn = createStatisticsCounter("completedUserTaskSection", "completedUserTaskBtn", "./images/tarefa-concluida.png", "concluídos", "completedUserTaskCounter");
    //
    const sectionUserTasksCounter = createSection(`${id}`);
    sectionUserTasksCounter.classList.add("tasks-counters");
    sectionUserTasksCounter.append(allUserTasksBtn, pendingUserTaskBtn, completedUserTaskBtn);
    return sectionUserTasksCounter;
}
export function showUserTaskCounters(tasks) {
    countAllTasks("#allUserTasksCounter", tasks);
    countCompletedUserTasks("#completedUserTaskCounter", tasks);
    countPendingUserTasks("#pendingUserTasksCounter", tasks);
}
/* */
function showUserTaskSearchContainer() {
    const searchUserTaskContainer = createSearchContainer("searchUserTaskContainer", { id: "searchUserTask", placeholder: "Procurar tarefa..." }, [
        { id: "addUserTaskBtn", text: "Adicionar tarefa" },
        { id: "sortUserTasksBtn", text: "Ordenar A-Z" },
        { id: "removeCompletedUserTaskBtn", text: "Remover tarefas concluídas" },
    ]);
    searchUserTaskContainer.classList.add("search-add-container");
    return searchUserTaskContainer;
}
