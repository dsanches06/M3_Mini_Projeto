/* Contador de utilizadores ativos */
export function countAtiveUsers(usersList) {
    const ativeUsers = usersList.filter((user) => user.isAtive);
    const ativeUsersElement = document.querySelector("#ativeUsers");
    ativeUsersElement.textContent = `${ativeUsers.length}`;
}
/* Contador de utilizadores inativos */
export function countUnableUsers(usersList) {
    const unableUsers = usersList.filter((user) => !user.isAtive);
    const unableUsersElement = document.querySelector("#unableUsers");
    unableUsersElement.textContent = `${unableUsers.length}`;
}
/* Contador de utilizadores */
export function countUsers(usersList) {
    const totalUsers = document.querySelector("#totalUsers");
    totalUsers.textContent = `${usersList.length}`;
}
/* Percentagem de utilizadores ativos */
export function countAtivePercentage(usersList) {
    const activeUsers = usersList.filter((user) => user.isAtive).length;
    const totalUsers = usersList.length;
    const percentage = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0;
    const ativePercentageElement = document.querySelector("#ativeUserPercentage");
    ativePercentageElement.textContent = `${percentage}%`;
}
