import loadInitialUsers from "./script/ui/gestUserTask/GestUserUI.js";
import GestUserTask from "./script/models/gestUserTask/gestUserTask.js";
import loadAllTask from "./script/ui/gestUserTask/GestTaskUI.js";
import loadUserTask from "./script/ui/gestUserTask/GestUserTaskUI.js";
/* Instância da classe GestUserTask */
const gestUserTask = new GestUserTask();
/* carregar utilizadores iniciais */
loadInitialUsers(gestUserTask);
/* mostrar todas as tarefas */
loadAllTask(gestUserTask);
/* mostrar apenas as tarefas de um utilizador */
loadUserTask(gestUserTask);
