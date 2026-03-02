import { UserService } from "../../services/index.js";
import { UserClass } from "../../models/index.js";
import { showInfoBanner } from "../../helpers/index.js";
import { renderUsers, showUserDetails, showUsersCounters } from "./index.js";
import { createSection, createHeadingTitle } from "../dom/index.js";
import { removeUserByID, toggleUserState } from "../gestUserTask/index.js";
import { loadTasksPage } from "../tasks/index.js";

/* Criar cartão de utilizador */
export function createUserCard(user: UserClass): HTMLElement {
  const divUserCard = createSection("sectionUserCard") as HTMLElement;
  divUserCard.className = "cardContainer";

  const card = document.createElement("div") as HTMLElement;
  card.className = "card";
  card.addEventListener("click", () => showUserDetails(user));
  divUserCard.appendChild(card);

  // Face 1 (front)
  const face1 = document.createElement("div") as HTMLElement;
  face1.className = "face face1";

  const content1 = document.createElement("div") as HTMLElement;
  content1.className = "content";

  const h3 = document.createElement("h3") as HTMLElement;
  h3.textContent = user.getName().split(" ")[0];

  content1.appendChild(h3);
  face1.appendChild(content1);
  card.appendChild(face1);

  // Face 2 (back)
  const face2 = document.createElement("div");
  face2.className = "face face2";

  const content2 = document.createElement("div");
  content2.className = "content";

  // Number
  const number = document.createElement("span");
  number.className = "number";
  number.textContent = "1";

  // Name
  const name = document.createElement("span");
  name.className = "name";
  name.textContent = user.getName();

  // Email
  const email = document.createElement("span");
  email.className = "email";
  email.textContent = user.getEmail();

  // Status
  const status = document.createElement("span") as HTMLElement;
  status.textContent = `${user.isActive() ? "ativo" : "Inativo"}`;

  //Mostra o estado com texto ou cor diferente
  status.style.color = user.isActive() ? "green" : "red";
  status.style.fontWeight = "bold";

  // Actions
  const viewTask = document.createElement("div");
  viewTask.className = "view-task";
  viewTask.title = "Ver tarefas";

  // Tasks
  const tasks = document.createElement("span");
  tasks.className = "tasks";
  tasks.textContent = `${user.getTasks().length} tarefas`;

  // View button
  const eyeOpenIcon = document.createElement("i") as HTMLElement;
  eyeOpenIcon.className = "fa-solid fa-eye fa-lg";

  const eyeCloseIcon = document.createElement("i") as HTMLElement;
  eyeCloseIcon.className = "fa-solid fa-eye-slash fa-lg";

  const eyeIcon = user.getTasks().length > 0 ? eyeOpenIcon : eyeCloseIcon;
  eyeIcon.style.cursor = "pointer";
  eyeIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    loadTasksPage(user);
  });

  viewTask.append(tasks, eyeIcon);

  // Actions
  const cardBtn = userCardBtn(user);
  cardBtn.className = "btnGroup";

  // Append all to content2
  content2.appendChild(number);
  content2.appendChild(name);
  content2.appendChild(email);
  content2.appendChild(status);
  content2.appendChild(viewTask);
  content2.appendChild(cardBtn);

  face2.appendChild(content2);
  card.appendChild(face2);

  /*const divUserCardTitle = userCardTitle(user);
  if (divUserCardTitle instanceof HTMLElement) {
    divUserCardTitle.className = "title";
  }
  divUserCard.appendChild(divUserCardTitle);

  const divUserCardContent = userCardContent(user);
  divUserCardContent.className = "content";
  divUserCard.appendChild(divUserCardContent);

  const divUserCardBtn = userCardBtn(user);
  divUserCardBtn.className = "btnGroup";
  divUserCard.appendChild(divUserCardBtn);*/

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
    loadTasksPage(user);
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
