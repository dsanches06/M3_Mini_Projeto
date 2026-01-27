import ITask from "../../models/task/ITask.js";

/* Contador de tarefas pendentes de todos os utilizadores */
export function countPendingUserTasks(id: string, tasksList: ITask[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    let arrayPendingTasks = tasksList.filter((task) => !task.completed);
    section.textContent = `${arrayPendingTasks.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de tarefas terminadas de todos os utilizadores */
export function countCompletedUserTasks(id: string, tasksList: ITask[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    let arrayCompletedTasks = tasksList.filter((task) => task.completed);
    section.textContent = `${arrayCompletedTasks.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}

/* Contador de tarefas de todos os utilizadores */
export function countAllTasks(id: string, tasksList: ITask[]): void {
  const section = document.querySelector(`${id}`) as HTMLElement;
  if (section) {
    section.textContent = `${tasksList.length}`;
  } else {
    console.warn(`Elemento ${id} não foi encontrado no DOM.`);
  }
}
