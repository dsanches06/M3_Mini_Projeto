import { createUserCard } from "./UserCardUI.js";
import { createSection } from "../dom/CreatePage.js";
import { searchUserByName } from "../gestUserTask/GestUserUI.js";
import { renderUserModal } from "./UserModalForm.js";
/* Container de utilizadores */
const usersContainer = createSection("usersContainer");
/* Função de renderização */
export default function renderUsers(gestUserTask, users) {
    usersContainer.innerHTML = "";
    users.forEach((user) => 
    //Para cada utilizador, cria um cartão HTML.
    usersContainer.appendChild(createUserCard(gestUserTask, user)));
    // Aplicar cores aos cartões
    applyCardColors(usersContainer);
    return usersContainer;
}
/* Aplicar cores aos cartões */
function applyCardColors(usersContainer) {
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
/* Funções auxiliares para contadores (implementadas como stubs, pois não estavam definidas) */
function countAllTasks(selector, taskList) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = taskList.length.toString();
    }
}
function countCompletedUserTasks(selector, taskList) {
    const completed = taskList.filter((task) => task.completed).length;
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = completed.toString();
    }
}
function countPendingUserTasks(selector, taskList) {
    const pending = taskList.filter((task) => !task.completed).length;
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = pending.toString();
    }
}
function showUsersCounters(usersList) {
    // Implementação básica, assumindo que você precisa contar usuários; ajuste conforme necessário
    const allUsersElement = document.querySelector("#allUsersCounter");
    if (allUsersElement) {
        allUsersElement.textContent = usersList.length.toString();
    }
}
export function showTasksCounters(taskList) {
    countAllTasks("#allTasksCounter", taskList);
    countCompletedUserTasks("#completedTaskCounter", taskList);
    countPendingUserTasks("#pendingTasksCounter", taskList);
}
export function loadUsersPage(gestUserTask) {
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
    const addTaskUserBtn = document.querySelector("#addTaskUserBtn");
    if (addTaskUserBtn) {
        addTaskUserBtn.addEventListener("click", () => {
            const modal = document.querySelector("#modalUserTaskForm");
            if (modal) {
                modal.style.display = "block";
            }
        });
    }
    else {
        console.warn("Elemento #addTaskUserBtn não foi renderizado no DOM.");
    }
    const addUserBtn = document.querySelector("#addUserBtn");
    if (addUserBtn) {
        addUserBtn.addEventListener("click", () => {
            renderUserModal(gestUserTask);
        });
    }
    else {
        console.warn("Elemento #addUserBtn não foi renderizado no DOM.");
    }
}
