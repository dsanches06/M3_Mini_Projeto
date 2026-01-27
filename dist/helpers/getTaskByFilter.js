import { showInfoBanner } from "./infoBanner.js";
/* Função para obter tarefas por filtro */
export function getTasksByFilter(user, tasks, filter, title) {
    for (const task of user.getTasks()) {
        switch (filter) {
            case "all":
                tasks.push(task);
                break;
            case "pending":
                if (!task.getCompleted()) {
                    tasks.push(task);
                }
                break;
            case "completed":
                if (task.getCompleted()) {
                    tasks.push(task);
                }
                break;
            case "search":
                if (task
                    .getTitle()
                    .toLowerCase()
                    .includes(title || "")) {
                    tasks.push(task);
                }
                break;
            default:
                showInfoBanner("Filtro desconhecido", "error-banner");
                break;
        }
    }
    return tasks;
}
