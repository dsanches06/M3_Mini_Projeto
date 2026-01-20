import Task from "../models/task/Task.js";
import User from "../models/user/User.js";

/* Função para obter tarefas por filtro */
export function getTasksByFilter(
  user: User,
  tasks: Task[],
  filter: string,
  title?: string,
): Task[] {
  //filtra as tarefas do utilizador
  for (const task of user.tasks as Task[]) {
    switch (filter) {
      case "all":
        tasks.push(task);
        break;
      case "pending":
        if (!task.completed) {
          tasks.push(task);
        }
        break;
      case "completed":
        if (task.completed) {
          tasks.push(task);
        }
        break;
      case "search":
        if (task.title.toLowerCase().includes(title || "")) {
          tasks.push(task);
        }
        break;
      default:
        console.warn(`Filtro desconhecido: ${filter}`);
    }
  }
  return tasks;
}
