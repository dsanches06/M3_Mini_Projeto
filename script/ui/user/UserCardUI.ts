import { showInfoBanner } from "../../helpers/infoBanner.js";
import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import User from "../../models/user/User.js";
import { clearContainer } from "../dom/ContainerSection.js";
import { createHeadingTitle, createSection } from "../dom/CreatePage.js";
import { removeUserByID, toggleUserState } from "../gestUserTask/GestUserUI.js";
import loadUserTaskPage from "../usertask/UserTaskPage.js";
import { showUserDetails } from "./UserDetailsModalUI.js";
import { showUsersCounters } from "./UserPage.js";
import renderUsers from "./UserUI.js";

/* Criar cartão de utilizador */
export function createUserCard(
  gestUserTask: GestUserTask,
  user: User,
): HTMLElement {
  const divUserCard = createSection("sectionCard") as HTMLElement;
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
function userCardTitle(user: User): HTMLElement {
  //somente o nome sem apelido
  const names = user.name.split(" ") || user.name.split("");
  const cardTitle = createHeadingTitle(
    "h2",
    `${names[0]}`,
  ) as HTMLHeadingElement;

  const divCardTitle = document.createElement("section") as HTMLElement;
  divCardTitle.appendChild(cardTitle);

  return divCardTitle;
}

/* Função para criar o conteúdo do cartão de usuário */
function userCardContent(gestUserTask: GestUserTask, user: User): HTMLElement {
  const divCardName = document.createElement("p") as HTMLParagraphElement;
  divCardName.textContent = `${user.name}`;

  const divCardId = document.createElement("p") as HTMLParagraphElement;
  divCardId.style.fontWeight = "bold";
  divCardId.textContent = `${user.id}`;

  const divCardEmail = document.createElement("p") as HTMLParagraphElement;
  divCardEmail.textContent = `${user.email}`;

  const divCardStatus = document.createElement("p") as HTMLParagraphElement;
  divCardStatus.textContent = `${user.isAtive ? "ativo" : "Inativo"}`;

  //Mostra o estado com texto ou cor diferente
  divCardStatus.style.color = user.isAtive ? "green" : "red";
  divCardStatus.style.fontWeight = "bold";

  const divCardTask = document.createElement("p") as HTMLParagraphElement;
  divCardTask.textContent = `${user.tasks.length} tarefas`;

  const eyeOpenIcon = document.createElement("i") as HTMLElement;
  eyeOpenIcon.className = "fa-solid fa-eye fa-2xl";

  const eyeCloseIcon = document.createElement("i") as HTMLElement;
  eyeCloseIcon.className = "fa-solid fa-eye-slash fa-2xl";

  const eyeIcon = user.tasks.length > 0 ? eyeOpenIcon : eyeCloseIcon;

  const divCardAddTaskBtn = document.createElement("a") as HTMLAnchorElement;
  divCardAddTaskBtn.appendChild(eyeIcon);
  divCardAddTaskBtn.id = "addTaskIconBtn";
  divCardAddTaskBtn.role = "button";
  divCardAddTaskBtn.title = "Visualizar tarefas do utilizador";
  divCardAddTaskBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    clearContainer();
    loadUserTaskPage(gestUserTask, user);
  });

  const divCardUserTasks = document.createElement("section") as HTMLElement;
  divCardUserTasks.className = "userTasks";
  divCardUserTasks.appendChild(divCardTask);
  divCardUserTasks.appendChild(divCardAddTaskBtn);

  const divUserCardContent = document.createElement("section") as HTMLElement;
  divUserCardContent.appendChild(divCardId);
  divUserCardContent.appendChild(divCardName);
  divUserCardContent.appendChild(divCardEmail);
  divUserCardContent.appendChild(divCardStatus);
  divUserCardContent.appendChild(divCardUserTasks);

  return divUserCardContent;
}

/* Função para criar os botões do cartão de usuário */
function userCardBtn(user: User): HTMLElement {
  const toogleIcon = document.createElement("i") as HTMLElement;
  toogleIcon.className = user.isAtive
    ? "fa-solid fa-toggle-on fa-2xl"
    : "fa-solid fa-toggle-off fa-2xl";

  const bntToggle = document.createElement("span") as HTMLElement;
  bntToggle.appendChild(toogleIcon);
  bntToggle.id = "toogleBtn";
  bntToggle.title = "Ativar ou desativar utilizador";
  bntToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const gestUsersTask = toggleUserState(user.id);
    renderUsers(gestUsersTask, gestUsersTask.users as User[]);
    showUsersCounters(gestUsersTask.users as User[]);
  });

  const trashIcon = document.createElement("i") as HTMLElement;
  trashIcon.className = "fa-solid fa-trash fa-2xl";

  const btnRemover = document.createElement("span") as HTMLButtonElement;
  btnRemover.appendChild(trashIcon);
  btnRemover.id = "removeBtn";
  btnRemover.role = "button";
  btnRemover.style.color = "#ff4c4c";
  btnRemover.title = "Remover tarefas do utilizador";
  btnRemover.addEventListener("click", (event) => {
    event.stopPropagation();
    if (user.tasks.length > 0) {
      showInfoBanner(
        "Utilizador com tarefas pendentes não pode ser removido.",
        "error-banner",
      );
    } else {
      const updatedUserList = removeUserByID(user.id);
      if (updatedUserList) {
        //atualiza a lista de utilizadores
        renderUsers(updatedUserList, updatedUserList.users as User[]);
        showUsersCounters(updatedUserList.users as User[]);
      }
    }
  });

  //para agrupar os botoes
  const divUserCardBtn = document.createElement("section") as HTMLElement;
  divUserCardBtn.appendChild(bntToggle);
  divUserCardBtn.appendChild(btnRemover);

  return divUserCardBtn;
}
