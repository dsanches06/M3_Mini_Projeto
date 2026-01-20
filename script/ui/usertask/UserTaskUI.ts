import { showInfoBanner } from "../../helpers/infoBanner.js";
import Task from "../../models/task/Task.js";
import User from "../../models/user/User.js";
import {
  countAllTasks,
  countCompletedUserTasks,
  countPendingUserTasks,
} from "../task/TaskCountersUI.js";
import { styleTasks, userCompleteTask, userEditTitle } from "./UserTaskCRUD.js";
import { showUserTaskCounters } from "./UserTaskPage.js";

/* Mostrar tarefas */
export default function showUserTask(user: User, tasks: Task[]): void {
  countAllTasks("#totalTasks", tasks as Task[]);
  countPendingUserTasks("#pendingTasks", tasks as Task[]);
  countCompletedUserTasks("#completedTasks", tasks as Task[]);
  showUserNameHeader(user);
  renderUserTask(user, tasks as Task[]);
  styleTasks(tasks as Task[]);
}

/* Função de renderizar apenas as tarefas do utilizador */
function renderUserTask(user: User, taskList: Task[]) {
  /* Container de tarefas do utilizador */
  const usersTaskContainer = document.querySelector(
    "#usersTaskContainer",
  ) as HTMLElement;
  if (usersTaskContainer) {
    //Limpa o contentor HTML.
    usersTaskContainer.innerHTML = "";
    //Cria uma lista não ordenada.
    const ul = document.createElement("ul") as HTMLUListElement;
    ul.id = "usersTaskList";
    //Para cada tarefa na lista de tarefas.
    taskList.forEach((task) => {
      //Cria um item de lista para a tarefa.
      const listItem = createTaskItem(user, task as Task);
      //Adiciona o item de lista à lista não ordenada.
      ul.appendChild(listItem);
    });
    //Adiciona a lista não ordenada ao contentor de tarefas do utilizador.
    usersTaskContainer.appendChild(ul);
  } else {
    console.warn("Elemento #usersTaskContainer não foi renderizado no DOM.");
  }
}

/* Função para criar um item de lista de tarefa */
function createTaskItem(user: User, task: Task): HTMLLIElement {
  const listItem = document.createElement("li");
  listItem.className = "user-task-item";
  let result: string = "";
  result = `${task.id} - ${task.title} - 
${task.completed ? "Concluída" : "Pendente"} - 
${task.category} - ${
    task.completeDate ? task.completeDate.toLocaleString("pt-PT") : "N/A"
  }`;
  listItem.textContent = result;

  // Criar container para botões
  const buttonContainer = document.createElement("section") as HTMLElement;
  buttonContainer.className = "task-buttons";

  // Botão Editar
  const editBtn = document.createElement("a") as HTMLAnchorElement;
  editBtn.id = "editTaskBtn";
  editBtn.title = "Editar titulo da tarefa";
  editBtn.role = "button";
  editBtn.addEventListener("click", () => {
    userEditTitle(user, task.id);
    showUserTaskCounters(user.tasks as Task[]);
  });

  // Botão Concluir
  const completeBtn = document.createElement("a") as HTMLAnchorElement;
  completeBtn.id = "completeTaskBtn";
  completeBtn.title = "Concluir tarefa";
  completeBtn.role = "button";
  completeBtn.addEventListener("click", () => {
    userCompleteTask(user, task.id);
    showUserTaskCounters(user.tasks as Task[]);
  });

  // Botão Remover
  const deleteBtn = document.createElement("a") as HTMLAnchorElement;
  deleteBtn.id = "deleteTaskBtn";
  deleteBtn.title = "Remover tarefa";
  deleteBtn.role = "button";
  deleteBtn.addEventListener("click", () => {
    if (task.completed) {
      user.removeTask(task.id);
      showUserTaskCounters(user.tasks as Task[]);
      showInfoBanner(
        `${user.name} removeu a tarefa ${task.title} com sucesso.`,
        "info-banner",
      );
    } else {
      showInfoBanner(
        "Utilizador com tarefas pendentes não pode ser removido.",
        "alert-banner",
      );
    }
  });

  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(deleteBtn);

  listItem.appendChild(buttonContainer);

  return listItem;
}

/* Função para mostrar o nome de utilizador no cabeçalho */
function showUserNameHeader(user: User): void {
  const userNameTaskHeader = document.querySelector(
    "#userNameTaskHeader",
  ) as HTMLHeadingElement;
  if (userNameTaskHeader) {
    if (user) {
      userNameTaskHeader.textContent = `TAREFAS DE ${user.name.toUpperCase()}`;
    } else {
      userNameTaskHeader.textContent = "Utilizador Desconhecido";
    }
  } else {
    console.warn("Elemento #userNameTaskHeader não foi renderizado no DOM.");
  }
}
