import User from "../../models/user/User.js";

/* Contador de utilizadores ativos */
export function countAtiveUsers(usersList: User[]): void {
  const ativeUsers = usersList.filter((user) => user.isAtive);
  const ativeUsersElement = document.querySelector(
    "#ativeUsers"
  ) as HTMLDivElement;
  ativeUsersElement.textContent = `${ativeUsers.length}`;
}

/* Contador de utilizadores inativos */
export function countUnableUsers(usersList: User[]): void {
  const unableUsers = usersList.filter((user) => !user.isAtive);
  const unableUsersElement = document.querySelector(
    "#unableUsers"
  ) as HTMLDivElement;
  unableUsersElement.textContent = `${unableUsers.length}`;
}

/* Contador de utilizadores */
export function countUsers(usersList: User[]): void {
  const totalUsers = document.querySelector("#totalUsers") as HTMLDivElement;
  totalUsers.textContent = `${usersList.length}`;
}

/* Percentagem de utilizadores ativos */
export function countAtivePercentage(usersList: User[]): void {
  const activeUsers = usersList.filter((user) => user.isAtive).length;
  const totalUsers = usersList.length;
  const percentage =
    totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0;
  const ativePercentageElement = document.querySelector(
    "#ativeUserPercentage"
  ) as HTMLDivElement;
  ativePercentageElement.textContent = `${percentage}%`;
}
