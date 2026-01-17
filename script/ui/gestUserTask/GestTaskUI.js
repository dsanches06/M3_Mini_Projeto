import showTask from "../task/TaskUI.js";
/* Instância da classe GestUserTask  */
let gestUserTask;
let filterUsers = [];
/* Função principal para mostrar as tarefas de todos os utilizadores */
export default function loadAllTask(gestUsersTasks) {
    //atribuir a instância recebida ao escopo global
    gestUserTask = gestUsersTasks;
    //mostrar todas as tarefas de todos os utilizadores
    showTask(gestUserTask.users);
}
/* Filtrar todas as tarefas */
const allTaskBtn = document.querySelector("#allTaskBtn");
if (allTaskBtn) {
    allTaskBtn.title = "Mostrar todas as tarefas";
    allTaskBtn.addEventListener("click", () => {
        showTask(gestUserTask.users);
    });
}
/* Filtrar tarefas pendentes */
const taskPendingBtn = document.querySelector("#taskPendingBtn");
if (taskPendingBtn) {
    taskPendingBtn.title = "Mostrar tarefas pendentes";
    taskPendingBtn.addEventListener("click", () => {
        //filtrar utilizadores
        filterUsers = gestUserTask.users.filter((user) => 
        //com tarefas pendentes
        user.tasks.some((task) => !task.completed));
        //mostrar as tarefas pendentes
        showTask(filterUsers);
    });
}
/* Filtrar tarefas concluídos */
const taskCompletedBtn = document.querySelector("#taskCompletedBtn");
if (taskCompletedBtn) {
    taskCompletedBtn.title = "Mostrar tarefas concluídas";
    taskCompletedBtn.addEventListener("click", () => {
        //filtrar utilizadores
        filterUsers = gestUserTask.users.filter((user) => 
        //com tarefas concluídas
        user.tasks.some((task) => task.completed));
        //mostrar as tarefas concluídas
        showTask(filterUsers);
    });
}
/* Procurar tarefa por titulo */
const searchTask = document.querySelector("#searchTask");
if (searchTask) {
    searchTask.addEventListener("input", () => {
        //obter o titulo inserido no input em minusculas
        const titulo = searchTask.value.toLowerCase();
        //filtrar utilizadores
        filterUsers = gestUserTask.users.filter((user) => 
        //com tarefas concluídas
        user.tasks.some((task) => task.title.toLowerCase().includes(titulo)));
        console.table(filterUsers);
        //mostrar os utilizadores filtrados
        showTask(filterUsers);
    });
}
/* Ordenar tarefa pelo titulo */
const sortTasksBtn = document.querySelector("#sortTasksBtn");
if (sortTasksBtn) {
    //Crie uma variável de controle
    let isAscending = true;
    sortTasksBtn.addEventListener("click", () => {
        //Ordenar com base no estado atual
        if (isAscending) {
            //filtra os utilizadores
            filterUsers = gestUserTask.users.filter((user) => 
            //e ordena as tarefas pelo titulo ascendente
            user.tasks.sort((a, b) => a.title.localeCompare(b.title)));
        }
        else {
            //filtra os utilizadores
            filterUsers = gestUserTask.users.filter((user) => 
            //e ordena as tarefas pelo titulo descendente
            user.tasks.sort((a, b) => b.title.localeCompare(a.title)));
        }
        //Inverta o estado para o próximo clique
        isAscending = !isAscending;
        // Mostrar oas tarefas ordenados
        showTask(filterUsers);
        // Atualize o texto ou ícone do botão
        sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
}
