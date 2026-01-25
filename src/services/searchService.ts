import { IUser } from "../models/index.js";
import { ITask, TaskStatus } from "../tasks/index.js";

//Dicas:
// Pesquisa por texto, utilizador e estado

export class SearchService {
  private users: IUser[];
  private tasks: ITask[];

  constructor(users: IUser[], tasks: ITask[]) {
    this.users = users;
    this.tasks = tasks;
  }

  searchByTitle(text: string) {
    return this.tasks.filter((task) => task.title.includes(text));
  }

  searchByUser(userId: number) {
    return this.users.find((u) => u.id === userId);
  }

  searchByStatus(status: TaskStatus) {
    return this.tasks.filter((task) => task.status === status);
  }

  globalSearch(query: unknown) {
    if (typeof query === "string") {
      const trimmedQuery = query.trim();
      if (trimmedQuery !== "") {
        const tasksByTitle = this.searchByTitle(trimmedQuery);
        return { tasksByTitle };
      }
    } else if (typeof query === "number") {
      const user = this.searchByUser(Number(query));
      return { user };
    } else {
      const tasksByStatus = isNaN(Number(query))
        ? []
        : this.searchByStatus(Number(query) as TaskStatus);
      return { tasksByStatus };
    }
  }
}
