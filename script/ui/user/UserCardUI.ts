import User from "../../models/user/User.js";
import { showUserDetails } from "./UserModalUI.js";
import { toggleUserState, removeUserByID, showUsers } from "./UserUI.js";

/* Container de utilizadores */
const usersContainer = document.querySelector(
  "#usersContainer"
) as HTMLDivElement;

/* Criar cartão de utilizador */
export function createUserCard(user: User, userList: User[]): void {
  const divUserCard = document.createElement("div") as HTMLDivElement;
  divUserCard.className = "card";
  divUserCard.addEventListener("click", () => showUserDetails(user));

  const divUserCardTitle = userCardTitle(user);
  divUserCardTitle.className = "title";
  divUserCard.appendChild(divUserCardTitle);

  const divUserCardContent = userCardContent(user);
  divUserCardContent.className = "content";
  divUserCard.appendChild(divUserCardContent);

  const divUserCardBtn = userCardBtn(user, userList);
  divUserCardBtn.className = "btnGroup";
  divUserCard.appendChild(divUserCardBtn);

  usersContainer.appendChild(divUserCard);
}

/* */
function userCardTitle(user: User): HTMLDivElement {
  const cardTitle = document.createElement("h2") as HTMLHeadingElement;
  cardTitle.textContent = `${user.id}`;

  const divCardTitle = document.createElement("div") as HTMLDivElement;
  divCardTitle.appendChild(cardTitle);

  return divCardTitle;
}

/*  */
function userCardContent(user: User): HTMLDivElement {
  const divCardName = document.createElement("p") as HTMLParagraphElement;
  divCardName.textContent = `${user.name}`;

  const divCardEmail = document.createElement("p") as HTMLParagraphElement;
  divCardEmail.textContent = `${user.email}`;

  const divCardStatus = document.createElement("p") as HTMLParagraphElement;
  divCardStatus.textContent = `${user.isAtive ? "ativo" : "Inativo"}`;

  //Mostra o estado com texto ou cor diferente
  divCardStatus.style.color = user.isAtive ? "green" : "red";

  const divCardTasks = document.createElement("p") as HTMLParagraphElement;
  divCardTasks.className = "tasks";
  divCardTasks.textContent = "0 tarefas atribuídas";

  const divUserCardContent = document.createElement("div") as HTMLDivElement;
  divUserCardContent.appendChild(divCardName);
  divUserCardContent.appendChild(divCardEmail);
  divUserCardContent.appendChild(divCardStatus);
  divUserCardContent.appendChild(divCardTasks);

  return divUserCardContent;
}

function userCardBtn(user: User, userList: User[]): HTMLDivElement {
  const bntToggle = document.createElement("button") as HTMLButtonElement;
  bntToggle.textContent = user.isAtive ? "Desativar" : "Ativar ";
  bntToggle.id = "toogleBtn";
  bntToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleUserState(user.id, userList);
  });

  const btnRemover = document.createElement("button") as HTMLButtonElement;
  btnRemover.textContent = "Remover";
  btnRemover.id = "removeBtn";
  btnRemover.addEventListener("click", (event) => {
    event.stopPropagation();
    const updatedUserList = removeUserByID(user.id, userList);
    if (updatedUserList) {
      //atualiza a lista de utilizadores
      showUsers(updatedUserList);
    }
  });

  //para agrupar os botoes
  const divUserCardBtn = document.createElement("div") as HTMLDivElement;
  divUserCardBtn.appendChild(bntToggle);
  divUserCardBtn.appendChild(btnRemover);

  return divUserCardBtn;
}
