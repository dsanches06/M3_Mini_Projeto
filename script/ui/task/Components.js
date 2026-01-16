const taskCounterElement = document.querySelector("#taskCounter");
const taskListElement = document.querySelector("#taskList");
/* Contador de tarefas */
export function showTaskCounter(taskList) {
    const totalTasks = taskList.length;
    const completedTasks = taskList.filter((task) => task.completed).length;
    taskCounterElement.textContent = `Tarefas: ${totalTasks} | Concluídas: ${completedTasks}`;
}
/* Renderização dinâmica */
export function updateTaskList(taskList) {
    taskListElement.innerHTML = "";
    taskList.forEach((task) => {
        var _a;
        let result = "";
        if (task.completed) {
            result = `${task.title} (Concluída em: ${(_a = task.completeDate) === null || _a === void 0 ? void 0 : _a.toLocaleString("pt-PT", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })})`;
        }
        else {
            result = `${task.id} - ${task.title} - ${task.category}`;
        }
        /* Criação de elemento LI */
        const li = createElement("li", result);
        taskListElement.appendChild(li);
        /* Remover tarefa */
        const buttonRemover = createElement("button", "Remover");
        taskListElement.appendChild(buttonRemover);
        buttonRemover.addEventListener("click", handleRemoveTask.bind(null, taskList, task.id));
        /* Editar título */
        const buttonEditar = createElement("button", "Editar");
        taskListElement.appendChild(buttonEditar);
        buttonEditar.addEventListener("click", handleEditTask.bind(null, taskList, task.id));
        /* Concluir tarefa */
        const buttonConcluir = createElement("button", "Concluir Tarefa");
        taskListElement.appendChild(buttonConcluir);
        buttonConcluir.addEventListener("click", handleCompleteTask.bind(null, taskList, task.id));
    });
}
/* Estilização por estado */
export function styleTasks(tasList) {
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
/* Função Concluir tarefa */
function handleCompleteTask(taskList, taskId) {
    const index = taskList.findIndex((t) => t.id === taskId);
    if (index !== -1) {
        taskList[index].markCompleted();
        showTaskCounter(taskList);
        updateTaskList(taskList);
        styleTasks(taskList);
    }
}
/* Função Remover tarefa */
function handleRemoveTask(taskList, taskId) {
    const index = taskList.findIndex((t) => t.id === taskId);
    if (index !== -1) {
        taskList.splice(index, 1);
        showTaskCounter(taskList);
        updateTaskList(taskList);
        styleTasks(taskList);
    }
}
/* Função Editar tarefa */
function handleEditTask(taskList, taskId) {
    const index = taskList.findIndex((t) => t.id === taskId);
    if (index !== -1) {
        const newTitle = prompt("Digite o novo título da tarefa:", taskList[index].title);
        if (newTitle !== null && newTitle.trim() !== "") {
            taskList[index].title = newTitle.trim();
            updateTaskList(taskList);
            styleTasks(taskList);
        }
    }
}
/* Criação de elementos HTML*/
function createElement(tag, texto) {
    const element = document.createElement(tag);
    element.textContent = texto;
    return element;
}
