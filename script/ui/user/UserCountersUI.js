import { createSection } from "../dom/CreatePage.js";
/* Contador de utilizadores ativos */
export function countAtiveUsers(usersList) {
    const sectionAtiveUsers = createSection("ativeUsersCount");
    const ativeUsers = usersList.filter((user) => user.isAtive);
    sectionAtiveUsers.textContent = `${ativeUsers.length}`;
    return sectionAtiveUsers;
}
/* Contador de utilizadores inativos */
export function countUnableUsers(usersList) {
    const sectionUnableUser = createSection("unableUsersCount");
    const unableUsers = usersList.filter((user) => !user.isAtive);
    sectionUnableUser.textContent = `${unableUsers.length}`;
    return sectionUnableUser;
}
/* Contador de utilizadores */
export function countUsers(usersList) {
    const sectionTotalUsers = createSection("allUsersCount");
    sectionTotalUsers.textContent = `${usersList.length}`;
    return sectionTotalUsers;
}
/* Percentagem de utilizadores ativos */
export function countAtivePercentage(usersList) {
    const sectionAtiveUsersPercentage = createSection("ativeUsersPercentageCount");
    const activeUsers = usersList.filter((user) => user.isAtive).length;
    const totalUsers = usersList.length;
    const percentage = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0;
    sectionAtiveUsersPercentage.textContent = `${percentage}%`;
    return sectionAtiveUsersPercentage;
}
