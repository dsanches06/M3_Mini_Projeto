import User from "../../models/user/User.js";

/* Contador de tarefas de todos os utilizadores */
export function countAllUserTasks(usersList: User[]): void {
  const totalTasks = document.querySelector("#totalTasks") as HTMLDivElement;
  if (totalTasks) {
    let total = 0;
    usersList.forEach((user) => {
      total += user.tasks.length;
    });
    totalTasks.textContent = `${total}`;
  }
}

/* Contador de tarefas pendentes de todos os utilizadores */
export function countPendingUserTasks(usersList: User[]): void {
  const pendingTasks = document.querySelector(
    "#pendingTasks"
  ) as HTMLDivElement;
  if (pendingTasks) {
    let total = 0;
    usersList.forEach((user) => {
      total += user.tasks.filter((task) => !task.completed).length;
    });
    pendingTasks.textContent = `${total}`;
  }
}

/* Contador de tarefas terminadas de todos os utilizadores */
export function countCompletedUserTasks(usersList: User[]): void {
  const completedTasks = document.querySelector(
    "#completedTasks"
  ) as HTMLDivElement;
  if (completedTasks) {
    let total = 0;
    usersList.forEach((user) => {
      total += user.tasks.filter((task) => task.completed).length;
    });
    completedTasks.textContent = `${total}`;
  }
}
