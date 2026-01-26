import IUser from "../../models/user/IUser.js";
import { allUsers } from "../gestUserTask/GestUserUI.js";

/* Contador de utilizadores ativos */
export function countAtiveUsers(id: string, usersList: IUser[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    let arrayAtiveUsers = usersList.filter((user) => user.isAtive);
    section.textContent = `${arrayAtiveUsers.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de utilizadores inativos */
export function countUnableUsers(id: string, usersList: IUser[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    let arrayUnableUsers = usersList.filter((user) => !user.isAtive);
    section.textContent = `${arrayUnableUsers.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de utilizadores */
export function countAllUsers(id: string, usersList: IUser[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    section.textContent = `${usersList.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Percentagem de utilizadores ativos */
export function countAtivePercentage(id: string, usersList: IUser[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    const activeUsers = usersList.length;
    const totalUsers = allUsers().length;
    const percentage =
      totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0;
    section.textContent = `${percentage}%`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}
