import loadInitialUsers from "./script/ui/gestUserTask/GestUserUI.js";
import GestUserTask from "./script/models/gestUserTask/gestUserTask.js";
import loadAllTask from "./script/ui/gestUserTask/GestTaskUI.js";
import loadUserTask from "./script/ui/gestUserTask/GestUserTaskUI.js";
import { fakeUsersData, fakeTasksData } from "./script/helpers/fakeData.js";
/* Instância da classe GestUserTask */
const gestUserTask = new GestUserTask();
const fakeUserData = fakeUsersData;
const fakeTaskData = fakeTasksData;
/* carregar utilizadores iniciais com as suas tarefas, vindo de fake data */
loadInitialUsers(gestUserTask, fakeUserData, fakeTaskData);
/* mostrar todas as tarefas */
loadAllTask(gestUserTask);
/* mostrar apenas as tarefas de um utilizador */
loadUserTask(gestUserTask);
