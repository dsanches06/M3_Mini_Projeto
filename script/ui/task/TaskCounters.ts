import Task from "../../models/task/Task.js";

/* Contador de tarefas de todos os utilizadores */
export function countAllUserTasks(taskList: Task[]): void {
  const totalTasks = document.querySelector("#totalTasks") as HTMLDivElement;
  if (totalTasks) {
    let total = 0;
    //por cada utilizador
    for (const task of taskList) {
      //contar as tarefas do utilizador e incrementar ao total
      total += 1;
    }
    totalTasks.textContent = `${total}`;
  } else {
    console.warn("Elemento #totalTasks não foi renderizado no DOM.");
  }
}

/* Contador de tarefas pendentes de todos os utilizadores */
export function countPendingUserTasks(taskList: Task[]): void {
  const pendingTasks = document.querySelector(
    "#pendingTasks",
  ) as HTMLDivElement;
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
  } else {
    console.warn("Elemento #pendingTasks não foi renderizado no DOM.");
  }
}

/* Contador de tarefas terminadas de todos os utilizadores */
export function countCompletedUserTasks(taskList: Task[]): void {
  const completedTasks = document.querySelector(
    "#completedTasks",
  ) as HTMLDivElement;
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
  } else {
    console.warn("Elemento #completedTasks não foi renderizado no DOM.");
  }
}
