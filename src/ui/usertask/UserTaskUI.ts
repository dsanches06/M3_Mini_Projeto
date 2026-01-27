import { showInfoBanner } from "../../helpers/index.js";
import { IUser, UserClass } from "../../models/index.js";
import { ITask } from "../../tasks/index.js";
import {
  countAllTasks,
  countPendingUserTasks,
  countCompletedUserTasks,
} from "../task/index.js";
import {
  styleTasks,
  userEditTitle,
  userCompleteTask,
  userRemoveTask,
} from "./index.js";

/* Mostrar tarefas */
export function showUserTask(user: IUser, tasks: ITask[]): void {
//  countAllTasks("#totalTasks", tasks);
  //countPendingUserTasks("#pendingTasks", tasks);
  //countCompletedUserTasks("#completedTasks", tasks);
 // showUserNameHeader(user);
  renderUserTask(user as UserClass, tasks);
  styleTasks(tasks);
}

/* Função de renderizar apenas as tarefas do utilizador */
function renderUserTask(user: UserClass, taskList: ITask[]) {
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
      const listItem = createTaskItem(user, task as ITask);
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
function createTaskItem(user: UserClass, task: ITask): HTMLLIElement {
  const listItem = document.createElement("li");
  listItem.className = "user-task-item";
  let result: string = "";
  result = `${task.getId()} - ${task.getTitle()} -
${task.getCompleted() ? "Concluída" : "Pendente"} -
${task.getTaskCategory()} - ${
    task.getCompletedDate()
      ? task.getCompletedDate().toLocaleString("pt-PT")
      : "N/A"
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
    userEditTitle(user, task.getId());
  });

  // Botão Concluir
  const completeBtn = document.createElement("a") as HTMLAnchorElement;
  completeBtn.id = "completeTaskBtn";
  completeBtn.title = "Concluir tarefa";
  completeBtn.role = "button";
  completeBtn.addEventListener("click", () => {
    userCompleteTask(user, task.getId());
  });

  // Botão Remover
  const deleteBtn = document.createElement("a") as HTMLAnchorElement;
  deleteBtn.id = "deleteTaskBtn";
  deleteBtn.title = "Remover tarefa";
  deleteBtn.role = "button";
  deleteBtn.addEventListener("click", () => {
    if (task.getCompleted()) {
      userRemoveTask(user, task.getId());
      showInfoBanner(
        `${user.getName()} removeu a tarefa ${task.getTitle()} com sucesso.`,
        "info-banner",
      );
    } else {
      showInfoBanner(
        "Utilizador com tarefas pendentes não pode ser removido.",
        "error-banner",
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
function showUserNameHeader(user: IUser): void {
  const userNameTaskHeader = document.querySelector(
    "#userNameTaskHeader",
  ) as HTMLHeadingElement;
  if (userNameTaskHeader) {
    if (user) {
      userNameTaskHeader.textContent = `TAREFAS DE ${user.getName().toUpperCase()}`;
    } else {
      userNameTaskHeader.textContent = "Utilizador Desconhecido";
    }
  } else {
    console.warn("Elemento #userNameTaskHeader não foi renderizado no DOM.");
  }
}
