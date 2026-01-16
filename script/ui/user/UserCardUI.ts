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
  //somente o nome sem apelido
  const names = user.name.split(" ");
  const cardTitle = document.createElement("h2") as HTMLHeadingElement;
  cardTitle.textContent = `${names[0]}`;
  cardTitle.style.fontSize = "36px";

  const divCardTitle = document.createElement("div") as HTMLDivElement;
  divCardTitle.appendChild(cardTitle);

  return divCardTitle;
}

/* Função para criar o conteúdo do cartão de usuário */
function userCardContent(user: User): HTMLDivElement {
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
  //passar o utilizador como parâmetro na navegação em JSON
  const userJson: string = JSON.stringify(user);
  divCardAddTaskBtn.href = `../../../user.task.html?user=${userJson}`;
  divCardAddTaskBtn.role = "button";
  divCardAddTaskBtn.title = "Adicionar Tarefa";
  divCardAddTaskBtn.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const divCardUserTasks = document.createElement("div") as HTMLDivElement;
  divCardUserTasks.className = "userTasks";
  divCardUserTasks.appendChild(divCardTask);
  divCardUserTasks.appendChild(divCardAddTaskBtn);

  const divUserCardContent = document.createElement("div") as HTMLDivElement;
  divUserCardContent.appendChild(divCardId);
  divUserCardContent.appendChild(divCardName);
  divUserCardContent.appendChild(divCardEmail);
  divUserCardContent.appendChild(divCardStatus);
  divUserCardContent.appendChild(divCardUserTasks);

  return divUserCardContent;
}

/* Função para criar os botões do cartão de usuário */
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
