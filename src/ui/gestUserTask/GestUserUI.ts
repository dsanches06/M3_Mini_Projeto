import { fakeUsersData } from "../../helpers/fakeData.js";
import UserService from "../../services/userService.js";
import UserClass from "../../models/UserClass.js";
import IUser from "../../models/IUser.js";
import { clearContainer } from "../../ui/dom/ContainerSection.js";

/* Instância da classe userService  */
let serviceUsers: UserService;

/* Função principal para carregar utilizadores iniciais */
export default function loadInitialUsers(userService: UserService): void {
  //atribuir a instância recebida ao escopo global
  serviceUsers = userService;
  // Usar um ciclo para converter os dados em instâncias da classe
  for (const userData of fakeUsersData) {
    const user = new UserClass(userData.id, userData.name, userData.email);
    userService.addUser(user);
  }
  //Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadUsersPage(serviceUsers);
}

/* Remover utilizador */
export function removeUserByID(userID: number): UserService {
  const index = serviceUsers
    .getAllUsers()
    .findIndex((user) => user.getId() === userID);
  if (index !== -1) {
    //remover o utilizador da lista
    serviceUsers.getAllUsers().splice(index, 1);
  }
  //retorna o gestor com lista atualizada
  return serviceUsers;
}

/* Alternar estado (ativo / inativo) */
export function toggleUserState(userID: number): UserService {
  //encontra o utilizador pelo ID
  const user = serviceUsers
    .getAllUsers()
    .find((user) => user.getId() === userID);
  //se o utilizador for encontrado
  if (user) {
    //alternar o estado do utilizador
    user.toggleActive();
  }
  return serviceUsers;
}

/* Abrir modal de adicionar utilizador */
export function openUserModal(): void {
  renderUserModal(serviceUsers);
}

/* Obter todos os utilizadores */
export function allUsers(): IUser[] {
  return serviceUsers.getAllUsers();
}

/* Obter todos os utilizadores ativos */
export function allUsersAtive(): IUser[] {
  return serviceUsers.getAllUsers().filter((user) => user.isActive());
}

/* Obter todos os utilizadores inativos */
export function allUsersUnable(): IUser[] {
  return serviceUsers.getAllUsers().filter((user) => !user.isActive());
}

/* Procurar utilizador por nome */
export function searchUserByName(name: string): IUser[] {
  const lowerCaseName = name.toLowerCase();
  return serviceUsers
    .getAllUsers()
    .filter((user) => user.getName().toLowerCase().includes(lowerCaseName));
}
/* Ordenar utilizadores por nome */
export function sortUsersByName(ascending: boolean = true): IUser[] {
  const sortedUsers = [...serviceUsers.getAllUsers()];
  if (ascending) {
    sortedUsers.sort((a, b) => a.getName().localeCompare(b.getName()));
  } else {
    sortedUsers.sort((a, b) => b.getName().localeCompare(a.getName()));
  }
  return sortedUsers;
}
