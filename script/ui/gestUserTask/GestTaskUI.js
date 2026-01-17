import showTask from "../task/TaskUI.js";
/* instancia global do array de utilizadores */
let users = [];
/* Função principal para mostrar as tarefas de todos os utilizadores */
export default function loadAllTask(gestUsersTask) {
    //atribuir a instância recebida ao escopo global
    users = gestUsersTask.users;
    //mostrar todas as tarefas de todos os utilizadores
    showTask(getTasksByFilter("all"));
}
/* Filtrar todas as tarefas */
const allTaskBtn = document.querySelector("#allTaskBtn");
if (allTaskBtn) {
    allTaskBtn.title = "Mostrar todas as tarefas";
    allTaskBtn.addEventListener("click", () => {
        //mostrar todas as tarefas de todos os utilizadores
        showTask(getTasksByFilter("all"));
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
        //mostrar as tarefas pendentes
        showTask(getTasksByFilter("pending"));
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
        //mostrar as tarefas concluídas
        showTask(getTasksByFilter("completed"));
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
        //mostrar as tarefas filtrados pelo titulo
        showTask(getTasksByFilter("search", title));
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
        //array filter
        let filterTasks = [];
        //Ordenar com base no estado atual
        if (isAscending) {
            filterTasks = getTasksByFilter("all").sort((a, b) => a.title.localeCompare(b.title));
        }
        else {
            filterTasks = getTasksByFilter("all").sort((a, b) => b.title.localeCompare(a.title));
        }
        //Inverta o estado para o próximo clique
        isAscending = !isAscending;
        // Mostrar oas tarefas ordenados
        showTask(filterTasks);
        // Atualize o texto ou ícone do botão
        sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
}
else {
    console.warn("Elemento #sortTaskBtn não foi renderizado no DOM.");
}
/* Função para obter tarefas por filtro */
function getTasksByFilter(filter, title) {
    //array task
    let tasks = [];
    //por cada utilizador
    for (const user of users) {
        //filtra as tarefas do utilizador
        for (const task of user.tasks) {
            switch (filter) {
                case "all":
                    tasks.push(task);
                    break;
                case "pending":
                    if (!task.completed) {
                        tasks.push(task);
                    }
                    break;
                case "completed":
                    if (task.completed) {
                        tasks.push(task);
                    }
                    break;
                case "search":
                    if (task.title.toLowerCase().includes(title || "")) {
                        tasks.push(task);
                    }
                    break;
                default:
                    console.warn(`Filtro desconhecido: ${filter}`);
            }
        }
    }
    return tasks;
}
