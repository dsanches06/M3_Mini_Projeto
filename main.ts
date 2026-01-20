import loadInitialUsers from "./script/ui/gestUserTask/GestUserUI.js";
import GestUserTask from "./script/models/gestUserTask/gestUserTask.js";

/* Instância da classe GestUserTask */
const gestUserTask: GestUserTask = new GestUserTask();

window.onload = () => {
  /* carregar utilizadores iniciais com as suas tarefas, vindo de fake data */
  loadInitialUsers(gestUserTask);
};
// /* mostrar apenas as tarefas de um utilizador */
// loadUserTask(gestUserTask);
