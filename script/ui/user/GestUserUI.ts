import User from "../../models/user/User.js";
import IUser from "../../models/user/IUser.js";
import { fakeUsersData } from "../../helpers/fakeUsersData.js";
import { addNewUser, showUsers } from "./UserUI.js";
import { openFormModal } from "./UserModalUI.js";

/* Array de utilizadores */
const usersList: IUser[] = [];

/* Função principal para carregar utilizadores iniciais */
export default function loadInitialUsers(): void {
  // Usar um ciclo para converter os dados em instâncias da classe
  for (const userData of fakeUsersData) {
    const user = new User(userData.id, userData.name, userData.email);
    usersList.push(user);
  }
  // Mostrar os utilizadores
  showUsers(usersList as User[]);
}

/* Obter o último ID de utilizador */
function getLastUserId(): number {
  //
  let lastUserID: number = 0;
  //obter o ultimo utilizador no array
  const lastUser = usersList[usersList.length - 1];
  // Check if the last user exists and get the last user's ID
  if (lastUser) {
    lastUserID = lastUser.id;
  }
  return lastUserID;
}

/* Abrir modal de formulário */
const addUserBtn = document.querySelector("#addUserBtn") as HTMLButtonElement;
addUserBtn.addEventListener("click", openFormModal);

/* Adicionar utilizador via formulário */
const formUser = document.querySelector("#formUser") as HTMLFormElement;
formUser.addEventListener("submit", (event: Event) => {
  // Prevent form submissio
  event.preventDefault();

  // Obter valores dos inputs
  const nameInput = document.querySelector("#nameInput") as HTMLInputElement;
  const emailInput = document.querySelector("#emailInput") as HTMLInputElement;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Obter elemento do banner de erro
  const errorBanner = document.querySelector("#errorBanner") as HTMLDivElement;

  // Limpar mensagens de erro anteriores
  errorBanner.textContent = "";
  errorBanner.style.display = "none";

  // Validações
  let isValid = true;
  let errorMessages: string[] = [];
  if (name === "") {
    errorMessages.push("O nome não pode estar vazio.");
    isValid = false;
  }
  if (!email.includes("@")) {
    errorMessages.push("O email deve conter '@'.");
    isValid = false;
  }

  // Se não válido, mostrar banner de erro
  if (!isValid) {
    errorBanner.textContent = errorMessages.join(" ");
    errorBanner.style.display = "block";
    return;
  }

  //obter um novo id a partir do ultimo
  let newId = getLastUserId() + 1;
  //cria um novo user com os dados inseridos no formulario
  const user = addNewUser(newId);
  //adiciona a lista de utilizadores
  usersList.push(user);
  //fecha o modal
  const modalForm = document.querySelector("#modalForm") as HTMLDivElement;
  modalForm.style.display = "none";
  //mostra todos os utilizadores
  showUsers(usersList as User[]);
});

/* Filtrar utilizadores ativos */
const filterActiveBtn = document.querySelector(
  "#activeUsersBtn"
) as HTMLButtonElement;
filterActiveBtn.addEventListener("click", () => {
  const activeUsers = usersList.filter((user) => user.isAtive);
  showUsers(activeUsers as User[]);
});

/* Procurar utilizador por nome */
const searchUser = document.querySelector("#searchUser") as HTMLInputElement;
searchUser.addEventListener("input", () => {
  //obter o nome inserido no input em minusculas
  const name = searchUser.value.toLowerCase();
  //filtrar a lista de utilizadores pelo nome
  const filteredUsers = usersList.filter((user) =>
    user.name.toLowerCase().includes(name)
  );
  //mostrar os utilizadores filtrados
  showUsers(filteredUsers as User[]);
});

/* Ordenar utilizadores por nome */
const sortUsersBtn = document.querySelector(
  "#sortUsersBtn"
) as HTMLButtonElement;
//Crie uma variável de controle de estado
let isAscending = true;
sortUsersBtn.addEventListener("click", () => {
  const sortedUsers = [...usersList];
  //Ordenar com base no estado atual
  if (isAscending) {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
  }
  //Inverta o estado para o próximo clique
  isAscending = !isAscending;
  // Mostrar os utilizadores ordenados
  showUsers(sortedUsers as User[]);
  // Atualize o texto ou ícone do botão
  sortUsersBtn.textContent = isAscending ? "Ordenar A-Z" : "Ordenar Z-A";
});
