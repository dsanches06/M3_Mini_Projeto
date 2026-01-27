import { showInfoBanner } from "./infoBanner.js";
/* Função para obter tarefas por filtro */
export function getTasksByFilter(user, tasks, filter, title) {
    //filtra as tarefas do utilizador
    for (const task of user.tasks) {
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
                showInfoBanner("Filtro desconhecido", "error");
                break;
        }
    }
    return tasks;
}
