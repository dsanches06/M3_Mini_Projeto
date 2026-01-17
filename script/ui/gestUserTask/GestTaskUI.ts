import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import showTask from "../task/TaskUI.js";

/* Instância da classe GestUserTask  */
let gestUserTask: GestUserTask;
let filterUsers: User[] = [];

/* Função principal para mostrar as tarefas de todos os utilizadores */
export default function loadAllTask(gestUsersTasks: GestUserTask): void {
  //atribuir a instância recebida ao escopo global
  gestUserTask = gestUsersTasks;
  //mostrar todas as tarefas de todos os utilizadores
  showTask(gestUserTask.users as User[]);
}

/* Filtrar todas as tarefas */
const allTaskBtn = document.querySelector("#allTaskBtn") as HTMLImageElement;
if (allTaskBtn) {
  allTaskBtn.title = "Mostrar todas as tarefas";
  allTaskBtn.addEventListener("click", () => {
    showTask(gestUserTask.users as User[]);
  });
}

/* Filtrar tarefas pendentes */
const taskPendingBtn = document.querySelector(
  "#taskPendingBtn"
) as HTMLImageElement;
if (taskPendingBtn) {
  taskPendingBtn.title = "Mostrar tarefas pendentes";
  taskPendingBtn.addEventListener("click", () => {
    //filtrar utilizadores
    filterUsers = (gestUserTask.users as User[]).filter((user) =>
      //com tarefas pendentes
      user.tasks.some((task) => !task.completed)
    );
    //mostrar as tarefas pendentes
    showTask(filterUsers as User[]);
  });
}

/* Filtrar tarefas concluídos */
const taskCompletedBtn = document.querySelector(
  "#taskCompletedBtn"
) as HTMLImageElement;
if (taskCompletedBtn) {
  taskCompletedBtn.title = "Mostrar tarefas concluídas";
  taskCompletedBtn.addEventListener("click", () => {
    //filtrar utilizadores
    filterUsers = (gestUserTask.users as User[]).filter((user) =>
      //com tarefas concluídas
      user.tasks.some((task) => task.completed)
    );
    //mostrar as tarefas concluídas
    showTask(filterUsers as User[]);
  });
}

/* Procurar tarefa por titulo */
const searchTask = document.querySelector("#searchTask") as HTMLInputElement;
if (searchTask) {
  searchTask.addEventListener("input", () => {
    //obter o titulo inserido no input em minusculas
    const titulo = searchTask.value.toLowerCase();
    //filtrar utilizadores
    filterUsers = (gestUserTask.users as User[]).filter((user) =>
      //com tarefas concluídas
      user.tasks.some((task) => task.title.toLowerCase().includes(titulo))
    );
    console.table(filterUsers)
    //mostrar os utilizadores filtrados
    showTask(filterUsers as User[]);
  });
}

/* Ordenar tarefa pelo titulo */
const sortTasksBtn = document.querySelector(
  "#sortTasksBtn"
) as HTMLButtonElement;
if (sortTasksBtn) {
  //Crie uma variável de controle
  let isAscending = true;
  sortTasksBtn.addEventListener("click", () => {
    //Ordenar com base no estado atual
    if (isAscending) {
      //filtra os utilizadores
      filterUsers = (gestUserTask.users as User[]).filter((user) =>
        //e ordena as tarefas pelo titulo ascendente
        user.tasks.sort((a, b) => a.title.localeCompare(b.title))
      );
    } else {
      //filtra os utilizadores
      filterUsers = (gestUserTask.users as User[]).filter((user) =>
        //e ordena as tarefas pelo titulo descendente
        user.tasks.sort((a, b) => b.title.localeCompare(a.title))
      );
    }
    //Inverta o estado para o próximo clique
    isAscending = !isAscending;
    // Mostrar oas tarefas ordenados
    showTask(filterUsers as User[]);
    // Atualize o texto ou ícone do botão
    sortTasksBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
  });
}
