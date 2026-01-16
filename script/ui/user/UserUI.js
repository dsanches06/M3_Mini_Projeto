import User from "../../models/user/User.js";
import { countAtiveUsers, countUnableUsers, countUsers, countAtivePercentage, } from "./UserCountersUI.js";
import { createUserCard } from "./UserCardUI.js";
/* Container de utilizadores */
const usersContainer = document.querySelector("#usersContainer");
/* Mostrar utilizadores */
export function showUsers(usersList) {
    renderUsers(usersList);
    countUsers(usersList);
    countAtiveUsers(usersList);
    countUnableUsers(usersList);
    countAtivePercentage(usersList);
}
/* Função de renderização */
export function renderUsers(userList) {
    if (usersContainer) {
        //Limpa o contentor HTML.
        usersContainer.innerHTML = "";
        userList.forEach((user) => 
        //Para cada utilizador, cria um cartão HTML.
        createUserCard(user, userList));
        // Aplicar cores aos cartões
        applyCardColors();
    }
}
/* Função para adicionar novo utilizador */
export function addNewUser(id) {
    //Lê os valores dos inputs.
    const nameInput = document.querySelector("#nameInput");
    const name = nameInput.value;
    const emailInput = document.querySelector("#emailInput");
    const email = emailInput.value;
    //Limpa os valores dos inputs.
    nameInput.value = "";
    emailInput.value = "";
    //retorna um novo objeto do tipo UserClass
    return new User(id, name, email);
}
/* Alternar estado (ativo / inativo) */
export function toggleUserState(userID, userList) {
    //encontra o utilizador pelo ID
    const user = userList.find((user) => user.id === userID);
    //se o utilizador for encontrado
    if (user) {
        //alternar o estado do utilizador
        user.toggleStates();
        //atualiza a exibição dos utilizadores
        showUsers(userList);
    }
}
/* Remover utilizador */
export function removeUserByID(userID, userList) {
    // Usa filter() para criar um novo array sem o utilizador com o ID especificado
    const updatedUserList = userList.filter((user) => user.id !== userID);
    //retorna a lista atualizada
    return updatedUserList;
}
/* Aplicar cores aos cartões */
function applyCardColors() {
    const cards = usersContainer.querySelectorAll(".card");
    for (const card of cards) {
        // Gerar uma cor aleatória suave
        const randomColor = `rgb(${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 128)})`;
        const title = card.querySelector(".title");
        if (title) {
            title.style.background = randomColor;
        }
        const contentA = card.querySelector(".btnGroup button#toogleBtn");
        if (contentA) {
            contentA.style.background = randomColor;
        }
    }
}
