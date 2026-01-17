import { countAllUserTasks, countCompletedUserTasks, countPendingUserTasks, } from "../task/TaskCounters.js";
/* Container de tarefas do utilizador */
const usersTaskContainer = document.querySelector("#usersTaskContainer");
/* Mostrar tarefas */
export default function showUserTask(user, tasks) {
    showUserNameHeader(user);
    renderUserTask(tasks);
    countAllUserTasks(tasks);
    countPendingUserTasks(tasks);
    countCompletedUserTasks(tasks);
}
/* Função de renderizar apenas as tarefas do utilizador */
function renderUserTask(taskList) {
    if (usersTaskContainer) {
        //Limpa o contentor HTML.
        usersTaskContainer.innerHTML = "";
    }
    else {
        console.warn("Elemento #usersTaskContainer não foi renderizado no DOM.");
    }
}
/* Função para mostrar o nome de utilizador no cabeçalho */
function showUserNameHeader(user) {
    const userNameTaskHeader = document.querySelector("#userNameTaskHeader");
    if (userNameTaskHeader) {
        if (user) {
            userNameTaskHeader.textContent = user.name;
        }
        else {
            userNameTaskHeader.textContent = "Utilizador Desconhecido";
        }
    }
    else {
        console.warn("Elemento #userNameTaskHeader não foi renderizado no DOM.");
    }
}
