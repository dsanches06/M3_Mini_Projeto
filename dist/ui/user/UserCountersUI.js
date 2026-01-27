import { allUsers } from "../gestUserTask/GestUserUI.js";
/* Contador de utilizadores ativos */
export function countAtiveUsers(id, usersList) {
    const section = document.querySelector(`${id}`);
    if (section) {
        let arrayAtiveUsers = usersList.filter((user) => user.isActive());
        section.textContent = `${arrayAtiveUsers.length}`;
    }
    else {
        console.warn(`Elemento ${id} não foi encontrado no DOM.`);
    }
}
/* Contador de utilizadores inativos */
export function countUnableUsers(id, usersList) {
    const section = document.querySelector(`${id}`);
    if (section) {
        let arrayUnableUsers = usersList.filter((user) => !user.isActive());
        section.textContent = `${arrayUnableUsers.length}`;
    }
    else {
        console.warn(`Elemento ${id} não foi encontrado no DOM.`);
    }
}
/* Contador de utilizadores */
export function countAllUsers(id, usersList) {
    const section = document.querySelector(`${id}`);
    if (section) {
        section.textContent = `${usersList.length}`;
    }
    else {
        console.warn(`Elemento ${id} não foi encontrado no DOM.`);
    }
}
/* Percentagem de utilizadores ativos */
export function countAtiveInativePercentage(id, usersList, type) {
    const section = document.querySelector(`${id}`);
    if (section) {
        const activeInativeUsers = usersList.length;
        const totalUsers = allUsers().length;
        const percentage = totalUsers > 0 ? ((activeInativeUsers / totalUsers) * 100).toFixed(2) : 0;
        section.textContent = `${percentage}%`;
        const ativosPercentangeCaption = document.querySelector("#ativosPercentangeCaption");
        if (ativosPercentangeCaption) {
            if (type === "inativos") {
                ativosPercentangeCaption.textContent = "inativos %";
            }
            else if (type === "utilizadores") {
                ativosPercentangeCaption.textContent = "ativos %";
            }
            else {
                ativosPercentangeCaption.textContent = "ativos %";
            }
        }
        else {
            console.warn(`Elemento ativosCaption não foi encontrado no DOM.`);
        }
    }
    else {
        console.warn(`Elemento ${id} não foi encontrado no DOM.`);
    }
}
