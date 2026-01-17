/* Contador de tarefas de todos os utilizadores */
export function countAllUserTasks(taskList) {
    const totalTasks = document.querySelector("#totalTasks");
    if (totalTasks) {
        let total = 0;
        //por cada utilizador
        for (const task of taskList) {
            //contar as tarefas do utilizador e incrementar ao total
            total += 1;
        }
        totalTasks.textContent = `${total}`;
    }
    else {
        console.warn("Elemento #totalTasks não foi renderizado no DOM.");
    }
}
/* Contador de tarefas pendentes de todos os utilizadores */
export function countPendingUserTasks(taskList) {
    const pendingTasks = document.querySelector("#pendingTasks");
    if (pendingTasks) {
        let total = 0;
        //por cada utilizador
        for (const task of taskList) {
            //se estano estado pendente
            if (!task.completed) {
                //contar as tarefas do utilizador e incrementar ao total
                total += 1;
            }
        }
        pendingTasks.textContent = `${total}`;
    }
    else {
        console.warn("Elemento #pendingTasks não foi renderizado no DOM.");
    }
}
/* Contador de tarefas terminadas de todos os utilizadores */
export function countCompletedUserTasks(taskList) {
    const completedTasks = document.querySelector("#completedTasks");
    if (completedTasks) {
        let total = 0;
        //por cada utilizador
        for (const task of taskList) {
            //se estano estado pendente
            if (task.completed) {
                //contar as tarefas do utilizador e incrementar ao total
                total += 1;
            }
        }
        completedTasks.textContent = `${total}`;
    }
    else {
        console.warn("Elemento #completedTasks não foi renderizado no DOM.");
    }
}
