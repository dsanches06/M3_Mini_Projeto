import { getTasksByFilter } from "../../helpers/getTaskByFilter.js";
import { clearContainer } from "../dom/ContainerSection.js";
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
export function loadAllUsersTask(gestUsersTask) {
    // atribuir o valor ao array global de utilizadores
    users = gestUsersTask.users;
    // inicializa o array para evitar repetições de dados
    tasksFiltered = [];
    // filtra tarefas de todos os usuários
    tasksFiltered = filterTasksFromAllUsers("all");
    // Limpa o container antes de mostrar os utilizadores
    clearContainer();
    // carrega a pagina dinamica de utilizadores
    loadTasksPage(gestUsersTask, tasksFiltered);
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
        sortedTasks = tasksFiltered.sort((a, b) => a.title.localeCompare(b.title));
    }
    else {
        sortedTasks = tasksFiltered.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sortedTasks;
}
export function removeAllCompletedTask() {
    if (!users || users.length === 0) {
        console.warn("Nenhum usuário disponível para remover tarefas completas.");
        return [];
    }
    // inicializa o array para evitar repetições de dados
    tasksFiltered = [];
    const usersWithPendingTasks = new Set(); // Usar Set para evitar duplicatas
    // por cada utilizador
    for (const user of users) {
        const tasks = user.tasks;
        if (tasks && tasks.length > 0) {
            // remover tarefas completas
            const pendingTasks = tasks.filter((task) => !task.completed);
            // atualizar tarefas do usuário (assumindo que user.tasks é mutável)
            user.tasks = pendingTasks;
            // se houver tarefas pendentes, adicionar usuário ao set
            if (pendingTasks.length > 0) {
                usersWithPendingTasks.add(user);
            }
        }
    }
    // filtrar as tarefas não concluídas de todos os utilizadores
    for (const user of usersWithPendingTasks) {
        tasksFiltered = getTasksByFilter(user, tasksFiltered, "pending");
    }
    return tasksFiltered;
}
/* Função para inicializar o array global de usuários */
export function initUsers(gestUsersTask) {
    users = gestUsersTask.users;
}
