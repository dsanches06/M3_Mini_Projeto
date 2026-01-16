import User from "../../models/user/User.js";
import { fakeUsersData } from "../../helpers/fakeUsersData.js";
import { addNewUser, showUsers } from "../user/UserUI.js";
import { openFormModal } from "../user/UserModalUI.js";
import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
/* Instância da classe GestUserTask */
export const gestUserTask = new GestUserTask();
/* Função principal para carregar utilizadores iniciais */
export default function loadInitialUsers() {
    // Usar um ciclo para converter os dados em instâncias da classe
    for (const userData of fakeUsersData) {
        const user = new User(userData.id, userData.name, userData.email);
        gestUserTask.addUser(user);
    }
    // Mostrar os utilizadores
    showUsers(gestUserTask.users);
}
/* Obter o último ID de utilizador */
function getLastUserId() {
    //
    let lastUserID = 0;
    //obter o ultimo utilizador no array
    const lastUser = gestUserTask.users[gestUserTask.users.length - 1];
    // Check if the last user exists and get the last user's ID
    if (lastUser) {
        lastUserID = lastUser.id;
    }
    return lastUserID;
}
/* Abrir modal de formulário */
const addUserBtn = document.querySelector("#addUserBtn");
if (addUserBtn) {
    addUserBtn.addEventListener("click", openFormModal);
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
        //obter um novo id a partir do ultimo
        let newId = getLastUserId() + 1;
        //cria um novo user com os dados inseridos no formulario
        const user = addNewUser(newId);
        //adiciona a lista de utilizadores
        gestUserTask.addUser(user);
        //fecha o modal
        const modalForm = document.querySelector("#modalForm");
        modalForm.style.display = "none";
        //mostra todos os utilizadores
        showUsers(gestUserTask.users);
    });
}
/* Filtrar todos os utilizadores */
const allUserBtn = document.querySelector("#allUserBtn");
if (allUserBtn) {
    allUserBtn.title = "Mostrar todos os utilizadores";
    allUserBtn.addEventListener("click", () => {
        showUsers(gestUserTask.users);
    });
}
/* Filtrar utilizadores ativos */
const ativeUsersBtn = document.querySelector("#ativeUsersBtn");
if (ativeUsersBtn) {
    ativeUsersBtn.title = "Mostrar utilizadores ativos";
    ativeUsersBtn.addEventListener("click", () => {
        const activeUsers = gestUserTask.users.filter((user) => user.isAtive);
        showUsers(activeUsers);
    });
}
/* Filtrar utilizadores inativos */
const unableUsersBtn = document.querySelector("#unableUsersBtn");
if (unableUsersBtn) {
    unableUsersBtn.title = "Mostrar utilizadores inativos";
    unableUsersBtn.addEventListener("click", () => {
        const activeUsers = gestUserTask.users.filter((user) => !user.isAtive);
        showUsers(activeUsers);
    });
}
/* Procurar utilizador por nome */
const searchUser = document.querySelector("#searchUser");
if (searchUser) {
    searchUser.addEventListener("input", () => {
        //obter o nome inserido no input em minusculas
        const name = searchUser.value.toLowerCase();
        //filtrar a lista de utilizadores pelo nome
        const filteredUsers = gestUserTask.users.filter((user) => user.name.toLowerCase().includes(name));
        //mostrar os utilizadores filtrados
        showUsers(filteredUsers);
    });
}
/* Ordenar utilizadores por nome */
const sortUsersBtn = document.querySelector("#sortUsersBtn");
if (sortUsersBtn) {
    //Crie uma variável de controle de estado
    let isAscending = true;
    sortUsersBtn.addEventListener("click", () => {
        const sortedUsers = [...gestUserTask.users];
        //Ordenar com base no estado atual
        if (isAscending) {
            sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        }
        else {
            sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
        }
        //Inverta o estado para o próximo clique
        isAscending = !isAscending;
        // Mostrar os utilizadores ordenados
        showUsers(sortedUsers);
        // Atualize o texto ou ícone do botão
        sortUsersBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
    });
}
