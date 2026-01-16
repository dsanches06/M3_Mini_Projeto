import { openFormModal } from "../user/UserModalUI.js";
/* Instância da classe GestUserTask  */
let gestUserTask;
/* Função principal para carregar tarefas do utilizador */
export default function loadUserTask(gestUsersTasks) {
    //atribuir a instância recebida ao escopo global
    gestUserTask = gestUsersTasks;
    //obter o elemento do cabeçalho do nome do utilizador
    const userNameHeader = document.querySelector("#userNameTaskHeader");
    //se o cabeçalho existir
    if (userNameHeader) {
        //obter o parâmetro da URL
        const urlParams = new URLSearchParams(window.location.search);
        //obter o parâmetro do ID do utilizador
        const userParam = urlParams.get("userId");
        console.log("userParam:", userParam);
        console.table(gestUserTask.users);
        if (userParam) {
            //converter o parâmetro para número
            const userId = parseInt(userParam);
            //encontrar o utilizador pelo ID
            const user = findUserById(userId);
            //atualizar o cabeçalho com o nome do utilizador, se existir
            if (user) {
                userNameHeader.textContent = user.name;
            }
            else {
                userNameHeader.textContent = "Utilizador não encontrado";
            }
        }
        else {
            userNameHeader.textContent = "ID não encontrado";
        }
    }
}
/* Função para encontrar utilizador por ID */
function findUserById(userId) {
    return gestUserTask.users.find((user) => user.id === userId);
}
/* Abrir modal de formulário */
const addUserBtn = document.querySelector("#addUserBtn");
if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
        openFormModal();
    });
}
/* Adicionar utilizador via formulário */
const formUser = document.querySelector("#formUser");
if (formUser) {
    formUser.addEventListener("submit", (event) => {
        // Prevent form submissio
        event.preventDefault();
        // Obter valores dos inputs
        const nameInput = document.querySelector("#nameInput");
        const emailInput = document.querySelector("#emailInput");
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        // Obter elemento do banner de erro
        const errorBanner = document.querySelector("#errorBanner");
        // Limpar mensagens de erro anteriores
        errorBanner.textContent = "";
        errorBanner.style.display = "none";
        // Validações
        let isValid = true;
        let errorMessages = [];
        if (name === "") {
            errorMessages.push("O nome não pode estar vazio.");
            isValid = false;
        }
        if (!email.includes("@")) {
            errorMessages.push("O email deve conter '@'.");
            isValid = false;
        }
        // Se não válido, mostrar banner de erro
        if (!isValid) {
            errorBanner.textContent = errorMessages.join(" ");
            errorBanner.style.display = "block";
            return;
        }
    });
}
/* Filtrar todos as tarefas do utilizador */
const allTaskUserBtn = document.querySelector("#allTaskUserBtn");
if (allTaskUserBtn) {
    allTaskUserBtn.title = "Mostrar todas as tarefas do utilizador";
    allTaskUserBtn.addEventListener("click", () => { });
}
/* Filtrar todas as tarefas pendentes do utilizador */
const taskPendingUserBtn = document.querySelector("#taskPendingUserBtn");
if (taskPendingUserBtn) {
    taskPendingUserBtn.title = "Mostrar tarefas pendentes do utilizador";
    taskPendingUserBtn.addEventListener("click", () => { });
}
/* Filtrar todas as tarefas concluídas do utilizador */
const taskCompletedUserBtn = document.querySelector("#taskCompletedUserBtn");
if (taskCompletedUserBtn) {
    taskCompletedUserBtn.title = "Mostrar tarefas concluídas do utilizador";
    taskCompletedUserBtn.addEventListener("click", () => { });
}
/* Procurar tarefas do utilizador */
const searchTaskUser = document.querySelector("#searchTaskUser");
if (searchTaskUser) {
    searchTaskUser.addEventListener("input", () => {
        //obter o nome inserido no input em minusculas
        const name = searchTaskUser.value.toLowerCase();
        //filtrar as tarefas do utilizador
        const filteredTasks = gestUserTask.users.filter((user) => user.name.toLowerCase().includes(name));
        //mostrar as tarefas filtradas
        //showTasks(filteredTasks);
    });
}
/* Ordenar tarefas do utilizador */
const sortTasksUserBtn = document.querySelector("#sortTasksUserBtn");
if (sortTasksUserBtn) {
    //Crie uma variável de controle de estado
    let isAscending = true;
    sortTasksUserBtn.addEventListener("click", () => {
        const sortedTasks = [...gestUserTask.users];
        //Ordenar com base no estado atual
        if (isAscending) {
            sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
        }
        else {
            sortedTasks.sort((a, b) => b.name.localeCompare(a.name));
        }
        //Inverta o estado para o próximo clique
        isAscending = !isAscending;
        // Mostrar tarefas ordenadas
        //showTasks(sortedTasks);
        // Atualize o texto ou ícone do botão
        sortTasksUserBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
}
/* Remover todas tarefas concluídas */
const completedTaskBtn = document.querySelector("#completedTaskBtn");
if (completedTaskBtn) {
    completedTaskBtn.style.backgroundColor = "red";
    completedTaskBtn.addEventListener("click", () => {
        /* for (let i = taskList.length - 1; i >= 0; i--) {
          if (taskList[i].completed) {
            taskList.splice(i, 1);
          }
        }*/
    });
}
