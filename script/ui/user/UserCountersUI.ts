import User from "../../models/user/User.js";
import { createSection } from "../dom/CreatePage.js";

/* Contador de utilizadores ativos */
export function countAtiveUsers(usersList: User[]): HTMLElement {
  const sectionAtiveUsers = createSection("ativeUsersCount") as HTMLElement;
  const ativeUsers = usersList.filter((user) => user.isAtive);
  sectionAtiveUsers.textContent = `${ativeUsers.length}`;
  return sectionAtiveUsers;
}

/* Contador de utilizadores inativos */
export function countUnableUsers(usersList: User[]): HTMLElement {
  const sectionUnableUser = createSection("unableUsersCount") as HTMLElement;
  const unableUsers = usersList.filter((user) => !user.isAtive);
  sectionUnableUser.textContent = `${unableUsers.length}`;
  return sectionUnableUser;
}

/* Contador de utilizadores */
export function countUsers(usersList: User[]): HTMLElement {
  const sectionTotalUsers = createSection("allUsersCount") as HTMLElement;
  sectionTotalUsers.textContent = `${usersList.length}`;
  return sectionTotalUsers;
}

/* Percentagem de utilizadores ativos */
export function countAtivePercentage(usersList: User[]): HTMLElement {
  const sectionAtiveUsersPercentage = createSection(
    "ativeUsersPercentageCount",
  ) as HTMLElement;
  const activeUsers = usersList.filter((user) => user.isAtive).length;
  const totalUsers = usersList.length;
  const percentage =
    totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0;
  sectionAtiveUsersPercentage.textContent = `${percentage}%`;
  return sectionAtiveUsersPercentage;
}
