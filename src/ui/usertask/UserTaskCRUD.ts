import { showTasksCounters } from "../../ui/task/index.js";
import { showInfoBanner } from "../../helpers/index.js";
import { IUser } from "../../models/index.js";
import { ITask } from "../../tasks/index.js";
import { showUserTask } from "../usertask/index.js";

/* Estilização por estado */
export function styleTasks(tasList: ITask[]): void {
  const taskListElement = document.querySelector(
    "#usersTaskList",
  ) as HTMLUListElement;
  const listItems = taskListElement.querySelectorAll("li");
  listItems.forEach((li, index) => {
    if (tasList[index].getCompleted()) {
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
    } else {
      li.style.textDecoration = "none";
      li.style.color = "black";
    }
  });
}

/* Função para adicionar uma nova tarefa do utilizador */
export function addNewUserTask(id: number, user: IUser): ITask | undefined {
  //Lê os valores dos inputs.
  const titleInput = document.querySelector("#titleInput") as HTMLInputElement;
  const title = titleInput.value;
  const taskCategory = document.querySelector(
    "#taskCategory",
  ) as HTMLSelectElement;
  const category = taskCategory.value;
  //Limpa os valores dos inputs.
  titleInput.value = "";
  taskCategory.value = "";
  //retorna um novo objeto do tipo Task

  return undefined;
}

/* Função para remover a tarefas concluidas de um utilizador  */
export function removeCompletedTasks(user: IUser): void {
  //para cada tarefa do utilizador
  user.getTasks().forEach((task) => {
    //se a tarefa estiver concluída
    if (task.getCompleted()) {
      //remover a tarefa
      user.removeTask(task.getId());
    } else {
      showInfoBanner(
        "As tarefas não concluídas, não podem ser removidas.",
        "error-banner",
      );
    }
  });
  showTasksCounters("all", user.getTasks() as ITask[]);
  //atualizar a exibição das tarefas
  showUserTask(user, user.getTasks() as ITask[]);
}

/* Função Editar tarefa */
export function userEditTitle(user: IUser, taskId: number): void {
  const index = user.getTasks().findIndex((t) => t.getId() === taskId);
  if (index !== -1) {
    const newTitle = prompt(
      "Digite o novo título da tarefa:",
      user.getTasks()[index].getTitle(),
    );
    if (newTitle !== null && newTitle.trim() !== "") {
      user.getTasks()[index].setTitle(newTitle.trim());
      showTasksCounters("all", user.getTasks());
      //atualizar a exibição das tarefas
      showUserTask(user, user.getTasks());
    }
  }
}

/* Função Concluir tarefa */
export function userCompleteTask(user: IUser, taskId: number): void {
  const index = user.getTasks().findIndex((t) => t.getId() === taskId);
  if (index !== -1) {
    //se a tarefa não estiver concluída
    if (!user.getTasks()[index].getCompleted()) {
      //marcar a tarefa como concluída
      user.getTasks()[index].markCompleted();
    } //atualizar a exibição das tarefas
    showTasksCounters("all", user.getTasks());
    showUserTask(user, user.getTasks());
  }
}

export function userRemoveTask(user: IUser, taskId: number): void {
  user.removeTask(taskId);
  showTasksCounters("all", user.getTasks());
  showUserTask(user, user.getTasks());
}
