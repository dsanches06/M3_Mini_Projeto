/* Contador de tarefas de todos os utilizadores */
export function countAllUserTasks(usersList) {
    const totalTasks = document.querySelector("#totalTasks");
    if (totalTasks) {
        let total = 0;
        usersList.forEach((user) => {
            total += user.tasks.length;
        });
        totalTasks.textContent = `${total}`;
    }
}
/* Contador de tarefas pendentes de todos os utilizadores */
export function countPendingUserTasks(usersList) {
    const pendingTasks = document.querySelector("#pendingTasks");
    if (pendingTasks) {
        let total = 0;
        usersList.forEach((user) => {
            total += user.tasks.filter((task) => !task.completed).length;
        });
        pendingTasks.textContent = `${total}`;
    }
}
/* Contador de tarefas terminadas de todos os utilizadores */
export function countCompletedUserTasks(usersList) {
    const completedTasks = document.querySelector("#completedTasks");
    if (completedTasks) {
        let total = 0;
        usersList.forEach((user) => {
            total += user.tasks.filter((task) => task.completed).length;
        });
        completedTasks.textContent = `${total}`;
    }
}
