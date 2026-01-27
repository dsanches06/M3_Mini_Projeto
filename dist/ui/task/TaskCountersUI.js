/* Contador de tarefas pendentes de todos os utilizadores */
export function countPendingUserTasks(id, tasksList) {
    const section = document.querySelector(`${id}`);
    if (section) {
        let arrayPendingTasks = tasksList.filter((task) => !task.completed);
        section.textContent = `${arrayPendingTasks.length}`;
    }
    else {
        console.warn(`Elemento ${id} não foi encontrado no DOM.`);
    }
}
/* Contador de tarefas terminadas de todos os utilizadores */
export function countCompletedUserTasks(id, tasksList) {
    const section = document.querySelector(`${id}`);
    if (section) {
        let arrayCompletedTasks = tasksList.filter((task) => task.completed);
        section.textContent = `${arrayCompletedTasks.length}`;
    }
    else {
        console.warn(`Elemento ${id} não foi encontrado no DOM.`);
    }
}
/* Contador de tarefas de todos os utilizadores */
export function countAllTasks(id, tasksList) {
    const section = document.querySelector(`${id}`);
    if (section) {
        section.textContent = `${tasksList.length}`;
    }
    else {
        console.warn(`Elemento ${id} não foi encontrado no DOM.`);
    }
}
