import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import showTask from "../task/TaskUI.js";
import Task from "../../models/task/Task.js";
import { getTasksByFilter } from "../../helpers/getTaskByFilter.js";

/* array global de utilizadores */
let users: User[];
//array global para armazenar tarefas filtradas
let tasksFiltered: Task[];

/* Função principal para mostrar as tarefas de todos os utilizadores */
export default function loadAllTask(gestUsersTask: GestUserTask): void {
  //atribuir o valor ao array global de utilizadores
  users = gestUsersTask.users as User[];
  //inicializa o array para evitar repetiçoes de dados
  tasksFiltered = [];
  //por cada utilizador
  for (const user of users) {
    //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
    tasksFiltered = getTasksByFilter(user, tasksFiltered, "all");
  }
  //mostrar todas as tarefas de todos os utilizadores
  showTask(tasksFiltered);
}

/* Filtrar todas as tarefas */
const allTaskBtn = document.querySelector("#allTaskBtn") as HTMLImageElement;
if (allTaskBtn) {
  allTaskBtn.title = "Mostrar todas as tarefas";
  allTaskBtn.addEventListener("click", () => {
    //inicializa o array para evitar repetiçoes de dados
    tasksFiltered = [];
    //por cada utilizador
    for (const user of users) {
      //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
      tasksFiltered = getTasksByFilter(user, tasksFiltered, "all");
    }
    //mostrar todas as tarefas de todos os utilizadores
    showTask(tasksFiltered);
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
    //inicializa o array para evitar repetiçoes de dados
    tasksFiltered = [];
    //por cada utilizador
    for (const user of users) {
      //filtra a procura de tarefas pendentes e adiciona ao
      //array e retorna o mesmo array
      tasksFiltered = getTasksByFilter(user, tasksFiltered, "pending");
    }
    //mostrar todas as tarefas de todos os utilizadores
    showTask(tasksFiltered);
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
    //inicializa o array para evitar repetiçoes de dados
    tasksFiltered = [];
    //por cada utilizador
    for (const user of users) {
      //filtra a procura de tarefas concluidas
      // e adiciona ao array e retorna o mesmo array
      tasksFiltered = getTasksByFilter(user, tasksFiltered, "completed");
    }
    //mostra apenas tarefas concluidas
    showTask(tasksFiltered);
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
    //inicializa o array para evitar repetiçoes de dados
    tasksFiltered = [];
    //por cada utilizador
    for (const user of users) {
      //filtra a procura de tarefas pelo titulo
      //e adiciona ao array e retorna o mesmo array
      tasksFiltered = getTasksByFilter(user, tasksFiltered, "search", title);
    }
    //mostrar as tarefas filtrados pelo titulo
    showTask(tasksFiltered);
  });
} else {
  console.warn("Elemento #searchTask não foi renderizado no DOM.");
}

/* Ordenar tarefa pelo titulo */
const sortTasksBtn = document.querySelector(
  "#sortTasksBtn",
) as HTMLButtonElement;
if (sortTasksBtn) {
  //Crie uma variável de controle
  let isAscending = true;
  sortTasksBtn.addEventListener("click", () => {
    //array de ordenação
    let sortTask: Task[] = [];
    //inicializa o array para evitar repetiçoes de dados
    tasksFiltered = [];
    //por cada utilizador
    for (const user of users) {
      //filtra a procura de tarefas pelo titulo
      //e adiciona ao array e retorna o mesmo array
      tasksFiltered = getTasksByFilter(user, tasksFiltered, "all");
    }
    //Ordenar com base no estado atual
    if (isAscending) {
      //faz ordenção no estado ascendente
      sortTask = tasksFiltered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      //faz ordenção no estado descendente
      sortTask = tasksFiltered.sort((a, b) => b.title.localeCompare(a.title));
    }
    //Inverta o estado para o próximo clique
    isAscending = !isAscending;
    // Mostrar as tarefas ordenados conforme estado
    showTask(sortTask);
    // Atualize o texto ou ícone do botão
    sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
  });
} else {
  console.warn("Elemento #sortTaskBtn não foi renderizado no DOM.");
}

/* Remover todas as tarefas concluídas de todos os utilizadores */
const removeAllCompletedTaskBtn = document.querySelector(
  "#removeAllCompletedTaskBtn",
) as HTMLImageElement;
if (removeAllCompletedTaskBtn) {
  removeAllCompletedTaskBtn.title = "Remover todas as tarefas concluídas";
  removeAllCompletedTaskBtn.addEventListener("click", () => {
    //inicializa o array para evitar repetiçoes de dados
    tasksFiltered = [];
    //por cada utilizador
    for (const user of users) {
      //por cada tarefa do utilizador
      for (const task of user.tasks as Task[]) {
        //se estiver completa
        if (task.completed) {
          //remover da lista de tarefas do utilizador
          user.removeTask(task.id);
        } else {
          //se não estiver concluida
          tasksFiltered.push(task);
        }
      }
    }
    //mostrar todas as tarefas que não foram concluídas
    showTask(tasksFiltered);
  });
} else {
  console.warn(
    "Elemento #removeAllCompletedTaskBtn não foi renderizado no DOM.",
  );
}
