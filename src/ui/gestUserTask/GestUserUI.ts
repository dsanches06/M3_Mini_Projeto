import { IUser, UserClass } from "../../models/index.js";
import { UserService } from "../../services/index.js";
import { clearContainer } from "../dom/index.js";
import { fakeUsersData } from "../../helpers/index.js";
import { loadUsersPage, renderUserModal } from "../user/index.js";

/* Instância da classe userService  */
let serviceUsers: UserService;

/* Função principal para carregar utilizadores iniciais */
export function loadInitialUsers(userService: UserService): void {
  //atribuir a instância recebida ao escopo global
  serviceUsers = userService;
  // Usar um ciclo para converter os dados em instâncias da classe
  for (const userData of fakeUsersData) {
    const user = new UserClass(userData.id, userData.name, userData.email);
    serviceUsers.addUser(user);
  }
  //Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadUsersPage(serviceUsers);
}

/* Remover utilizador */
export function removeUserByID(id: number) {
  let remove = serviceUsers.removeUser(id);
  //retorna o gestor com lista atualizada
  return { serviceUsers, remove };
}

/* Alternar estado (ativo / inativo) */
export function toggleUserState(id: number): UserService {
  //encontra o utilizador pelo ID
  const user = serviceUsers.getUserById(id);
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
  return serviceUsers.getActiveUsers();
}

/* Obter todos os utilizadores inativos */
export function allInactiveUsers(): IUser[] {
  return serviceUsers.getInactiveUsers();
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
