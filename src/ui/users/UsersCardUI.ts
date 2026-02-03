import { UserService } from "../../services/index.js";
import { UserClass } from "../../models/index.js";
import { showInfoBanner } from "../../helpers/index.js";
import { renderUsers, showUserDetails, showUsersCounters } from "./index.js";
import {
  createSection,
  createHeadingTitle,
  clearContainer,
} from "../dom/index.js";
import { removeUserByID, toggleUserState } from "../gestUserTask/index.js";
import { loadUserTaskPage } from "../usertask/index.js";

/* Criar cartão de utilizador */
export function createUserCard(user: UserClass): HTMLElement {
  const divUserCard = createSection("sectionCard") as HTMLElement;
  divUserCard.className = "card";
  divUserCard.addEventListener("click", () => showUserDetails(user));

  const divUserCardTitle = userCardTitle(user);
  if (divUserCardTitle instanceof HTMLElement) {
    divUserCardTitle.className = "title";
  }
  divUserCard.appendChild(divUserCardTitle);

  const divUserCardContent = userCardContent(user);
  divUserCardContent.className = "content";
  divUserCard.appendChild(divUserCardContent);

  const divUserCardBtn = userCardBtn(user);
  divUserCardBtn.className = "btnGroup";
  divUserCard.appendChild(divUserCardBtn);

  return divUserCard;
}

/* */
function userCardTitle(user: UserClass): HTMLElement {
  //somente o nome sem apelido
  const names = user.getName().split(" ") || user.getName().split("");
  const cardTitle = createHeadingTitle(
    "h2",
    `${names[0]}`,
  ) as HTMLHeadingElement;

  const divCardTitle = document.createElement("section") as HTMLElement;
  divCardTitle.appendChild(cardTitle);

  return divCardTitle;
}

/* Função para criar o conteúdo do cartão de usuário */
function userCardContent(user: UserClass): HTMLElement {
  const divCardName = document.createElement("p") as HTMLParagraphElement;
  divCardName.textContent = `${user.getName()}`;

  const divCardId = document.createElement("p") as HTMLParagraphElement;
  divCardId.style.fontWeight = "bold";
  divCardId.textContent = `${user.getId()}`;

  const divCardEmail = document.createElement("p") as HTMLParagraphElement;
  divCardEmail.textContent = `${user.getEmail()}`;

  const divCardStatus = document.createElement("p") as HTMLParagraphElement;
  divCardStatus.textContent = `${user.isActive() ? "ativo" : "Inativo"}`;

  //Mostra o estado com texto ou cor diferente
  divCardStatus.style.color = user.isActive() ? "green" : "red";
  divCardStatus.style.fontWeight = "bold";

  const divCardTask = document.createElement("p") as HTMLParagraphElement;
  divCardTask.textContent = `${user.getTasks().length} tarefas`;

  const eyeOpenIcon = document.createElement("i") as HTMLElement;
  eyeOpenIcon.className = "fa-solid fa-eye fa-lg";

  const eyeCloseIcon = document.createElement("i") as HTMLElement;
  eyeCloseIcon.className = "fa-solid fa-eye-slash fa-lg";

  const eyeIcon = user.getTasks().length > 0 ? eyeOpenIcon : eyeCloseIcon;

  const divCardAddTaskBtn = document.createElement("a") as HTMLAnchorElement;
  divCardAddTaskBtn.appendChild(eyeIcon);
  divCardAddTaskBtn.id = "addTaskIconBtn";
  divCardAddTaskBtn.role = "button";
  divCardAddTaskBtn.title = "Visualizar tarefas do utilizador";
  divCardAddTaskBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    clearContainer();
    loadUserTaskPage(user);
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
function userCardBtn(user: UserClass): HTMLElement {
  const toogleIcon = document.createElement("i") as HTMLElement;
  toogleIcon.className = user.isActive()
    ? "fa-solid fa-toggle-on fa-2xl"
    : "fa-solid fa-toggle-off fa-2xl";

  const bntToggle = document.createElement("span") as HTMLElement;
  bntToggle.appendChild(toogleIcon);
  bntToggle.id = "toogleBtn";
  bntToggle.title = "Ativar ou desativar utilizador";
  bntToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleUserState(user.getId());
    renderUsers(UserService.getAllUsers() as UserClass[]);
    showUsersCounters(UserService.getAllUsers() as UserClass[], "utilizadores");
  });

  const trashIcon = document.createElement("i") as HTMLElement;
  trashIcon.className = "fa-solid fa-trash fa-lg";

  const btnRemover = document.createElement("span") as HTMLButtonElement;
  btnRemover.appendChild(trashIcon);
  btnRemover.id = "removeBtn";
  btnRemover.role = "button";
  btnRemover.style.color = "#ff4c4c";
  btnRemover.title = "Remover tarefas do utilizador";
  btnRemover.addEventListener("click", (event) => {
    event.stopPropagation();
    if (user.getTasks().length > 0) {
      showInfoBanner(
        "Utilizador com tarefas pendentes não pode ser removido.",
        "error-banner",
      );
    } else {
      const remove = removeUserByID(user.getId());
      if (remove) {
        //atualiza a lista de utilizadores
        renderUsers(UserService.getAllUsers() as UserClass[]);
        showUsersCounters(
          UserService.getAllUsers() as UserClass[],
          "utilizadores",
        );
      } else {
        showInfoBanner("O utilizador não foi removido", "error-banner");
      }
    }
  });

  //para agrupar os botoes
  const divUserCardBtn = document.createElement("section") as HTMLElement;
  divUserCardBtn.appendChild(bntToggle);
  divUserCardBtn.appendChild(btnRemover);

  return divUserCardBtn;
}
