import loadInitialUsers from "./script/ui/gestUserTask/GestUserUI.js";
import GestUserTask from "./script/models/gestUserTask/gestUserTask.js";
import { clearContainer } from "./script/ui/dom/ContainerSection.js";
import loadUsersPage from "./script/ui/user/UserPage.js";
import loadTasksPage from "./script/ui/task/TaskPage.js";
import { initUsers } from "./script/ui/gestUserTask/GestTaskUI.js";
/* Instância da classe GestUserTask */
const gestUserTask = new GestUserTask();
window.onload = () => {
    /* carregar utilizadores iniciais com as suas tarefas, vindo de fake data */
    loadInitialUsers(gestUserTask);
};
//obter o menu task
const menuUsers = document.querySelector("#menuUsers");
menuUsers.addEventListener("click", () => {
    //Limpa o container antes de mostrar os utilizadores
    clearContainer();
    // carrega a pagina dinamica de utilizadores
    loadUsersPage(gestUserTask);
});
//obter o menu task
const menuTasks = document.querySelector("#menuTasks");
menuTasks.addEventListener("click", () => {
    //
    let tasksList = [];
    for (const user of gestUserTask.users) {
        for (const task of user.tasks) {
            tasksList.push(task);
        }
    }
    // Inicializar usuários para as funções de tarefa
    initUsers(gestUserTask);
    //limpa o container
    clearContainer();
    //mostrar todas as tarefas de todos os utilizadores
    loadTasksPage(tasksList);
});
