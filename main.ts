import loadInitialUsers from "./script/ui/gestUserTask/GestUserUI.js";
import GestUserTask from "./script/models/gestUserTask/gestUserTask.js";
import loadAllTask from "./script/ui/gestUserTask/GestTaskUI.js";
import loadUserTask from "./script/ui/gestUserTask/GestUserTaskUI.js";
import { fakeUsersData, fakeTasksData } from "./script/helpers/fakeData.js";
import IUser from "./script/models/user/IUser.js";
import ITask from "./script/models/task/ITask.js";

/* Instância da classe GestUserTask */
const gestUserTask: GestUserTask = new GestUserTask();

window.onload = () => {
  /* carregar utilizadores iniciais com as suas tarefas, vindo de fake data */
  loadInitialUsers(gestUserTask);
};



// /* mostrar todas as tarefas */
// loadAllTask(gestUserTask);
// /* mostrar apenas as tarefas de um utilizador */
// loadUserTask(gestUserTask);
