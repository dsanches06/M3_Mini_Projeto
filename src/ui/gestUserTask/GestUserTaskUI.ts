import { IUser } from "../../models/index.js";
import { ITask } from "../../tasks/index.js";
import { showInfoBanner } from "../../helpers/index.js";
import { showUserTask } from "../usertask/index.js";
import { showTasksCounters } from "../../ui/task/index.js";
import { removeAllCompletedTask, searchTasksByTitle } from "./index.js";

/* instancia global de   */
let singleUser: IUser | undefined;
//array para armazena tarefas filtradas
let tasksFiltered: ITask[] | undefined;

/* Função principal para mostrar as tarefas apenas de um utilizador */
export function loadUserTask(user: IUser): void {
  singleUser = user;
  //mostra as ttarefas do utilizador atual
  if (singleUser) {
    showTasksCounters("all", singleUser.getTasks());
    showUserTask(singleUser, singleUser.getTasks());
  }
}

/* Filtrar todas as tarefas */
const allTaskBtn = document.querySelector("#allTaskBtn") as HTMLImageElement;
if (allTaskBtn) {
  allTaskBtn.title = "Mostrar todas as tarefas";
  allTaskBtn.addEventListener("click", () => {
    showTasksCounters("all", singleUser?.getTasks());
    showUserTask(singleUser as IUser, singleUser?.getTasks() as ITask[]);
  });
} else {
  console.warn("Elemento #allTaskBtn não foi renderizado no DOM.");
}

/* Filtrar tarefas pendentes */
const taskPendingBtn = document.querySelector(
  "#taskPendingBtn",
) as HTMLImageElement;
if (taskPendingBtn) {
  taskPendingBtn.title = "Mostrar tarefas pendentes";
  taskPendingBtn.addEventListener("click", () => {
    showTasksCounters("pending", singleUser?.pendingTasks());
    showUserTask(singleUser as IUser, singleUser?.pendingTasks() as ITask[]);
  });
} else {
  console.warn("Elemento #taskPendingBtn não foi renderizado no DOM.");
}

/* Filtrar tarefas concluídos */
const taskCompletedBtn = document.querySelector(
  "#taskCompletedBtn",
) as HTMLImageElement;
if (taskCompletedBtn) {
  taskCompletedBtn.title = "Mostrar tarefas concluídas";
  taskCompletedBtn.addEventListener("click", () => {
    showTasksCounters("completed", singleUser?.completedTasks());
    showUserTask(singleUser as IUser, singleUser?.completedTasks() as ITask[]);
  });
} else {
  console.warn("Elemento #taskCompletedBtn não foi renderizado no DOM.");
}

/* Procurar tarefa por titulo */
const searchTask = document.querySelector("#searchTask") as HTMLInputElement;
if (searchTask) {
  searchTask.addEventListener("input", () => {
    //obter o titulo inserido no input em minusculas
    const title = searchTask.value.toLowerCase();
    //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
    tasksFiltered = searchTasksByTitle(
      singleUser?.getTasks() as ITask[],
      title,
    );
    showTasksCounters("all", tasksFiltered);
    showUserTask(singleUser as IUser, tasksFiltered as ITask[]);
  });
} else {
  console.warn("Elemento #searchTask não foi renderizado no DOM.");
}

/*« Ordenar tarefas por título */
const sortTasksUserBtn = document.querySelector(
  "#sortTasksUserBtn",
) as HTMLButtonElement;
if (sortTasksUserBtn) {
  //Crie uma variável de controle
  let isAscending = true;
  sortTasksUserBtn.addEventListener("click", () => {
    //array de ordenação
    let sortTask: ITask[] | undefined;
    if (isAscending) {
      //faz ordenção no estado ascendente
      sortTask = singleUser
        ?.getTasks()
        .sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
    } else {
      //faz ordenção no estado descendente
      sortTask = singleUser
        ?.getTasks()
        .sort((a, b) => b.getTitle().localeCompare(a.getTitle()));
    }
    //Inverta o estado para o próximo clique
    isAscending = !isAscending;
    // Mostrar as tarefas ordenados conforme estado
    showTasksCounters("taskFiltered", sortTask as ITask[]);
    showUserTask(singleUser as IUser, sortTask as ITask[]);
    // Atualize o texto ou ícone do botão
    sortTasksUserBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
  });
} else {
  console.warn("Elemento #sortTaskBtn não foi renderizado no DOM.");
}

/* Abrir modal de formulário */
const addTaskUserBtn = document.querySelector(
  "#addTaskUserBtn",
) as HTMLButtonElement;
if (addTaskUserBtn) {
  addTaskUserBtn.addEventListener("click", () => {});
} else {
  console.warn("Elemento #addTaskUserBtn não foi renderizado no DOM.");
}

/* Remover todas as tarefas concluídas */
const removeCompletedTaskBtn = document.querySelector(
  "#removeCompletedTaskBtn",
) as HTMLButtonElement;
if (removeCompletedTaskBtn) {
  removeCompletedTaskBtn.addEventListener("click", () => {
    const hasPendingTasks = singleUser
      ?.getTasks()
      ?.some((task) => !task.getCompleted());
    if (hasPendingTasks) {
      showInfoBanner(
        "Não é possível remover tarefas. Existem tarefas pendentes.",
        "error-banner",
      );
    } else {
      tasksFiltered = removeAllCompletedTask(singleUser?.getTasks() as ITask[]);
      showTasksCounters("all", tasksFiltered);
      showUserTask(singleUser as IUser, tasksFiltered as ITask[]);
      showInfoBanner(
        "Todas as tarefas concluídas foram removidas com sucesso.",
        "info-banner",
      );
    }
  });
} else {
  console.warn("Elemento #removeCompletedTaskBtn não foi renderizado no DOM.");
}
