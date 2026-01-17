import { getTasksByFilter } from "../../helpers/getTaskByFilter.js";
import showUserTask from "../usertask/UserTaskUI.js";
/* instancia global de utilizador  */
let user;
//array para armazena tarefas filtradas
let tasksFiltered;
/* Função principal para mostrar as tarefas apenas de um utilizador */
export default function loadUserTask(gestUsersTask) {
    //obter o id capturado de url
    let id = getUserIdFromURL();
    //se o id for diferente de - 1
    if (id !== -1) {
        //atribuir o valor do utilizador encontrado pelo id
        user = gestUsersTask.users.find((user) => user.id === id);
        //mostra as ttarefas do utilizador atual
        showUserTask(user, user.tasks);
    }
}
/* Função principal para carregar tarefas do utilizador */
function getUserIdFromURL() {
    let userId = -1;
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("userId");
    if (userParam) {
        //converter de volta para inteiro
        userId = parseInt(userParam, 10);
        //retorna o id convertido
        return userId;
    } //retorna o id com valor -1
    return userId;
}
/* Filtrar todas as tarefas */
const allTaskBtn = document.querySelector("#allTaskBtn");
if (allTaskBtn) {
    allTaskBtn.title = "Mostrar todas as tarefas";
    allTaskBtn.addEventListener("click", () => {
        //inicializa o array para evitar repetiçoes de dados
        tasksFiltered = [];
        //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
        tasksFiltered = getTasksByFilter(user, tasksFiltered, "all");
        //mostra as ttarefas do utilizador atual
        showUserTask(user, tasksFiltered);
    });
}
else {
    console.warn("Elemento #allTaskBtn não foi renderizado no DOM.");
}
/* Filtrar tarefas pendentes */
const taskPendingBtn = document.querySelector("#taskPendingBtn");
if (taskPendingBtn) {
    taskPendingBtn.title = "Mostrar tarefas pendentes";
    taskPendingBtn.addEventListener("click", () => {
        //inicializa o array para evitar repetiçoes de dados
        tasksFiltered = [];
        //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
        tasksFiltered = getTasksByFilter(user, tasksFiltered, "pending");
        //mostra as ttarefas do utilizador atual
        showUserTask(user, tasksFiltered);
    });
}
else {
    console.warn("Elemento #taskPendingBtn não foi renderizado no DOM.");
}
/* Filtrar tarefas concluídos */
const taskCompletedBtn = document.querySelector("#taskCompletedBtn");
if (taskCompletedBtn) {
    taskCompletedBtn.title = "Mostrar tarefas concluídas";
    taskCompletedBtn.addEventListener("click", () => {
        //inicializa o array para evitar repetiçoes de dados
        tasksFiltered = [];
        //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
        tasksFiltered = getTasksByFilter(user, tasksFiltered, "completed");
        //mostra as ttarefas do utilizador atual
        showUserTask(user, tasksFiltered);
    });
}
else {
    console.warn("Elemento #taskCompletedBtn não foi renderizado no DOM.");
}
/* Procurar tarefa por titulo */
const searchTask = document.querySelector("#searchTask");
if (searchTask) {
    searchTask.addEventListener("input", () => {
        //obter o titulo inserido no input em minusculas
        const title = searchTask.value.toLowerCase();
        //inicializa o array para evitar repetiçoes de dados
        tasksFiltered = [];
        //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
        tasksFiltered = getTasksByFilter(user, tasksFiltered, "search", title);
        //mostra as ttarefas do utilizador atual
        showUserTask(user, tasksFiltered);
    });
}
else {
    console.warn("Elemento #searchTask não foi renderizado no DOM.");
}
/* Ordenar tarefa pelo titulo */
const sortTasksBtn = document.querySelector("#sortTasksBtn");
if (sortTasksBtn) {
    //Crie uma variável de controle
    let isAscending = true;
    sortTasksBtn.addEventListener("click", () => {
        //array de ordenação
        let sortTask = [];
        //inicializa o array para evitar repetiçoes de dados
        tasksFiltered = [];
        //filtra a procura de tarefas pelo titulo
        //e adiciona ao array e retorna o mesmo array
        tasksFiltered = getTasksByFilter(user, tasksFiltered, "all");
        //Ordenar com base no estado atual
        if (isAscending) {
            //faz ordenção no estado ascendente
            sortTask = tasksFiltered.sort((a, b) => a.title.localeCompare(b.title));
        }
        else {
            //faz ordenção no estado descendente
            sortTask = tasksFiltered.sort((a, b) => b.title.localeCompare(a.title));
        }
        //Inverta o estado para o próximo clique
        isAscending = !isAscending;
        // Mostrar as tarefas ordenados conforme estado
        showUserTask(user, sortTask);
        // Atualize o texto ou ícone do botão
        sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
}
else {
    console.warn("Elemento #sortTaskBtn não foi renderizado no DOM.");
}
