import { Category } from "./../../models/task/Category";
import Task from "../../models/task/Task.js";
import User from "../../models/user/User.js";
import showUserTask from "./UserTaskUI.js";

/* Função para obter o ID do utilizador da URL */
export function getUserIdFromURL(): number {
  let userId: number = -1;
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
export function styleTasks(tasList: Task[]): void {
  const taskListElement = document.querySelector(
    "#usersTaskList",
  ) as HTMLUListElement;
  const listItems = taskListElement.querySelectorAll("li");
  listItems.forEach((li, index) => {
    if (tasList[index].completed) {
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
    } else {
      li.style.textDecoration = "none";
      li.style.color = "black";
    }
  });
}

/* Função para adicionar uma nova tarefa do utilizador */
export function addNewUserTask(id: number, user: User): Task {
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
  return new Task(id, title, category as Category, user);
}

/* Função para remover a tarefas concluidas de um utilizador  */
export function removeCompletedTasks(user: User): void {
  //para cada tarefa do utilizador
  user.tasks.forEach((task) => {
    //se a tarefa estiver concluída
    if (task.completed) {
      //remover a tarefa
      user.removeTask(task.id);
    }
  });
  //atualizar a exibição das tarefas
  showUserTask(user, user.tasks as Task[]);
}

/* Função Editar tarefa */
export function userEditTitle(user: User, taskId: number): void {
  const index = user.tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    const newTitle = prompt(
      "Digite o novo título da tarefa:",
      user.tasks[index].title,
    );
    if (newTitle !== null && newTitle.trim() !== "") {
      user.tasks[index].title = newTitle.trim();
      //atualizar a exibição das tarefas
      showUserTask(user, user.tasks as Task[]);
    }
  }
}

/* Função Concluir tarefa */
export function userCompleteTask(user: User, taskId: number): void {
  const index = user.tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    //se a tarefa não estiver concluída
    if (!user.tasks[index].completed) {
      //marcar a tarefa como concluída
      user.tasks[index].markCompleted();
    } //atualizar a exibição das tarefas
    showUserTask(user, user.tasks as Task[]);
  }
}
