import loadInitialUsers from "./script/ui/gestUserTask/GestUserUI.js";
import GestUserTask from "./script/models/gestUserTask/gestUserTask.js";
import { clearContainer } from "./script/ui/dom/ContainerSection.js";
import loadUsersPage from "./script/ui/user/UserPage.js";
import loadTasksPage from "./script/ui/task/TaskPage.js";
import loadUserTaskPage from "./script/ui/usertask/UserTaskPage.js";
import ITask from "./script/models/task/ITask.js";
import User from "./script/models/user/User.js";
import { initUsers } from "./script/ui/gestUserTask/GestTaskUI.js";

/* Instância da classe GestUserTask */
const gestUserTask: GestUserTask = new GestUserTask();

window.onload = () => {
  /* carregar utilizadores iniciais com as suas tarefas, vindo de fake data */
  loadInitialUsers(gestUserTask);
};
// /* mostrar apenas as tarefas de um utilizador */
// loadUserTask(gestUserTask);

//obter o menu task
const menuUsers = document.querySelector("#menuUsers") as HTMLAnchorElement;
menuUsers.addEventListener("click", () => {
  //Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadUsersPage(gestUserTask);
});

//obter o menu task
const menuTasks = document.querySelector("#menuTasks") as HTMLAnchorElement;
menuTasks.addEventListener("click", () => {
  //
  let tasksList: ITask[] = [];
  for (const user of gestUserTask.users as User[]) {
    for (const task of user.tasks as ITask[]) {
      tasksList.push(task);
    }
  }

  // Inicializar usuários para as funções de tarefa
  initUsers(gestUserTask);

  //limpa o container
  clearContainer();
  //mostrar todas as tarefas de todos os utilizadores
  loadTasksPage(gestUserTask, tasksList);
});
