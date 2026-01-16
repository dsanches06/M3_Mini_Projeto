import TaskClass from "../../models/task/Task.js";
import { updateTaskList, styleTasks, showTaskCounter } from "./Components.js";
import User from "../../models/user/User.js";
const inputElement = document.querySelector("#taskInput");
const addButton = document.querySelector("#addTaskBtn");
const sortButton = document.querySelector("#sortTaskBtn");
const categorySelect = document.querySelector("#taskCategory");
const completedTaskBtn = document.querySelector("#completedTaskBtn");
/*  Array de Tarefas */
const taskList = [];
/*  Função Principal para Mostrar Tarefas */
export default function showTasks() {
    showTaskCounter(taskList);
    updateTaskList(taskList);
    styleTasks(taskList);
}
/*  Adicionar tarefa via input */
addButton.addEventListener("click", () => {
    const title = inputElement.value.trim();
    const category = categorySelect.value;
    if (title && category) {
        const user = new User(8, "Alice Morais", "alice@example.com");
        const newTask = new TaskClass(Date.now(), title, category, user);
        taskList.push(newTask);
        inputElement.value = "";
        showTasks();
    }
});
/*  Ordenação Alfabética */
sortButton.addEventListener("click", () => {
    taskList.sort((a, b) => a.title.localeCompare(b.title));
    showTasks();
});
/* Limpar Todas as Concluídas */
completedTaskBtn.style.backgroundColor = "red";
completedTaskBtn.addEventListener("click", () => {
    for (let i = taskList.length - 1; i >= 0; i--) {
        if (taskList[i].completed) {
            taskList.splice(i, 1);
        }
    }
    showTasks();
});
/* Pesquisa Dinâmica */
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = taskList.filter((task) => task.title.toLowerCase().includes(searchTerm));
    updateTaskList(filteredTasks);
    styleTasks(filteredTasks);
});
