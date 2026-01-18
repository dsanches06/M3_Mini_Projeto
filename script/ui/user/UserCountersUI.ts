import User from "../../models/user/User.js";

/* Contador de utilizadores ativos */
export function countAtiveUsers(usersList: User[]): void {
  const ativeUsersElement = document.querySelector(
    "#ativeUsers"
  ) as HTMLElement;
  if (ativeUsersElement) {
    const ativeUsers = usersList.filter((user) => user.isAtive);
    ativeUsersElement.textContent = `${ativeUsers.length}`;
  }
}

/* Contador de utilizadores inativos */
export function countUnableUsers(usersList: User[]): void {
  const unableUsersElement = document.querySelector(
    "#unableUsers"
  ) as HTMLElement;
  if (unableUsersElement) {
    const unableUsers = usersList.filter((user) => !user.isAtive);
    unableUsersElement.textContent = `${unableUsers.length}`;
  }
}

/* Contador de utilizadores */
export function countUsers(usersList: User[]): void {
  const totalUsers = document.querySelector("#totalUsers") as HTMLElement;
  if (totalUsers) {
    totalUsers.textContent = `${usersList.length}`;
  }
}

/* Percentagem de utilizadores ativos */
export function countAtivePercentage(usersList: User[]): void {
  const ativePercentageElement = document.querySelector(
    "#ativeUserPercentage"
  ) as HTMLElement;
  if (ativePercentageElement) {
    const activeUsers = usersList.filter((user) => user.isAtive).length;
    const totalUsers = usersList.length;
    const percentage =
      totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0;
    ativePercentageElement.textContent = `${percentage}%`;
  }
}
