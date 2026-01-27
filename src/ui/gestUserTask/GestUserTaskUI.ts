import { IUser } from "../../models/index.js";
import { ITask } from "../../tasks/index.js";
import { UserService } from "../../services/index.js";
import { getLastID, getTasksByFilter, showInfoBanner } from "../../helpers/index.js";
import { showUserTask, getUserIdFromURL,addNewUserTask} from "../usertask/index.js";

/* instancia global de   */
let user: IUser | undefined;
//array para armazena tarefas filtradas
let tasksFiltered: ITask[];

/* Função principal para mostrar as tarefas apenas de um utilizador */
export function loadUserTask(servicesUser: UserService): void {
  //obter o id capturado de url
  let id = getUserIdFromURL();
  //se o id for diferente de - 1
  if (id !== -1) {
    //atribuir o valor do utilizador encontrado pelo id
    user = servicesUser.getUserById(id);
    //mostra as ttarefas do utilizador atual
    if (user) {
      showUserTask(user, user.getTasks());
    }
  }
}

/* Filtrar todas as tarefas */
const allTaskBtn = document.querySelector("#allTaskBtn") as HTMLImageElement;
if (allTaskBtn) {
  allTaskBtn.title = "Mostrar todas as tarefas";
  allTaskBtn.addEventListener("click", () => {
    //inicializa o array para evitar repetiçoes de dados
    tasksFiltered = [];
    //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
    //tasksFiltered = getTasksByFilter(user, tasksFiltered, "all");
    //mostra as ttarefas do utilizador atual
   // showUserTask(user, tasksFiltered);
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
    //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
  //  tasksFiltered = getTasksByFilter(user, tasksFiltered, "pending");
    //mostra as ttarefas do utilizador atual
    //showUserTask(user, tasksFiltered);
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
    //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
    //tasksFiltered = getTasksByFilter(user, tasksFiltered, "completed");
    //mostra as ttarefas do utilizador atual
   // showUserTask(user, tasksFiltered);
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
    //filtra a procura de tarefas e adiciona ao array e retorna o mesmo array
   // tasksFiltered = getTasksByFilter(user, tasksFiltered, "search", title);
    //mostra as ttarefas do utilizador atual
   // showUserTask(user, tasksFiltered);
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
    let sortTask: ITask[] = [];
    //inicializa o array para evitar repetiçoes de dados
    tasksFiltered = [];
    //filtra a procura de tarefas pelo titulo
    //e adiciona ao array e retorna o mesmo array
   // tasksFiltered = getTasksByFilter(user, tasksFiltered, "all");
    //Ordenar com base no estado atual
    if (isAscending) {
      //faz ordenção no estado ascendente
      sortTask = tasksFiltered.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
    } else {
      //faz ordenção no estado descendente
      sortTask = tasksFiltered.sort((a, b) => b.getTitle().localeCompare(a.getTitle()));
    }
    //Inverta o estado para o próximo clique
    isAscending = !isAscending;
    // Mostrar as tarefas ordenados conforme estado
   // showUserTask(user, sortTask);
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
    const hasPendingTasks = user?.getTasks()?.some((task) => !task.getCompleted());
    if (hasPendingTasks) {
      showInfoBanner(
        "Não é possível remover tarefas. Existem tarefas pendentes.",
        "error-banner",
      );
      return;
    }
   // removeCompletedTasks(user);
   // showUserTask(user, user?.getTasks() as ITask[]);
  });
} else {
  console.warn("Elemento #removeCompletedTaskBtn não foi renderizado no DOM.");
}

/* Adicionar tarefa do utilizador via formulário */
const formTaskUser = document.querySelector("#formTaskUser") as HTMLFormElement;
if (formTaskUser) {
  formTaskUser.addEventListener("submit", (event: Event) => {
    // Prevent form submissio
    event.preventDefault();

    // Obter valores dos inputs
    const titleInput = document.querySelector(
      "#titleInput",
    ) as HTMLInputElement;
    const taskCategory = document.querySelector(
      "#taskCategory",
    ) as HTMLSelectElement;
    const title = titleInput.value.trim();
    const category = taskCategory.value.trim();

    // Validações
    let isValid = true;
    let errorMessages: string[] = [];
    if (title === "") {
      errorMessages.push("O titulo não pode estar vazio.");
      isValid = false;
    }

    if (category === "") {
      errorMessages.push("A categoria não pode estar vazio.");
      isValid = false;
    }

    if (
      category !== "Trabalho" &&
      category !== "Pessoal" &&
      category !== "Estudo"
    ) {
      errorMessages.push(
        "A categoria deve ser 'Trabalho', 'Pessoal' ou 'Estudo'.",
      );
      isValid = false;
    }

    // Se não válido, mostrar banner de erro
    if (!isValid) {
      showInfoBanner(errorMessages.join(" "), "error-banner");
      return;
    }
    

    //obter um novo id a partir do ultimo
    //let newId: number = getLastID(user?.getTasks()) + 1;
    //cria um novo user com os dados inseridos no formulario
    //const task: ITask = addNewUserTask(newId, user);
    //adiciona a lista de utilizadores
    //user?.createTask(task);
    //fecha o modal
    const modalForm = document.querySelector(
      "#modalUserTaskForm",
    ) as HTMLElement;
    modalForm.style.display = "none";
    showInfoBanner(`${user?.getName()}, adicionou uma nova tarefa.`, "info-banner");
    //mostra todos os utilizadores
   // showUserTask(user, user?.getTasks() as ITask[]);
  });
} else {
  console.warn("Elemento #formTaskUser não foi renderizado no DOM.");
}
