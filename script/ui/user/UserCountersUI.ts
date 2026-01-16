import UserClass from "../../models/user/UserClass.js";

/* Contador de utilizadores ativos */
export function countActiveUsers(usersList: UserClass[]): void {
  const activeUsers = usersList.filter((user) => user.isAtive);
  const activeUsersElement = document.querySelector(
    "#ActiveUsers"
  ) as HTMLDivElement;
  activeUsersElement.textContent = `${activeUsers.length}`;
}

/* Contador de utilizadores inativos */
export function countInactiveUsers(usersList: UserClass[]): void {
  const inactiveUsers = usersList.filter((user) => !user.isAtive);
  const inactiveUsersElement = document.querySelector(
    "#InactiveUsers"
  ) as HTMLDivElement;
  inactiveUsersElement.textContent = `${inactiveUsers.length}`;
}

/* Contador de utilizadores */
export function countUsers(usersList: UserClass[]): void {
  const totalUsers = document.querySelector("#TotalUsers") as HTMLDivElement;
  totalUsers.textContent = `${usersList.length}`;
}

/* Percentagem de utilizadores ativos */
export function countActivePercentage(usersList: UserClass[]): void {
  const activeUsers = usersList.filter((user) => user.isAtive).length;
  const totalUsers = usersList.length;
  const percentage =
    totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0;
  const activePercentageElement = document.querySelector(
    "#ActivePercentage"
  ) as HTMLDivElement;
  activePercentageElement.textContent = `${percentage}%`;
}
