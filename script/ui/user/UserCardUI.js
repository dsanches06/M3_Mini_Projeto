import { showInfoBanner } from "../../helpers/infoBanner.js";
import { clearContainer } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import { removeUserByID, toggleUserState } from "../gestUserTask/GestUserUI.js";
import loadUserTaskPage from "../usertask/UserTaskPage.js";
import { showUserDetails } from "./UserDetailsModalUI.js";
import { showUsersCounters } from "./UserPage.js";
import renderUsers from "./UserUI.js";
/* Criar cartão de utilizador */
export function createUserCard(gestUserTask, user) {
    const divUserCard = createSection("section");
    divUserCard.className = "card";
    divUserCard.addEventListener("click", () => showUserDetails(user));
    const divUserCardTitle = userCardTitle(user);
    if (divUserCardTitle instanceof HTMLElement) {
        divUserCardTitle.className = "title";
    }
    divUserCard.appendChild(divUserCardTitle);
    const divUserCardContent = userCardContent(gestUserTask, user);
    divUserCardContent.className = "content";
    divUserCard.appendChild(divUserCardContent);
    const divUserCardBtn = userCardBtn(user);
    divUserCardBtn.className = "btnGroup";
    divUserCard.appendChild(divUserCardBtn);
    return divUserCard;
}
/* */
function userCardTitle(user) {
    //somente o nome sem apelido
    const names = user.name.split(" ") || user.name.split("");
    const cardTitle = createHeadingTitle("h2", `${names[0]}`);
    cardTitle.style.fontSize = "36px";
    const divCardTitle = document.createElement("section");
    divCardTitle.appendChild(cardTitle);
    return divCardTitle;
}
/* Função para criar o conteúdo do cartão de usuário */
function userCardContent(gestUserTask, user) {
    const divCardName = document.createElement("p");
    divCardName.textContent = `${user.name}`;
    const divCardId = document.createElement("p");
    divCardId.style.fontWeight = "bold";
    divCardId.textContent = `${user.id}`;
    const divCardEmail = document.createElement("p");
    divCardEmail.textContent = `${user.email}`;
    const divCardStatus = document.createElement("p");
    divCardStatus.textContent = `${user.isAtive ? "ativo" : "Inativo"}`;
    //Mostra o estado com texto ou cor diferente
    divCardStatus.style.color = user.isAtive ? "green" : "red";
    divCardStatus.style.fontWeight = "bold";
    const divCardTask = document.createElement("p");
    divCardTask.textContent = `${user.tasks.length} tarefas atribuídas`;
    const divCardAddTaskBtn = document.createElement("a");
    divCardAddTaskBtn.id = "addTaskIconBtn";
    divCardAddTaskBtn.role = "button";
    divCardAddTaskBtn.title = "Visualizar tarefas do utilizador";
    divCardAddTaskBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        //
        clearContainer();
        loadUserTaskPage(gestUserTask, user);
    });
    const divCardUserTasks = document.createElement("section");
    divCardUserTasks.className = "userTasks";
    divCardUserTasks.appendChild(divCardTask);
    divCardUserTasks.appendChild(divCardAddTaskBtn);
    const divUserCardContent = document.createElement("section");
    divUserCardContent.appendChild(divCardId);
    divUserCardContent.appendChild(divCardName);
    divUserCardContent.appendChild(divCardEmail);
    divUserCardContent.appendChild(divCardStatus);
    divUserCardContent.appendChild(divCardUserTasks);
    return divUserCardContent;
}
/* Função para criar os botões do cartão de usuário */
function userCardBtn(user) {
    const bntToggle = document.createElement("button");
    bntToggle.textContent = user.isAtive ? "Desativar" : "Ativar ";
    bntToggle.id = "toogleBtn";
    bntToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const gestUsersTask = toggleUserState(user.id);
        renderUsers(gestUsersTask, gestUsersTask.users);
        showUsersCounters(gestUsersTask.users);
    });
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.id = "removeBtn";
    btnRemover.addEventListener("click", (event) => {
        event.stopPropagation();
        if (user.tasks.length > 0) {
            showInfoBanner("Utilizador com tarefas pendentes não pode ser removido.", "error-banner");
        }
        else {
            const updatedUserList = removeUserByID(user.id);
            if (updatedUserList) {
                //atualiza a lista de utilizadores
                renderUsers(updatedUserList, updatedUserList.users);
                showUsersCounters(updatedUserList.users);
            }
        }
    });
    //para agrupar os botoes
    const divUserCardBtn = document.createElement("section");
    divUserCardBtn.appendChild(bntToggle);
    divUserCardBtn.appendChild(btnRemover);
    return divUserCardBtn;
}
