import { TaskService } from "./src/services/index.js";
import { loadInitialUsers } from "./src/ui/gestUserTask/index.js";
import { loadUsersPage } from "./src/ui/user/index.js";
import { loadTasksPage } from "./src/ui/task/TaskPage.js";

window.onload = () => {
  /* carregar utilizadores iniciais com as suas tarefas, vindo de fake data */
  loadInitialUsers();
};

//obter o menu task
const menuUsers = document.querySelector("#menuUsers") as HTMLAnchorElement;
menuUsers.addEventListener("click", () => {
  // carrega a pagina dinamica de utilizadores
  loadUsersPage();
});

//obter o menu task
const menuTasks = document.querySelector("#menuTasks") as HTMLAnchorElement;
menuTasks.addEventListener("click", () => {
  //mostrar todas as tarefas de todos os utilizadores
  loadTasksPage(TaskService.getAllTasks());
});
