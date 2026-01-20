import { addElementInContainer, } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import { menuSelected } from "../dom/MenuSelected.js";
import { createSearchContainer, createStatisticsCounter, } from "../dom/SectionCounter.js";
import { countAtivePercentage, countAtiveUsers, countUnableUsers, countAllUsers, } from "./UserCountersUI.js";
import renderUsers from "./UserUI.js";
import { allUsers, sortUsersByName, allUsersAtive, allUsersUnable, searchUserByName, } from "../gestUserTask/GestUserUI.js";
let tasksFiltered;
/* Lista de utilizadores */
export default function loadUsersPage(gestUserTask) {
    /* ativa o menu Users */
    menuSelected("#menuUsers");
    //
    addElementInContainer(createHeadingTitle("h2", "GESTÃO DE UTILIZADORES"));
    //
    const userCounterSection = createUserCounter("userCounters");
    addElementInContainer(userCounterSection);
    //
    showUsersCounters(gestUserTask.users);
    //
    const searchContainer = showSearchContainer();
    addElementInContainer(searchContainer);
    //
    const usersContainer = renderUsers(gestUserTask, gestUserTask.users);
    addElementInContainer(usersContainer);
    // Adicionar event listeners aos botões de contador para filtrar
    const allUsersBtn = userCounterSection.querySelector("#allUsersBtn");
    allUsersBtn.title = "Mostrar todos os utilizadores";
    const ativeUsersBtn = userCounterSection.querySelector("#ativeUsersBtn");
    ativeUsersBtn.title = "Mostrar todosos utilizadores ativos";
    const unableUsersBtn = userCounterSection.querySelector("#unableUsersBtn");
    unableUsersBtn.title = "Mostrar todos os utilizadores inativos";
    allUsersBtn.addEventListener("click", () => {
        const users = allUsers();
        renderUsers(gestUserTask, users);
        showUsersCounters(users);
    });
    ativeUsersBtn.addEventListener("click", () => {
        const usersAtive = allUsersAtive();
        renderUsers(gestUserTask, usersAtive);
        showUsersCounters(usersAtive);
    });
    unableUsersBtn.addEventListener("click", () => {
        const usersUnable = allUsersUnable();
        renderUsers(gestUserTask, usersUnable);
        showUsersCounters(usersUnable);
    });
    // Adicionar event listeners aos botões de busca
    const addUserBtn = document.querySelector("#addUserBtn");
    addUserBtn.addEventListener("click", () => {
        // Lógica para adicionar usuário (ex.: abrir modal ou navegar)
        alert("Funcionalidade para adicionar usuário - implementar modal ou navegação.");
    });
    const sortUsersBtn = document.querySelector("#sortUsersBtn");
    if (sortUsersBtn) {
        //Crie uma variável de controle de estado
        let isAscending = true;
        sortUsersBtn.addEventListener("click", () => {
            const sortedUsers = sortUsersByName(isAscending);
            //Inverta o estado para o próximo clique
            isAscending = !isAscending;
            // Mostrar os utilizadores ordenados
            renderUsers(gestUserTask, sortedUsers);
            showUsersCounters(sortedUsers);
            // Atualize o texto ou ícone do botão
            sortUsersBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
        });
    }
    else {
        console.warn("Elemento #sortUsersBtn não foi renderizado no DOM.");
    }
    // ...existing code...
    const searchUser = document.querySelector("#searchUser");
    if (searchUser) {
        searchUser.addEventListener("input", () => {
            const name = searchUser.value.toLowerCase();
            const filteredUsers = searchUserByName(name);
            renderUsers(gestUserTask, filteredUsers);
            showUsersCounters(filteredUsers);
        });
    }
    else {
        console.error("Elemento de busca de utilizadores não encontrado.");
    }
}
/* */
function createUserCounter(id) {
    //
    const allUsersBtn = createStatisticsCounter("allUserSection", "allUsersBtn", "../../../images/users.png", "utilizadores", "allUsersCounter");
    //
    const ativeUsersBtn = createStatisticsCounter("ativeUsers", "ativeUsersBtn", "../../../images/ative.png", "ativos", "ativeUsersCounter");
    //
    const unableUsersBtn = createStatisticsCounter("unableUsers", "unableUsersBtn", "../../../images/unable.png", "Inativos", "unableUsersCounter");
    //
    const ativeUsersPercentageBtn = createStatisticsCounter("ativeUserPercentage", "ativeUsersPercentageBtn", "../../../images/ative.png", "ativos (%)", "ativeUsersPercentageCounter");
    //
    const sectionUsersCounter = createSection(`${id}`);
    sectionUsersCounter.classList.add("users-counters");
    sectionUsersCounter.append(allUsersBtn, ativeUsersBtn, unableUsersBtn, ativeUsersPercentageBtn);
    return sectionUsersCounter;
}
export function showUsersCounters(userList) {
    countAllUsers("#allUsersCounter", userList);
    countAtiveUsers("#ativeUsersCounter", userList);
    countUnableUsers("#unableUsersCounter", userList);
    countAtivePercentage("#ativeUsersPercentageCounter", userList);
}
/* */
function showSearchContainer() {
    const searchUserContainer = createSearchContainer("searchUserContainer", { id: "searchUser", placeholder: "Procurar utilizador..." }, [
        { id: "addUserBtn", text: "Adicionar utilizador" },
        { id: "sortUsersBtn", text: "Ordenar A-Z" },
    ]);
    searchUserContainer.classList.add("search-add-container");
    return searchUserContainer;
}
