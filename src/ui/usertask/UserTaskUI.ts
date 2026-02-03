import { showInfoBanner } from "../../helpers/index.js";
import { IUser, UserClass } from "../../models/index.js";
import { ITask } from "../../tasks/index.js";
import { unassigUserTask } from "../gestUserTask/index.js";
import {
  styleTasks,
  userEditTitle,
  userCompleteTask,
  showUserTasksCounters,
} from "./index.js";

/* Mostrar tarefas */
export function showUserTask(user: IUser, tasks: ITask[]): void {
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
    if (!task.getCompleted()) {
      userEditTitle(user, task.getId());
      showUserTask(user, user.getTasks());
      showUserTasksCounters(user.getTasks());
    } else {
      showInfoBanner(
        `A tarefa "${task.getTitle()}" não pode ser editada pois já está concluída.`,
        "info-banner",
      );
    }
  });

  // Botão Concluir
  const completeBtn = document.createElement("a") as HTMLAnchorElement;
  completeBtn.id = "completeTaskBtn";
  completeBtn.title = "Concluir tarefa";
  completeBtn.role = "button";
  completeBtn.addEventListener("click", () => {
    userCompleteTask(user, task.getId());
    showUserTask(user, user.getTasks());
    showUserTasksCounters(user.getTasks());
  });

  // Botão Remover
  const unassigTaskBtn = document.createElement("a") as HTMLAnchorElement;
  unassigTaskBtn.id = "unassignTaskBtn";
  unassigTaskBtn.title = "Cancelar tarefa";
  unassigTaskBtn.role = "button";
  unassigTaskBtn.addEventListener("click", () => {
    if (!task.getCompleted()) {
      unassigUserTask(user, task.getId());
      showInfoBanner(
        `A tarefa "${task.getTitle()}" foi cancelada do utilizador "${user.getName()}" com sucesso.`,
        "info-banner",
      );
      showUserTask(user, user.getTasks());
      showUserTasksCounters(user.getTasks());
    } else {
      showInfoBanner(
        `A tarefa "${task.getTitle()}" não pode ser cancelada pois já está concluída.`,
        "info-banner",
      );
    }
  });

  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(unassigTaskBtn);

  listItem.appendChild(buttonContainer);

  return listItem;
}
