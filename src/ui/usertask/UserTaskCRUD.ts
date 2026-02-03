import { showInfoBanner } from "../../helpers/index.js";
import { IUser } from "../../models/index.js";
import { ITask } from "../../tasks/index.js";
import { AssignmentService } from "../../services/index.js";

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
  }
}
