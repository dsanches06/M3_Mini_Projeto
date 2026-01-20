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
  const divUserCard = createSection("section") as HTMLElement;
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
  cardTitle.style.fontSize = "36px";

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
  divCardTask.textContent = `${user.tasks.length} tarefas atribuídas`;

  const divCardAddTaskBtn = document.createElement("a") as HTMLAnchorElement;
  divCardAddTaskBtn.id = "addTaskIconBtn";
  divCardAddTaskBtn.role = "button";
  divCardAddTaskBtn.title = "Visualizar tarefas do utilizador";
  divCardAddTaskBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    //
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
  const bntToggle = document.createElement("button") as HTMLButtonElement;
  bntToggle.textContent = user.isAtive ? "Desativar" : "Ativar ";
  bntToggle.id = "toogleBtn";
  bntToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const gestUsersTask = toggleUserState(user.id);
    renderUsers(gestUsersTask, gestUsersTask.users as User[]);
    showUsersCounters(gestUsersTask.users as User[]);
  });

  const btnRemover = document.createElement("button") as HTMLButtonElement;
  btnRemover.textContent = "Remover";
  btnRemover.id = "removeBtn";
  btnRemover.addEventListener("click", (event) => {
    event.stopPropagation();
    const updatedUserList = removeUserByID(user.id);
    if (updatedUserList) {
      //atualiza a lista de utilizadores
      renderUsers(updatedUserList, updatedUserList.users as User[]);
      showUsersCounters(updatedUserList.users as User[]);
    }
  });

  //para agrupar os botoes
  const divUserCardBtn = document.createElement("section") as HTMLElement;
  divUserCardBtn.appendChild(bntToggle);
  divUserCardBtn.appendChild(btnRemover);

  return divUserCardBtn;
}
