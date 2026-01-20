import { Category } from "./../../models/task/Category";
import IUser from "../../models/user/IUser.js";
import User from "../../models/user/User.js";
import GestUserTask from "../../models/gestUserTask/gestUserTask.js";
import Task from "../../models/task/Task.js";
import { clearContainer } from "../dom/ContainerSection.js";
import { fakeTasksData, fakeUsersData } from "../../helpers/fakeData.js";
import loadUsersPage from "../user/UserPage.js";
import { renderUserModal } from "../user/UserModalForm.js";

/* Instância da classe GestUserTask  */
let gestUserTask: GestUserTask;

/* Função principal para carregar utilizadores iniciais */
export default function loadInitialUsers(gestUsersTasks: GestUserTask): void {
  //atribuir a instância recebida ao escopo global
  gestUserTask = gestUsersTasks;
  // Usar um ciclo para converter os dados em instâncias da classe
  for (const userData of fakeUsersData) {
    const user = new User(userData.id, userData.name, userData.email);
    for (const taskData of fakeTasksData) {
      const task = new Task(
        taskData.id,
        taskData.title,
        taskData.category as Category,
        user,
      );
      if (taskData.completed) {
        task.markCompleted();
      }
      user.createTask(task);
    }
    gestUserTask.addUser(user);
  }
  //Limpa o container antes de mostrar os utilizadores
  clearContainer();
  // carrega a pagina dinamica de utilizadores
  loadUsersPage(gestUserTask);
}

/* Remover utilizador */
export function removeUserByID(userID: number): GestUserTask {
  const index = gestUserTask.users.findIndex((user) => user.id === userID);
  if (index !== -1) {
    //remover o utilizador da lista
    gestUserTask.users.splice(index, 1);
  }
  //retorna o gestor com lista atualizada
  return gestUserTask;
}

/* Alternar estado (ativo / inativo) */
export function toggleUserState(userID: number): GestUserTask {
  //encontra o utilizador pelo ID
  const user = gestUserTask.users.find((user) => user.id === userID);
  //se o utilizador for encontrado
  if (user) {
    //alternar o estado do utilizador
    (user as User).toggleStates();
  }
  return gestUserTask;
}

/* Abrir modal de adicionar utilizador */
export function openUserModal(): void {
  renderUserModal(gestUserTask);
}

/* Obter todos os utilizadores */
export function allUsers(): IUser[] {
  return gestUserTask.users;
}

/* Obter todos os utilizadores ativos */
export function allUsersAtive(): IUser[] {
  return gestUserTask.users.filter((user) => user.isAtive);
}

/* Obter todos os utilizadores inativos */
export function allUsersUnable(): IUser[] {
  return gestUserTask.users.filter((user) => !user.isAtive);
}

/* Procurar utilizador por nome */
export function searchUserByName(name: string): IUser[] {
  const lowerCaseName = name.toLowerCase();
  return gestUserTask.users.filter((user) =>
    user.name.toLowerCase().includes(lowerCaseName),
  );
}
/* Ordenar utilizadores por nome */
export function sortUsersByName(ascending: boolean = true): IUser[] {
  const sortedUsers = [...gestUserTask.users];
  if (ascending) {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
  }
  return sortedUsers;
}
