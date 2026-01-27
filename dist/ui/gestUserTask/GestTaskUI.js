import { showInfoBanner } from "../../helpers/infoBanner.js";
import { clearContainer } from "../dom/ContainerSection.js";
import { getTasksByFilter } from "../../helpers/getTaskByFilter.js";
import loadTasksPage from "../task/TaskPage.js";
/* array global de utilizadores */
let users;
// array global para armazenar tarefas filtradas
let tasksFiltered;
/* Função helper para filtrar tarefas de todos os usuários, evitando duplicação */
function filterTasksFromAllUsers(filterType, title) {
    if (!users || users.length === 0) {
        console.warn("Nenhum usuário disponível para filtrar tarefas.");
        return [];
    }
    let filtered = [];
    for (const user of users) {
        filtered = getTasksByFilter(user, filtered, filterType, title);
    }
    return filtered;
}
/* Função principal para mostrar as tarefas de todos os utilizadores */
export function loadAllUsersTask(servicesUser) {
    // atribuir o valor ao array global de utilizadores
    users = servicesUser.getAllUsers();
    // inicializa o array para evitar repetições de dados
    tasksFiltered = [];
    // filtra tarefas de todos os usuários
    tasksFiltered = filterTasksFromAllUsers("all");
    // Limpa o container antes de mostrar os utilizadores
    clearContainer();
    // carrega a pagina dinamica de utilizadores
    loadTasksPage(tasksFiltered);
}
/* */
export function allUsersTasks() {
    tasksFiltered = filterTasksFromAllUsers("all");
    return tasksFiltered;
}
export function pendingTasks() {
    tasksFiltered = filterTasksFromAllUsers("pending");
    return tasksFiltered;
}
export function completedTasks() {
    tasksFiltered = filterTasksFromAllUsers("completed");
    return tasksFiltered;
}
export function searchTasksByTitle(title) {
    tasksFiltered = filterTasksFromAllUsers("search", title);
    return tasksFiltered;
}
/* Ordenar utilizadores por nome */
export function sortTasksByTitle(ascending = true) {
    tasksFiltered = allUsersTasks();
    let sortedTasks = [];
    if (ascending) {
        sortedTasks = tasksFiltered.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
    }
    else {
        sortedTasks = tasksFiltered.sort((a, b) => b.getTitle().localeCompare(a.getTitle()));
    }
    return sortedTasks;
}
export function removeAllCompletedTask() {
    if (!users || users.length === 0) {
        showInfoBanner("Nenhum usuário disponível para remover tarefas completas.", "info-banner");
        return [];
    }
    tasksFiltered = [];
    // Remove tarefas completas de todos os usuários e coleta as pendentes
    for (const user of users) {
        const tasks = user.getTasks();
        if (tasks && tasks.length > 0) {
            /*  user.getTasks() = tasks.filter((task) => !task.getCompleted());
             if (user.tasks.length > 0) {
               tasksFiltered = getTasksByFilter(user, tasksFiltered, "pending");
             } */
        }
    }
    return tasksFiltered;
}
/* Função para inicializar o array global de usuários */
export function initUsers(servicesUser) {
    users = servicesUser.getAllUsers();
}
