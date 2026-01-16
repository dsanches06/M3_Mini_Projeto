import showTasks from "./script/ui/task/TaskList.js";
import loadUserTask from "./script/ui/usertask/UserTaskUI.js";
import loadInitialUsers from "./script/ui/gestUserTask/GestUserUI.js";
import GestUserTask from "./script/models/gestUserTask/gestUserTask.js";

/* Instância da classe GestUserTask */
const gestUserTask: GestUserTask = new GestUserTask();

/* Loading initial users.. */
loadInitialUsers(gestUserTask);
loadUserTask(gestUserTask);
showTasks(gestUserTask);
