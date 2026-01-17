import showTasks from "./script/ui/task/TaskUI.js";
//import loadUserTask from "./script/ui/usertask/UserTaskUI.js";
import loadInitialUsers from "./script/ui/gestUserTask/GestUserUI.js";
import GestUserTask from "./script/models/gestUserTask/gestUserTask.js";
import loadAllTask from "./script/ui/gestUserTask/GestTaskUI.js";

/* Instância da classe GestUserTask */
const gestUserTask: GestUserTask = new GestUserTask();

/* carregar utilizadores iniciais */
loadInitialUsers(gestUserTask);
/* mostrar todas as tarefas */
loadAllTask(gestUserTask);
//loadUserTask(gestUserTask);
