/* Contador de utilizadores ativos */
export function countAtiveUsers(usersList) {
    const ativeUsersElement = document.querySelector("#ativeUsers");
    if (ativeUsersElement) {
        const ativeUsers = usersList.filter((user) => user.isAtive);
        ativeUsersElement.textContent = `${ativeUsers.length}`;
    }
}
/* Contador de utilizadores inativos */
export function countUnableUsers(usersList) {
    const unableUsersElement = document.querySelector("#unableUsers");
    if (unableUsersElement) {
        const unableUsers = usersList.filter((user) => !user.isAtive);
        unableUsersElement.textContent = `${unableUsers.length}`;
    }
}
/* Contador de utilizadores */
export function countUsers(usersList) {
    const totalUsers = document.querySelector("#totalUsers");
    if (totalUsers) {
        totalUsers.textContent = `${usersList.length}`;
    }
}
/* Percentagem de utilizadores ativos */
export function countAtivePercentage(usersList) {
    const ativePercentageElement = document.querySelector("#ativeUserPercentage");
    if (ativePercentageElement) {
        const activeUsers = usersList.filter((user) => user.isAtive).length;
        const totalUsers = usersList.length;
        const percentage = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0;
        ativePercentageElement.textContent = `${percentage}%`;
    }
}
