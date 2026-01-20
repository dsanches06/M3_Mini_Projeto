import Task from "../../models/task/Task.js";
import showUserTask from "./UserTaskUI.js";
/* Função para obter o ID do utilizador da URL */
export function getUserIdFromURL() {
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
/* Estilização por estado */
export function styleTasks(tasList) {
    const taskListElement = document.querySelector("#usersTaskList");
    const listItems = taskListElement.querySelectorAll("li");
    listItems.forEach((li, index) => {
        if (tasList[index].completed) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }
        else {
            li.style.textDecoration = "none";
            li.style.color = "black";
        }
    });
}
/* Função para adicionar uma nova tarefa do utilizador */
export function addNewUserTask(id, user) {
    //Lê os valores dos inputs.
    const titleInput = document.querySelector("#titleInput");
    const title = titleInput.value;
    const taskCategory = document.querySelector("#taskCategory");
    const category = taskCategory.value;
    //Limpa os valores dos inputs.
    titleInput.value = "";
    taskCategory.value = "";
    //retorna um novo objeto do tipo Task
    return new Task(id, title, category, user);
}
/* Função para remover a tarefas concluidas de um utilizador  */
export function removeCompletedTasks(user) {
    //para cada tarefa do utilizador
    user.tasks.forEach((task) => {
        //se a tarefa estiver concluída
        if (task.completed) {
            //remover a tarefa
            user.removeTask(task.id);
        }
    });
    //atualizar a exibição das tarefas
    showUserTask(user, user.tasks);
}
/* Função Editar tarefa */
export function userEditTitle(user, taskId) {
    const index = user.tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
        const newTitle = prompt("Digite o novo título da tarefa:", user.tasks[index].title);
        if (newTitle !== null && newTitle.trim() !== "") {
            user.tasks[index].title = newTitle.trim();
            //atualizar a exibição das tarefas
            showUserTask(user, user.tasks);
        }
    }
}
/* Função Concluir tarefa */
export function userCompleteTask(user, taskId) {
    const index = user.tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
        //se a tarefa não estiver concluída
        if (!user.tasks[index].completed) {
            //marcar a tarefa como concluída
            user.tasks[index].markCompleted();
        } //atualizar a exibição das tarefas
        showUserTask(user, user.tasks);
    }
}
