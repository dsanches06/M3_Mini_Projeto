import { IUser, UserClass } from "../../models/index.js";
import { UserService } from "../../services/index.js";
import { clearContainer } from "../dom/index.js";
import { fakeUsersData } from "../../helpers/index.js";
import { loadUsersPage, renderUserModal } from "../user/index.js";
import { IdGenerator } from "../../utils/index.js";

/* Função principal para carregar utilizadores iniciais */
export function loadInitialUsers(): void {
  // Usar um ciclo para converter os dados em instâncias da classe
  for (const userData of fakeUsersData) {
    const id = IdGenerator.generate();
    const user = new UserClass(id, userData.name, userData.email);
    UserService.addUser(user);
  }
  //Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadUsersPage();
}

/* Remover utilizador */
export function removeUserByID(id: number) {
  return UserService.removeUser(id);
}

/* Alternar estado (ativo / inativo) */
export function toggleUserState(id: number): void {
  //encontra o utilizador pelo ID
  const user = UserService.getUserById(id);
  //se o utilizador for encontrado
  if (user) {
    //alternar o estado do utilizador
    user.toggleActive();
  }
}

/* Abrir modal de adicionar utilizador */
export function openUserModal(): void {
  renderUserModal();
}

/* Procurar utilizador por nome */
export function searchUserByName(name: string): IUser[] {
  const lowerCaseName = name.toLowerCase();
  return UserService.getAllUsers().filter((user) =>
    user.getName().toLowerCase().includes(lowerCaseName),
  );
}

/* Ordenar utilizadores por nome */
export function sortUsersByName(ascending: boolean = true): IUser[] {
  const sortedUsers = [...UserService.getAllUsers()];
  if (ascending) {
    sortedUsers.sort((a, b) => a.getName().localeCompare(b.getName()));
  } else {
    sortedUsers.sort((a, b) => b.getName().localeCompare(a.getName()));
  }
  return sortedUsers;
}
