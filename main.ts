import { ITask } from "./src/tasks/index.js";
import { clearContainer } from "./src/ui/dom/index.js";
import { TaskService, UserService } from "./src/services/index.js";
import { loadInitialUsers } from "./src/ui/gestUserTask/index.js";
import { loadUsersPage } from "./src/ui/user/index.js";
import { initUsers } from "./src/ui/gestUserTask/index.js";

/* Instância de Services */
const userService = new UserService();
const taskService = new TaskService();

//window.onload = () => {
/* carregar utilizadores iniciais com as suas tarefas, vindo de fake data */
loadInitialUsers(userService);
//};

//obter o menu task
const menuUsers = document.querySelector("#menuUsers") as HTMLAnchorElement;
menuUsers.addEventListener("click", () => {
  //Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadUsersPage(userService);
});

//obter o menu task
const menuTasks = document.querySelector("#menuTasks") as HTMLAnchorElement;
menuTasks.addEventListener("click", () => {
  //
  let tasksList: ITask[] = [];
  for (const user of userService.getAllUsers()) {
    for (const task of user.getTasks()) {
      tasksList.push(task);
    }
  }
  // Inicializar usuários para as funções de tarefa
  initUsers(userService);

  //limpa o container
  clearContainer();
  //mostrar todas as tarefas de todos os utilizadores
  // loadTasksPage(tasksList);
});
