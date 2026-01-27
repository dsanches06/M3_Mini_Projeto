import { createSection, createHeadingTitle } from "../dom/CreatePage.js";
import { showUserDetails } from "./UserDetailsModalUI.js";
import { clearContainer } from "../dom/ContainerSection.js";
import { showInfoBanner } from "../../helpers/infoBanner.js";
import { removeUserByID, toggleUserState } from "../gestUserTask/GestUserUI.js";
import loadUserTaskPage from "ui/usertask/UserTaskPage.js";
import renderUsers from "./UserUI.js";
import { showUsersCounters } from "./UserPage.js";
/* Criar cartão de utilizador */
export function createUserCard(serviceUsers, user) {
    const divUserCard = createSection("sectionCard");
    divUserCard.className = "card";
    divUserCard.addEventListener("click", () => showUserDetails(user));
    const divUserCardTitle = userCardTitle(user);
    if (divUserCardTitle instanceof HTMLElement) {
        divUserCardTitle.className = "title";
    }
    divUserCard.appendChild(divUserCardTitle);
    const divUserCardContent = userCardContent(serviceUsers, user);
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
    const names = user.getName().split(" ") || user.getName().split("");
    const cardTitle = createHeadingTitle("h2", `${names[0]}`);
    const divCardTitle = document.createElement("section");
    divCardTitle.appendChild(cardTitle);
    return divCardTitle;
}
/* Função para criar o conteúdo do cartão de usuário */
function userCardContent(serviceUsers, user) {
    const divCardName = document.createElement("p");
    divCardName.textContent = `${user.getName()}`;
    const divCardId = document.createElement("p");
    divCardId.style.fontWeight = "bold";
    divCardId.textContent = `${user.getId()}`;
    const divCardEmail = document.createElement("p");
    divCardEmail.textContent = `${user.getEmail()}`;
    const divCardStatus = document.createElement("p");
    divCardStatus.textContent = `${user.isActive() ? "ativo" : "Inativo"}`;
    //Mostra o estado com texto ou cor diferente
    divCardStatus.style.color = user.isActive() ? "green" : "red";
    divCardStatus.style.fontWeight = "bold";
    const divCardTask = document.createElement("p");
    divCardTask.textContent = `${user.getTasks().length} tarefas`;
    const eyeOpenIcon = document.createElement("i");
    eyeOpenIcon.className = "fa-solid fa-eye fa-2xl";
    const eyeCloseIcon = document.createElement("i");
    eyeCloseIcon.className = "fa-solid fa-eye-slash fa-2xl";
    const eyeIcon = user.getTasks().length > 0 ? eyeOpenIcon : eyeCloseIcon;
    const divCardAddTaskBtn = document.createElement("a");
    divCardAddTaskBtn.appendChild(eyeIcon);
    divCardAddTaskBtn.id = "addTaskIconBtn";
    divCardAddTaskBtn.role = "button";
    divCardAddTaskBtn.title = "Visualizar tarefas do utilizador";
    divCardAddTaskBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        clearContainer();
        loadUserTaskPage(serviceUsers, user);
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
    const toogleIcon = document.createElement("i");
    toogleIcon.className = user.isActive()
        ? "fa-solid fa-toggle-on fa-2xl"
        : "fa-solid fa-toggle-off fa-2xl";
    const bntToggle = document.createElement("span");
    bntToggle.appendChild(toogleIcon);
    bntToggle.id = "toogleBtn";
    bntToggle.title = "Ativar ou desativar utilizador";
    bntToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const servicesUser = toggleUserState(user.getId());
        renderUsers(servicesUser, servicesUser.getAllUsers());
        showUsersCounters(servicesUser.getAllUsers());
    });
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash fa-2xl";
    const btnRemover = document.createElement("span");
    btnRemover.appendChild(trashIcon);
    btnRemover.id = "removeBtn";
    btnRemover.role = "button";
    btnRemover.style.color = "#ff4c4c";
    btnRemover.title = "Remover tarefas do utilizador";
    btnRemover.addEventListener("click", (event) => {
        event.stopPropagation();
        if (user.getTasks().length > 0) {
            showInfoBanner("Utilizador com tarefas pendentes não pode ser removido.", "error-banner");
        }
        else {
            const updatedUserList = removeUserByID(user.getId());
            if (updatedUserList) {
                //atualiza a lista de utilizadores
                renderUsers(updatedUserList, updatedUserList.getAllUsers());
                showUsersCounters(updatedUserList.getAllUsers());
            }
        }
    });
    //para agrupar os botoes
    const divUserCardBtn = document.createElement("section");
    divUserCardBtn.appendChild(bntToggle);
    divUserCardBtn.appendChild(btnRemover);
    return divUserCardBtn;
}
