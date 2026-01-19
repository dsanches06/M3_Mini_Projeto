import User from "../../models/user/User.js";
import { countAtiveUsers, countUnableUsers, countUsers, countAtivePercentage, } from "./UserCountersUI.js";
import { createSection } from "../dom/CreatePage.js";
/* Container de utilizadores */
/* Função de renderização */
export default function renderUsers(usersList) {
    const usersContainer = createSection("usersContainer");
    //Limpa o contentor HTML.
    usersContainer.innerHTML = "";
    usersList.forEach((user) => 
    //Para cada utilizador, cria um cartão HTML.
    //createUserCard(user, usersList),
    console.log(user));
    // Aplicar cores aos cartões
    //applyCardColors();
    return usersContainer;
}
/* */
export function showUsersCount(usersList) {
    //
    const allUsers = document.querySelector("#allUsers");
    allUsers.appendChild(countUsers(usersList));
    //
    const ativeUsers = document.querySelector("#ativeUsers");
    ativeUsers.appendChild(countAtiveUsers(usersList));
    //
    const unableUsers = document.querySelector("#unableUsers");
    unableUsers.appendChild(countUnableUsers(usersList));
    //
    const ativeUsersPercentageCount = document.querySelector("#ativeUsersPercentageCount");
    ativeUsersPercentageCount.appendChild(countAtivePercentage(usersList));
    return ativeUsersPercentageCount;
    const usersCounters = document.querySelector("#userCounters");
    usersCounters.append(allUsers, ativeUsers, unableUsers, ativeUsersPercentageCount);
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
        renderUsers(userList);
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
    /* const cards = usersContainer.querySelectorAll(".card");
     for (const card of cards) {
       // Gerar uma cor aleatória suave
       const randomColor = `rgb(${Math.floor(Math.random() * 128)}, ${Math.floor(
         Math.random() * 128,
       )}, ${Math.floor(Math.random() * 128)})`;
       const title = card.querySelector(".title") as HTMLElement;
       if (title) {
         title.style.background = randomColor;
       }
       const contentA = card.querySelector(
         ".btnGroup button#toogleBtn",
       ) as HTMLElement;
       if (contentA) {
         contentA.style.background = randomColor;
       }
     }*/
}
